import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { officialInfo, brandLogo } from '../data/products';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING, formatPKR, WHATSAPP_NUMBER } from '../config/store';
import { Trash2, Plus, Minus, Check, MessageCircle, Download, AlertCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackInitiateCheckout, trackPurchase, trackContact } from '../lib/analytics';
import { usePageMeta } from '../hooks/usePageMeta';

const PAKISTAN_MAJOR_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Gujranwala',
  'Sialkot',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Other'
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export default function Checkout() {
  usePageMeta({
    title: 'Cash on Delivery Checkout',
    description: 'Fast, secure Cash on Delivery checkout for Organic Flavouring spices across Pakistan.',
  });

  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  
  // Confirmed order state initialized from sessionStorage
  const [completedOrderDetails, setCompletedOrderDetails] = useState<any>(() => {
    try {
      const saved = sessionStorage.getItem('of_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orderComplete, setOrderComplete] = useState<boolean>(() => {
    try {
      return !!sessionStorage.getItem('of_last_order');
    } catch {
      return false;
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [customCity, setCustomCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Mobile order summary accordion
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  // Validation
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Bot friction: time on page
  const pageLoadedAt = useRef<number>(Date.now());
  const receiptRef = useRef<HTMLDivElement>(null);
  const [idempotencyKey] = useState<string>(() => `checkout_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCharge = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING;
  const finalTotal = subtotal + shippingCharge;

  // Track InitiateCheckout when items are in cart and not yet on confirmation screen
  useEffect(() => {
    if (!orderComplete && items.length > 0) {
      trackInitiateCheckout(
        items.map(i => ({
          sku: i.product.sku,
          price: i.product.price,
          quantity: i.quantity,
        })),
        finalTotal
      );
    }
  }, []);

  // Validation rules for Pakistani checkout
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-]/g, '');
    return /^(03\d{9}|\+923\d{9}|923\d{9})$/.test(cleaned);
  };

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name.';
        if (value.trim().length < 2) return 'Name is too short.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required for order confirmation.';
        if (!validateEmail(value)) return 'Please enter a valid email address (e.g. name@example.com).';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Mobile number is required for Cash on Delivery.';
        if (!validatePhone(value)) return 'Enter a valid Pakistani mobile number (e.g. 0300 1234567).';
        return undefined;
      case 'city':
        if (value === 'Other' && !customCity.trim()) return 'Please enter your city name.';
        if (!value.trim()) return 'Please select or enter your city.';
        return undefined;
      case 'address':
        if (!value.trim()) return 'Shipping address is required.';
        if (value.trim().length < 8) return 'Please provide complete house / street / area details.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const nameErr = validateField('name', customerName);
    const emailErr = validateField('email', customerEmail);
    const phoneErr = validateField('phone', customerPhone);
    const cityErr = validateField('city', customerCity);
    const addressErr = validateField('address', customerAddress);

    const newErrors: FormErrors = {
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      city: cityErr,
      address: addressErr,
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, city: true, address: true });

    // Focus first invalid element
    if (nameErr) {
      document.getElementById('checkout-name')?.focus();
      return;
    }
    if (emailErr) {
      document.getElementById('checkout-email')?.focus();
      return;
    }
    if (phoneErr) {
      document.getElementById('checkout-phone')?.focus();
      return;
    }
    if (cityErr) {
      document.getElementById(customerCity === 'Other' ? 'checkout-custom-city' : 'checkout-city')?.focus();
      return;
    }
    if (addressErr) {
      document.getElementById('checkout-address')?.focus();
      return;
    }

    if (items.length === 0) {
      setSubmitError('Your cart is empty. Please add products before placing an order.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Gather UTM params from sessionStorage if captured
      let utmParams: Record<string, string> = {};
      try {
        const utmRaw = sessionStorage.getItem('of_utm_data');
        if (utmRaw) utmParams = JSON.parse(utmRaw);
      } catch {
        // ignore
      }

      const payload = {
        customer: {
          name: customerName.trim(),
          phone: customerPhone.trim(),
          email: customerEmail.trim() || undefined,
          city: customerCity === 'Other' ? customCity.trim() : customerCity,
          address: customerAddress.trim(),
          landmark: nearestLandmark.trim() || undefined,
          notes: orderNotes.trim() || undefined,
        },
        lines: items.map(i => ({
          productId: i.product.id,
          packSize: i.packSize,
          quantity: i.quantity,
        })),
        idempotencyKey,
        honeypot,
        timeOnPageMs: Date.now() - pageLoadedAt.current,
        utm: utmParams,
      };

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Server rejected order');
      }

      const confirmedOrder = {
        orderId: data.orderId,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        customerCity: customerCity === 'Other' ? customCity.trim() : customerCity,
        customerAddress: customerAddress.trim(),
        nearestLandmark: nearestLandmark.trim(),
        paymentMethod: 'Cash on Delivery (COD)',
        subtotal: data.subtotal,
        shipping: data.shipping,
        total: data.total,
        items: items.map(item => ({
          name: item.product.name,
          packSize: item.packSize,
          quantity: item.quantity,
          price: item.product.price,
          lineTotal: item.lineTotal,
        })),
        date: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };

      // Persist in sessionStorage so page reload preserves confirmation screen & Purchase pixel dedupes
      try {
        sessionStorage.setItem('of_last_order', JSON.stringify(confirmedOrder));
      } catch {
        // ignore private mode error
      }

      // Track Purchase event across pixels (deduped automatically in trackPurchase)
      trackPurchase({
        orderId: data.orderId,
        total: data.total,
        items: items.map(item => ({
          sku: item.product.sku,
          name: item.product.name,
          packSize: item.packSize,
          price: item.product.price,
          quantity: item.quantity,
        })),
      });

      setCompletedOrderDetails(confirmedOrder);
      setOrderComplete(true);
      clearCart();
    } catch (err: any) {
      console.error('Order placement failed:', err);
      setSubmitError(
        'We could not connect to our server to place your order right now. Please place your order directly via WhatsApp, or try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDirectWhatsAppUrl = () => {
    if (completedOrderDetails) {
      const itemsList = completedOrderDetails.items
        .map((i: any) => `• ${i.name} (${i.packSize}) x${i.quantity} = ${formatPKR(i.price * i.quantity)}`)
        .join('%0A');
      const msg = `*Order Confirmation - Organic Flavouring*%0AOrder ID: ${completedOrderDetails.orderId}%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* ${formatPKR(completedOrderDetails.subtotal)}%0A*Delivery:* ${completedOrderDetails.shipping === 0 ? 'FREE' : formatPKR(completedOrderDetails.shipping)}%0A*Total:* ${formatPKR(completedOrderDetails.total)}%0A%0A*Customer Details:*%0AName: ${completedOrderDetails.customerName}%0APhone: ${completedOrderDetails.customerPhone}%0ACity: ${completedOrderDetails.customerCity}%0AAddress: ${completedOrderDetails.customerAddress}%0APayment: Cash on Delivery`;
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    }

    // Fallback if order submission errored
    const itemsList = items
      .map(i => `• ${i.product.name} (${i.packSize}) x${i.quantity} = ${formatPKR(i.lineTotal)}`)
      .join('%0A');
    const city = customerCity === 'Other' ? customCity : customerCity;
    const msg = `*New Order Inquiry - Organic Flavouring*%0A%0A*Items:*%0A${itemsList}%0A%0A*Total:* ${formatPKR(finalTotal)} (COD)%0A%0A*Customer Details:*%0AName: ${customerName || '[Pending]'}%0APhone: ${customerPhone || '[Pending]'}%0ACity: ${city || '[Pending]'}%0AAddress: ${customerAddress || '[Pending]'}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  // Dynamic import of jspdf and html2canvas on user demand
  const downloadSlip = async () => {
    if (!receiptRef.current || !completedOrderDetails) return;
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      const canvas = await html2canvas(receiptRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Organic_Flavouring_Slip_${completedOrderDetails.orderId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF slip:', error);
      alert('Could not generate PDF directly. Please take a screenshot of this confirmation or message us on WhatsApp.');
    }
  };

  return (
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24 pt-6 relative">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-6 pb-4 border-b border-[#E5D7C5] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#D9542F] block mb-1">
              Secure Cash on Delivery
            </span>
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#211D18]">
              {orderComplete ? 'Order Confirmation' : 'Checkout & Delivery'}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#2F4F24] font-semibold bg-[#2F4F24]/10 px-3 py-1.5 rounded-full border border-[#2F4F24]/20">
            <ShieldCheck className="w-4 h-4 text-[#2F4F24]" />
            <span className="hidden sm:inline">100% Genuine Sun-Dried Spices</span>
          </div>
        </div>

        {/* State 1: Order Confirmed */}
        {orderComplete && completedOrderDetails ? (
          <div className="bg-white rounded-2xl border-2 border-[#211D18] p-6 sm:p-8 text-center max-w-lg mx-auto space-y-5 shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 bg-[#2F4F24]/10 text-[#2F4F24] rounded-full flex items-center justify-center mx-auto border border-[#2F4F24]/30">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#2F4F24] font-bold">Order Placed Successfully</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#211D18]">{completedOrderDetails.orderId}</h2>
              <p className="text-xs sm:text-sm text-[#5A4F46] pt-1">
                Thank you, <strong>{completedOrderDetails.customerName}</strong>! Your order is recorded and prepared for dispatch from Lahore.
              </p>
            </div>

            <div className="bg-[#FBF8F2] p-4 rounded-xl border border-[#E5D7C5] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#211D18]">
                <span>Total Amount (COD):</span>
                <span className="text-sm font-bold text-[#D9542F]">{formatPKR(completedOrderDetails.total)}</span>
              </div>
              <div className="flex justify-between text-[#5A4F46]">
                <span>Shipping:</span>
                <span>{completedOrderDetails.shipping === 0 ? 'FREE' : formatPKR(completedOrderDetails.shipping)}</span>
              </div>
              <div className="flex justify-between text-[#5A4F46]">
                <span>Destination:</span>
                <span className="truncate max-w-[200px] text-right font-medium">{completedOrderDetails.customerCity}</span>
              </div>
              {completedOrderDetails.customerEmail && (
                <div className="flex justify-between text-[#5A4F46]">
                  <span>Confirmation Email:</span>
                  <span className="truncate max-w-[200px] text-right font-medium">{completedOrderDetails.customerEmail}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-[#5A4F46] italic">
              "Cash on Delivery. We may confirm your order by call or WhatsApp before dispatch."
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[48px] px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" /> Confirm via WhatsApp
              </a>

              <button
                onClick={downloadSlip}
                className="w-full min-h-[48px] px-6 py-3 bg-[#EFE7DA] hover:bg-[#E5D7C5] text-[#211D18] border border-[#E5D7C5] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download / Save Slip
              </button>

              <Link
                to="/shop"
                className="text-xs font-semibold text-[#5A4F46] hover:text-[#D9542F] hover:underline pt-2 transition-colors"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* State 2: Empty Cart */
          <div className="bg-white rounded-2xl border border-[#E5D7C5] p-10 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <h2 className="font-serif-heading text-xl font-bold text-[#211D18]">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-[#5A4F46] leading-relaxed">
              Explore our pure, single-origin Pakistani spices ground fresh in small batches.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-[#D9542F] hover:bg-[#B0472B] text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
              >
                Browse Spice Shop
              </Link>
            </div>
          </div>
        ) : (
          /* State 3: Checkout Form Flow */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Mobile-only collapsible order summary */}
            <div className="lg:hidden col-span-1 bg-white rounded-xl border border-[#E5D7C5] overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setSummaryExpanded(!summaryExpanded)}
                className="w-full p-4 flex items-center justify-between text-left cursor-pointer min-h-[48px]"
                aria-expanded={summaryExpanded}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#211D18]">Order Summary ({items.length} items)</span>
                  {summaryExpanded ? <ChevronUp className="w-4 h-4 text-[#5A4F46]" /> : <ChevronDown className="w-4 h-4 text-[#5A4F46]" />}
                </div>
                <span className="text-sm font-bold text-[#D9542F]">{formatPKR(finalTotal)}</span>
              </button>

              {summaryExpanded && (
                <div className="p-4 pt-0 border-t border-[#E5D7C5] space-y-3 bg-[#FBF8F2]">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.packSize}`} className="flex justify-between items-center text-xs py-2 border-b border-[#E5D7C5]/60 last:border-none">
                      <div>
                        <p className="font-semibold text-[#211D18]">{item.product.name}</p>
                        <p className="text-xs text-[#5A4F46]">{item.packSize} × {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[#211D18]">{formatPKR(item.lineTotal)}</span>
                    </div>
                  ))}
                  <div className="pt-2 text-xs space-y-1 text-[#5A4F46]">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-[#211D18]">{formatPKR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nationwide Delivery:</span>
                      <span>{isFreeShipping ? <strong className="text-[#2F4F24]">FREE</strong> : formatPKR(STANDARD_SHIPPING)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Left: Customer Details Form */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleOrderSubmit} noValidate className="bg-white p-5 sm:p-7 rounded-2xl border border-[#E5D7C5] shadow-sm space-y-5">
                
                {/* Honeypot field for spam bots */}
                <input
                  type="text"
                  name="user_note_check"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <div className="border-b border-[#E5D7C5] pb-3">
                  <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">1. Delivery Details (Pakistan)</h2>
                  <p className="text-xs text-[#5A4F46] mt-0.5">Please provide an active mobile number and email for dispatch & tracking updates.</p>
                </div>

                {submitError && (
                  <div className="p-4 bg-[#D9542F]/10 border border-[#D9542F] rounded-xl text-xs text-[#211D18] space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-[#D9542F] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#D9542F]">Notice</p>
                        <p className="text-xs text-[#5A4F46] leading-relaxed">{submitError}</p>
                      </div>
                    </div>
                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#20ba59] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Order via WhatsApp Instead
                    </a>
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="checkout-name" className="block text-[#211D18] font-bold mb-1.5 text-xs sm:text-sm">
                      Full Name *
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="e.g. Tariq Mahmood"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      onBlur={(e) => handleBlur('name', e.target.value)}
                      className={`w-full min-h-[44px] bg-[#FBF8F2] border ${errors.name && touched.name ? 'border-[#D9542F]' : 'border-[#E5D7C5]'} rounded-xl px-3.5 py-2.5 text-sm text-[#211D18] placeholder-[#5A4F46]/50 focus:outline-none focus:border-[#D9542F] focus:bg-white transition-colors`}
                    />
                    {errors.name && touched.name && (
                      <p className="text-[#D9542F] text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone & City in responsive grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Phone */}
                    <div>
                      <label htmlFor="checkout-phone" className="block text-[#211D18] font-bold mb-1.5 text-xs sm:text-sm">
                        Mobile Number (for COD updates) *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        name="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder="0300 1234567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        onBlur={(e) => handleBlur('phone', e.target.value)}
                        className={`w-full min-h-[44px] bg-[#FBF8F2] border ${errors.phone && touched.phone ? 'border-[#D9542F]' : 'border-[#E5D7C5]'} rounded-xl px-3.5 py-2.5 text-sm text-[#211D18] placeholder-[#5A4F46]/50 focus:outline-none focus:border-[#D9542F] focus:bg-white transition-colors`}
                      />
                      {errors.phone && touched.phone && (
                        <p className="text-[#D9542F] text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* City Selector */}
                    <div>
                      <label htmlFor="checkout-city" className="block text-[#211D18] font-bold mb-1.5 text-xs sm:text-sm">
                        City *
                      </label>
                      <select
                        id="checkout-city"
                        name="address-level2"
                        autoComplete="address-level2"
                        value={customerCity}
                        onChange={(e) => {
                          setCustomerCity(e.target.value);
                          if (e.target.value !== 'Other') setCustomCity('');
                        }}
                        onBlur={(e) => handleBlur('city', e.target.value)}
                        className="w-full min-h-[44px] bg-[#FBF8F2] border border-[#E5D7C5] rounded-xl px-3 py-2.5 text-sm text-[#211D18] focus:outline-none focus:border-[#D9542F] focus:bg-white transition-colors"
                      >
                        {PAKISTAN_MAJOR_CITIES.map(city => (
                          <option key={city} value={city} className="bg-white text-[#211D18]">
                            {city}
                          </option>
                        ))}
                      </select>

                      {customerCity === 'Other' && (
                        <input
                          id="checkout-custom-city"
                          type="text"
                          placeholder="Enter your city name"
                          value={customCity}
                          onChange={(e) => setCustomCity(e.target.value)}
                          onBlur={(e) => handleBlur('city', 'Other')}
                          className={`mt-2 w-full min-h-[44px] bg-[#FBF8F2] border ${errors.city && touched.city ? 'border-[#D9542F]' : 'border-[#E5D7C5]'} rounded-xl px-3.5 py-2.5 text-sm text-[#211D18] focus:outline-none focus:border-[#D9542F] focus:bg-white`}
                        />
                      )}
                      {errors.city && touched.city && (
                        <p className="text-[#D9542F] text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label htmlFor="checkout-address" className="block text-[#211D18] font-bold mb-1.5 text-xs sm:text-sm">
                      Complete Address (House / Street / Area) *
                    </label>
                    <textarea
                      id="checkout-address"
                      name="street-address"
                      autoComplete="street-address"
                      rows={2}
                      required
                      placeholder="e.g. House 14-B, Street 3, Sector G-9/2, or Gulberg III"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      onBlur={(e) => handleBlur('address', e.target.value)}
                      className={`w-full bg-[#FBF8F2] border ${errors.address && touched.address ? 'border-[#D9542F]' : 'border-[#E5D7C5]'} rounded-xl p-3 text-sm text-[#211D18] placeholder-[#5A4F46]/50 focus:outline-none focus:border-[#D9542F] focus:bg-white transition-colors`}
                    />
                    {errors.address && touched.address && (
                      <p className="text-[#D9542F] text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Nearest Landmark & Email in grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkout-landmark" className="block text-[#5A4F46] font-medium mb-1.5 text-xs">
                        Nearest Landmark (optional)
                      </label>
                      <input
                        id="checkout-landmark"
                        type="text"
                        placeholder="e.g. Near Shell Pump, Behind Jamia Masjid"
                        value={nearestLandmark}
                        onChange={(e) => setNearestLandmark(e.target.value)}
                        className="w-full min-h-[44px] bg-[#FBF8F2] border border-[#E5D7C5] rounded-xl px-3.5 py-2.5 text-sm text-[#211D18] placeholder-[#5A4F46]/50 focus:outline-none focus:border-[#D9542F] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-email" className="block text-[#211D18] font-bold mb-1.5 text-xs sm:text-sm">
                        Email Address *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="name@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        onBlur={(e) => handleBlur('email', e.target.value)}
                        className={`w-full min-h-[44px] bg-[#FBF8F2] border ${errors.email && touched.email ? 'border-[#D9542F]' : 'border-[#E5D7C5]'} rounded-xl px-3.5 py-2.5 text-sm text-[#211D18] placeholder-[#5A4F46]/50 focus:outline-none focus:border-[#D9542F] focus:bg-white transition-colors`}
                      />
                      {errors.email && touched.email && (
                        <p className="text-[#D9542F] text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label htmlFor="checkout-notes" className="block text-[#5A4F46] font-medium mb-1.5 text-xs">
                      Special Delivery Instructions (optional)
                    </label>
                    <input
                      id="checkout-notes"
                      type="text"
                      placeholder="e.g. Call before delivery, deliver in afternoon"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full min-h-[44px] bg-[#FBF8F2] border border-[#E5D7C5] rounded-xl px-3.5 py-2.5 text-sm text-[#211D18] placeholder-[#5A4F46]/50 focus:outline-none focus:border-[#D9542F] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Payment Method section */}
                <div className="pt-4 border-t border-[#E5D7C5] space-y-3">
                  <h2 className="font-serif-heading text-lg font-bold text-[#211D18]">2. Payment Method</h2>

                  <div className="p-4 rounded-xl border-2 border-[#D9542F] bg-[#D9542F]/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="payment-cod"
                        name="paymentMethod"
                        checked={true}
                        readOnly
                        className="accent-[#D9542F] w-4 h-4 cursor-default"
                      />
                      <label htmlFor="payment-cod" className="cursor-pointer">
                        <span className="font-bold text-[#211D18] block text-xs sm:text-sm">Cash on Delivery (COD)</span>
                        <span className="text-xs text-[#5A4F46]">Pay cash directly to courier upon arrival</span>
                      </label>
                    </div>
                    <span className="text-xs font-bold text-[#2F4F24] bg-[#2F4F24]/10 border border-[#2F4F24]/20 px-2.5 py-1 rounded-md shrink-0">
                      Dispatched Nationwide
                    </span>
                  </div>
                </div>

                {/* Submit button & Disclaimer */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[52px] sm:min-h-[56px] px-6 py-3.5 bg-[#D9542F] hover:bg-[#B0472B] active:bg-[#8F351E] text-white text-base font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Recording Your Order...
                      </span>
                    ) : (
                      `Place Order · ${formatPKR(finalTotal)}`
                    )}
                  </button>

                  <p className="text-center text-xs text-[#5A4F46] leading-relaxed">
                    Cash on Delivery. We may confirm your order by call or WhatsApp before dispatch.
                  </p>

                  <p className="text-center text-xs text-[#5A4F46] pt-1">
                    By placing an order, you agree to our{' '}
                    <Link to="/terms" target="_blank" className="text-[#D9542F] underline hover:text-[#B0472B]">Terms</Link>,{' '}
                    <Link to="/privacy" target="_blank" className="text-[#D9542F] underline hover:text-[#B0472B]">Privacy</Link>, and{' '}
                    <Link to="/returns" target="_blank" className="text-[#D9542F] underline hover:text-[#B0472B]">Returns Policy</Link>.
                  </p>
                </div>
              </form>
            </div>

            {/* Right: Desktop Order Summary */}
            <div className="hidden lg:block lg:col-span-5 space-y-4 sticky top-24">
              <div className="bg-white p-6 rounded-2xl border border-[#E5D7C5] shadow-sm space-y-4">
                <h2 className="font-serif-heading text-lg font-bold text-[#211D18] pb-2 border-b border-[#E5D7C5]">
                  Order Summary ({items.length})
                </h2>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {items.map(item => (
                    <div
                      key={`${item.product.id}-${item.packSize}`}
                      className="flex gap-3 pb-3 border-b border-[#E5D7C5] items-center justify-between"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain bg-[#FBF8F2] p-1 rounded-lg border border-[#E5D7C5]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-heading font-bold text-xs text-[#211D18] truncate">{item.product.name}</h4>
                        <p className="text-xs text-[#5A4F46]">{item.packSize}</p>
                        <p className="text-xs font-bold text-[#D9542F]">{formatPKR(item.lineTotal)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#211D18] rounded-lg bg-[#FBF8F2]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity - 1)}
                            className="p-1.5 text-[#211D18] hover:text-[#D9542F] transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                            aria-label={`Decrease quantity for ${item.product.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#211D18]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity + 1)}
                            className="p-1.5 text-[#211D18] hover:text-[#D9542F] transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                            aria-label={`Increase quantity for ${item.product.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.packSize)}
                          className="p-1.5 text-[#5A4F46] hover:text-[#D9542F] transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Totals */}
                <div className="pt-2 space-y-2 text-xs text-[#5A4F46]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#211D18]">{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nationwide Delivery</span>
                    <span>{isFreeShipping ? <strong className="text-[#2F4F24]">FREE</strong> : formatPKR(STANDARD_SHIPPING)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#211D18] pt-3 border-t border-[#E5D7C5]">
                    <span>Total Amount (COD)</span>
                    <span className="text-[#D9542F]">{formatPKR(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Hidden Receipt Element for PDF Slip Generation */}
      {completedOrderDetails && (
        <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
          <div ref={receiptRef} style={{ width: '800px', padding: '40px', backgroundColor: '#FFFFFF', color: '#000000', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #E5E7EB', paddingBottom: '20px', marginBottom: '20px' }}>
              <div>
                <img src={brandLogo} alt="Organic Flavouring" style={{ height: '60px', objectFit: 'contain' }} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>ORDER SLIP</h1>
                <p style={{ fontSize: '14px', color: '#4B5563', margin: '4px 0 0' }}>Order ID: {completedOrderDetails.orderId}</p>
                <p style={{ fontSize: '14px', color: '#4B5563', margin: '4px 0 0' }}>Date: {completedOrderDetails.date}</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 8px' }}>Deliver To:</h3>
                <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px' }}>{completedOrderDetails.customerName}</p>
                <p style={{ fontSize: '14px', margin: '0 0 4px' }}>{completedOrderDetails.customerAddress}</p>
                <p style={{ fontSize: '14px', margin: '0 0 4px' }}>{completedOrderDetails.customerCity}</p>
                <p style={{ fontSize: '14px', margin: '0 0 4px' }}>Phone: {completedOrderDetails.customerPhone}</p>
                {completedOrderDetails.customerEmail && (
                  <p style={{ fontSize: '14px', margin: '0 0 4px' }}>Email: {completedOrderDetails.customerEmail}</p>
                )}
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 8px' }}>Payment Method:</h3>
                <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0', color: '#D9542F' }}>Cash on Delivery (COD)</p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F3F4F6' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 'bold' }}>Item</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 'bold' }}>Quantity</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 'bold' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E5E7EB', fontSize: '14px', fontWeight: 'bold' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {completedOrderDetails.items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', fontSize: '14px' }}>
                      <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                      <div style={{ color: '#6B7280', fontSize: '12px' }}>{item.packSize}</div>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', fontSize: '14px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', fontSize: '14px', textAlign: 'right' }}>{formatPKR(item.price)}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB', fontSize: '14px', textAlign: 'right' }}>{formatPKR(item.lineTotal || (item.price * item.quantity))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px' }}>
                  <span>Subtotal:</span>
                  <span>{formatPKR(completedOrderDetails.subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', borderBottom: '1px solid #E5E7EB' }}>
                  <span>Delivery:</span>
                  <span>{completedOrderDetails.shipping === 0 ? 'FREE' : formatPKR(completedOrderDetails.shipping)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '18px', fontWeight: 'bold' }}>
                  <span>Total (COD):</span>
                  <span>{formatPKR(completedOrderDetails.total)}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '50px', textAlign: 'center', color: '#6B7280', fontSize: '12px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
              <p>Thank you for choosing Organic Flavouring!</p>
              <p>100% Pure, Sun-Dried & Unadulterated Spices · Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
