import { products } from '../src/data/products';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from '../src/config/store';

interface RequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
  body?: any;
}

interface ResponseLike {
  setHeader(name: string, value: string): this;
  status(code: number): this;
  json(body: any): this;
}

// In-memory rate limiting & idempotency cache (per lambda lifecycle)
const idempotencyStore = new Map<string, { orderId: string; total: number; shipping: number }>();
const ipRequests = new Map<string, { count: number; firstSeen: number }>();

function generateOrderId(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `OF-${yy}${mm}${dd}-${rand}`;
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  // Only accept POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Basic IP rate-limiting (max 10 requests per minute)
  const clientIp = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const ipRecord = ipRequests.get(clientIp);
  if (ipRecord && now - ipRecord.firstSeen < 60000) {
    if (ipRecord.count >= 10) {
      return res.status(429).json({ error: 'Too many requests. Please wait a minute or order via WhatsApp.' });
    }
    ipRecord.count += 1;
  } else {
    ipRequests.set(clientIp, { count: 1, firstSeen: now });
  }

  try {
    const {
      customer,
      lines,
      idempotencyKey,
      honeypot,
      timeOnPage,
      utm
    } = req.body || {};

    // 1. Light bot friction checks
    if (honeypot) {
      // Honeypot triggered, quietly reject without revealing bot trap
      return res.status(200).json({ orderId: 'OF-BOT-TRAPPED', total: 0, shipping: 0 });
    }
    if (typeof timeOnPage === 'number' && timeOnPage < 2) {
      return res.status(400).json({ error: 'Form submitted unnaturally quickly. Please review your order.' });
    }

    // 2. Idempotency check
    if (idempotencyKey && idempotencyStore.has(idempotencyKey)) {
      const cached = idempotencyStore.get(idempotencyKey)!;
      return res.status(200).json(cached);
    }

    // 3. Customer validation
    if (!customer || typeof customer !== 'object') {
      return res.status(400).json({ error: 'Missing customer details.' });
    }

    const name = String(customer.name || '').trim();
    const phone = String(customer.phone || '').trim();
    const email = customer.email ? String(customer.email).trim() : '';
    const city = String(customer.city || '').trim();
    const address = String(customer.address || '').trim();
    const landmark = customer.landmark ? String(customer.landmark).trim() : '';
    const notes = customer.notes ? String(customer.notes).trim() : '';

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address for order confirmation.' });
    }

    // Clean and validate Pakistani mobile number: accepts 03XX..., +923XX..., 923XX...
    const cleanDigits = phone.replace(/[^0-9]/g, '');
    let normalisedPhone = '';
    if (cleanDigits.startsWith('923') && cleanDigits.length === 12) {
      normalisedPhone = '0' + cleanDigits.slice(2);
    } else if (cleanDigits.startsWith('03') && cleanDigits.length === 11) {
      normalisedPhone = cleanDigits;
    } else if (cleanDigits.startsWith('3') && cleanDigits.length === 10) {
      normalisedPhone = '0' + cleanDigits;
    }

    if (!normalisedPhone || normalisedPhone.length !== 11 || !normalisedPhone.startsWith('03')) {
      return res.status(400).json({ error: 'Please provide a valid Pakistani mobile number (e.g. 0301 1234567).' });
    }

    if (!city) {
      return res.status(400).json({ error: 'Please select or enter your delivery city.' });
    }

    if (!address || address.length < 8) {
      return res.status(400).json({ error: 'Please provide a complete street/house address for delivery.' });
    }

    // 4. Validate order items & recompute totals on the server (never trust client prices)
    if (!Array.isArray(lines) || lines.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty.' });
    }

    let serverSubtotal = 0;
    const computedItems: Array<{ name: string; size: string; quantity: number; unitPrice: number; total: number }> = [];

    for (const line of lines) {
      const pId = String(line.productId || '').trim();
      const pSize = String(line.packSize || '').trim();
      const qty = parseInt(String(line.quantity), 10);

      if (!pId || !pSize || isNaN(qty) || qty <= 0) {
        return res.status(400).json({ error: 'Invalid line item specification in cart.' });
      }

      const product = products.find(p => p.id === pId);
      if (!product) {
        return res.status(400).json({ error: `Product not found in catalog: ${pId}` });
      }

      const pack = product.packSizes.find(s => s.size === pSize);
      if (!pack) {
        return res.status(400).json({ error: `Pack size ${pSize} not available for ${product.name}` });
      }

      const unitPrice = pack.price;
      const lineTotal = unitPrice * qty;
      serverSubtotal += lineTotal;

      computedItems.push({
        name: product.name,
        size: pSize,
        quantity: qty,
        unitPrice,
        total: lineTotal
      });
    }

    const isFreeShipping = serverSubtotal >= FREE_SHIPPING_THRESHOLD;
    const serverShipping = isFreeShipping ? 0 : STANDARD_SHIPPING;
    const serverTotal = serverSubtotal + serverShipping;

    // 5. Generate secure, human-readable order ID
    const orderId = generateOrderId();
    const itemsListReadable = computedItems.map(i => `${i.name} (${i.size}) x${i.quantity} = Rs. ${i.total.toLocaleString()}`).join(', ');

    // 6. Persist order to Google Sheet (if configured)
    const sheetsWebhookUrl = process.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    let sheetPersisted = false;

    if (sheetsWebhookUrl && sheetsWebhookUrl.startsWith('http')) {
      try {
        const sheetPayload = {
          orderId,
          status: 'New',
          customerName: name,
          customerPhone: normalisedPhone,
          customerEmail: email,
          customerCity: city,
          customerAddress: landmark ? `${address} (Near: ${landmark})` : address,
          customerNotes: notes,
          itemsList: itemsListReadable,
          subtotal: serverSubtotal,
          shipping: serverShipping,
          total: serverTotal,
          utmSource: utm?.source || '',
          utmMedium: utm?.medium || '',
          utmCampaign: utm?.campaign || '',
          utmContent: utm?.content || '',
          clickId: utm?.clickId || '',
          userAgent: req.headers['user-agent'] || ''
        };

        const sheetRes = await fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload)
        });

        if (sheetRes.ok) {
          sheetPersisted = true;
        } else {
          console.error('[API Order] Google Sheet Webhook returned non-200:', sheetRes.status, await sheetRes.text());
        }
      } catch (sheetErr) {
        console.error('[API Order] Failed to write to Google Sheets:', sheetErr);
      }
    } else {
      console.warn('[API Order] Google Sheets webhook URL not configured; order logged to server stdout.');
    }

    // 7. Optional EmailJS server notification
    const emailjsServiceId = process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
    const emailjsAdminTemplateId = process.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || process.env.EMAILJS_ADMIN_TEMPLATE_ID;
    const emailjsCustomerTemplateId = process.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID || process.env.EMAILJS_CUSTOMER_TEMPLATE_ID;
    const emailjsPublicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;

    if (emailjsServiceId && emailjsPublicKey) {
      // Send Admin alert
      if (emailjsAdminTemplateId) {
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://organicflavouring.com'
          },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsAdminTemplateId,
            user_id: emailjsPublicKey,
            template_params: {
              order_id: orderId,
              customer_name: name,
              customer_phone: normalisedPhone,
              customer_email: email,
              customer_city: city,
              customer_address: address,
              items_list: itemsListReadable,
              subtotal: serverSubtotal.toLocaleString(),
              shipping: serverShipping === 0 ? 'FREE' : serverShipping.toLocaleString(),
              total: serverTotal.toLocaleString(),
              payment_method: 'Cash on Delivery (COD)'
            }
          })
        }).catch(e => console.error('[API Order] EmailJS admin dispatch failed:', e));
      }

      // Send Customer confirmation if email was provided
      if (email && emailjsCustomerTemplateId) {
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://organicflavouring.com'
          },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsCustomerTemplateId,
            user_id: emailjsPublicKey,
            template_params: {
              order_id: orderId,
              customer_name: name,
              to_name: name,
              customer_email: email,
              to_email: email,
              items_list: itemsListReadable,
              subtotal: serverSubtotal.toLocaleString(),
              shipping: serverShipping === 0 ? 'FREE' : serverShipping.toLocaleString(),
              total: serverTotal.toLocaleString(),
              shipping_address: `${address}, ${city}`,
              payment_method: 'Cash on Delivery (COD)'
            }
          })
        }).catch(e => console.error('[API Order] EmailJS customer dispatch failed:', e));
      }
    }

    const responsePayload = {
      orderId,
      subtotal: serverSubtotal,
      shipping: serverShipping,
      total: serverTotal,
      items: computedItems,
      date: new Date().toLocaleDateString('en-GB')
    };

    // Store in idempotency cache
    if (idempotencyKey) {
      idempotencyStore.set(idempotencyKey, responsePayload);
    }

    return res.status(200).json(responsePayload);

  } catch (error: any) {
    console.error('[API Order] Fatal error processing order:', error);
    return res.status(500).json({ error: 'Server error processing order. Please order via WhatsApp.' });
  }
}
