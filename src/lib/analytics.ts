/**
 * Unified Analytics and Ad Tracking Module for Organic Flavouring
 * Supports Meta Pixel (fbq), Google Analytics 4 (gtag), and TikTok Pixel (ttq).
 * 
 * Rules:
 * - Completely silent and zero network requests if environment variables are not set.
 * - Loaded after page interactivity off the critical rendering path.
 * - First-touch UTM and click ID capture in sessionStorage.
 * - Safe against duplicate Purchase fires using sessionStorage order deduplication.
 * - Lightweight debug mode enabled with ?debug_analytics=1.
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    ttq?: any;
  }
}

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim();
const GA4_ID = import.meta.env.VITE_GA4_ID?.trim();
const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID?.trim();

// Check if debug mode is active
const isDebug = (): boolean => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('debug_analytics') === '1';
};

const debugLog = (platform: string, event: string, payload?: any) => {
  if (isDebug()) {
    console.log(`%c[Analytics:${platform}] ${event}`, 'color: #D9542F; font-weight: bold;', payload || '');
  }
};

/**
 * Capture UTM parameters and ad click IDs on first touch
 */
export function captureUtmAndClickIds(): void {
  if (typeof window === 'undefined') return;

  try {
    const params = new URLSearchParams(window.location.search);
    const trackingKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid', 'gclid'];
    const captured: Record<string, string> = {};

    let hasAny = false;
    for (const key of trackingKeys) {
      const val = params.get(key);
      if (val) {
        captured[key] = val;
        hasAny = true;
      }
    }

    if (hasAny) {
      // First-touch attribution: do not overwrite existing campaign if already recorded
      const existing = sessionStorage.getItem('of_utm_data');
      if (!existing) {
        sessionStorage.setItem('of_utm_data', JSON.stringify({
          ...captured,
          landingPage: window.location.pathname,
          recordedAt: new Date().toISOString()
        }));
        debugLog('UTM', 'Captured first-touch parameters', captured);
      }
    }
  } catch (err) {
    // Gracefully ignore storage exceptions in private browsing
  }
}

/**
 * Dynamically initialize pixel tracking scripts off the critical path
 */
let isInitialized = false;

export function initAnalytics(): void {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  captureUtmAndClickIds();

  // Defer script injection until idle or slight timeout
  const runInit = () => {
    // 1. Meta Pixel
    if (META_PIXEL_ID) {
      try {
        /* eslint-disable */
        (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return;
          n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        /* eslint-enable */

        window.fbq?.('init', META_PIXEL_ID);
        debugLog('Meta', `Initialized with ID: ${META_PIXEL_ID}`);
      } catch (e) {
        console.warn('Failed to load Meta Pixel', e);
      }
    }

    // 2. Google Analytics 4
    if (GA4_ID) {
      try {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer?.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA4_ID, { send_page_view: false }); // Router will handle PageView
        debugLog('GA4', `Initialized with ID: ${GA4_ID}`);
      } catch (e) {
        console.warn('Failed to load GA4', e);
      }
    }

    // 3. TikTok Pixel
    if (TIKTOK_PIXEL_ID) {
      try {
        /* eslint-disable */
        (function() {
          var ttq = (window.ttq = window.ttq || []);
          ttq.methods = [
            'page',
            'track',
            'identify',
            'instances',
            'debug',
            'on',
            'off',
            'once',
            'ready',
            'alias',
            'group',
            'enableCookie',
            'disableCookie'
          ];
          ttq.setAndDefer = function(t: any, e: any) {
            t[e] = function() {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            };
          };
          for (var i = 0; i < ttq.methods.length; i++) {
            ttq.setAndDefer(ttq, ttq.methods[i]);
          }
          ttq.instance = function(t: any) {
            for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
              ttq.setAndDefer(e, ttq.methods[n]);
            }
            return e;
          };
          ttq.load = function(e: any, n: any) {
            var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
            (ttq._i = ttq._i || {})[e] = [];
            ttq._i[e]._u = i;
            ttq._t = ttq._t || {};
            ttq._t[e] = +new Date();
            ttq._o = ttq._o || {};
            ttq._o[e] = n || {};
            var o = document.createElement('script');
            o.type = 'text/javascript';
            o.async = !0;
            o.src = i + '?sdkid=' + e + '&lib=' + 'ttq';
            var a = document.getElementsByTagName('script')[0];
            a.parentNode?.insertBefore(o, a);
          };
          ttq.load(TIKTOK_PIXEL_ID);
          debugLog('TikTok', `Initialized with ID: ${TIKTOK_PIXEL_ID}`);
        })();
        /* eslint-enable */
      } catch (e) {
        console.warn('Failed to load TikTok Pixel', e);
      }
    }
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(runInit, { timeout: 3000 });
  } else {
    setTimeout(runInit, 1500);
  }
}

/**
 * Fire PageView across all configured trackers on SPA route change
 */
export function trackPageView(path: string, title?: string): void {
  debugLog('All', 'PageView', { path, title });

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'PageView');
  }

  if (GA4_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title
    });
  }

  if (TIKTOK_PIXEL_ID && window.ttq) {
    window.ttq.page();
  }
}

/**
 * Track ViewContent on Product pages
 */
export function trackViewContent(product: {
  sku: string;
  name: string;
  category: string;
  price: number;
}): void {
  const payload = {
    content_name: product.name,
    content_category: product.category,
    content_ids: [product.sku],
    content_type: 'product',
    value: product.price,
    currency: 'PKR'
  };

  debugLog('All', 'ViewContent', payload);

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'ViewContent', payload);
  }

  if (GA4_ID && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'PKR',
      value: product.price,
      items: [
        {
          item_id: product.sku,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }
      ]
    });
  }

  if (TIKTOK_PIXEL_ID && window.ttq) {
    window.ttq.track('ViewContent', {
      content_id: product.sku,
      content_type: 'product',
      content_name: product.name,
      price: product.price,
      value: product.price,
      currency: 'PKR'
    });
  }
}

/**
 * Track AddToCart across shop, product detail, and home cards
 */
export function trackAddToCart(item: {
  sku: string;
  name: string;
  category?: string;
  packSize: string;
  price: number;
  quantity: number;
}): void {
  const totalValue = item.price * item.quantity;
  const payload = {
    content_name: item.name,
    content_ids: [item.sku],
    content_type: 'product',
    value: totalValue,
    currency: 'PKR'
  };

  debugLog('All', 'AddToCart', { ...payload, packSize: item.packSize, quantity: item.quantity });

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'AddToCart', payload);
  }

  if (GA4_ID && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'PKR',
      value: totalValue,
      items: [
        {
          item_id: item.sku,
          item_name: item.name,
          item_category: item.category || 'Spices',
          item_variant: item.packSize,
          price: item.price,
          quantity: item.quantity
        }
      ]
    });
  }

  if (TIKTOK_PIXEL_ID && window.ttq) {
    window.ttq.track('AddToCart', {
      content_id: item.sku,
      content_type: 'product',
      content_name: item.name,
      quantity: item.quantity,
      price: item.price,
      value: totalValue,
      currency: 'PKR'
    });
  }
}

/**
 * Track InitiateCheckout when the Checkout page mounts with items
 */
export function trackInitiateCheckout(items: Array<{ sku: string; price: number; quantity: number }>, totalValue: number): void {
  const payload = {
    content_ids: items.map(i => i.sku),
    content_type: 'product',
    num_items: items.reduce((acc, i) => acc + i.quantity, 0),
    value: totalValue,
    currency: 'PKR'
  };

  debugLog('All', 'InitiateCheckout', payload);

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'InitiateCheckout', payload);
  }

  if (GA4_ID && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'PKR',
      value: totalValue,
      items: items.map(i => ({
        item_id: i.sku,
        price: i.price,
        quantity: i.quantity
      }))
    });
  }

  if (TIKTOK_PIXEL_ID && window.ttq) {
    window.ttq.track('InitiateCheckout', {
      content_type: 'product',
      quantity: payload.num_items,
      value: totalValue,
      currency: 'PKR'
    });
  }
}

/**
 * Track Purchase event ONLY after server confirms order.
 * Deduplicated strictly using sessionStorage.
 */
export function trackPurchase(order: {
  orderId: string;
  total: number;
  items: Array<{ sku?: string; name: string; packSize?: string; price: number; quantity: number }>;
}): void {
  if (typeof window === 'undefined') return;

  try {
    const firedOrdersKey = 'of_purchases_fired';
    const firedRaw = sessionStorage.getItem(firedOrdersKey);
    const firedList: string[] = firedRaw ? JSON.parse(firedRaw) : [];

    if (firedList.includes(order.orderId)) {
      debugLog('All', `Purchase event already fired for ${order.orderId}, suppressing duplicate.`);
      return;
    }

    // Record as fired
    firedList.push(order.orderId);
    sessionStorage.setItem(firedOrdersKey, JSON.stringify(firedList));
  } catch {
    // ignore sessionStorage errors
  }

  const payload = {
    content_ids: order.items.map(i => i.sku || i.name),
    content_type: 'product',
    value: order.total,
    currency: 'PKR',
    num_items: order.items.reduce((acc, i) => acc + i.quantity, 0)
  };

  debugLog('All', 'Purchase', { ...payload, orderId: order.orderId });

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'Purchase', payload, { eventID: order.orderId });
  }

  if (GA4_ID && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: order.orderId,
      value: order.total,
      currency: 'PKR',
      items: order.items.map(i => ({
        item_id: i.sku || i.name,
        item_name: i.name,
        item_variant: i.packSize,
        price: i.price,
        quantity: i.quantity
      }))
    });
  }

  if (TIKTOK_PIXEL_ID && window.ttq) {
    window.ttq.track('CompletePayment', {
      content_type: 'product',
      content_id: order.orderId,
      value: order.total,
      currency: 'PKR'
    });
  }
}

/**
 * Track Contact / Lead generation when WhatsApp or call button is tapped
 */
export function trackContact(channel: 'whatsapp' | 'phone' | 'email', label?: string): void {
  debugLog('All', 'Contact/Lead', { channel, label });

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'Contact');
  }

  if (GA4_ID && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Contact',
      event_label: `${channel}:${label || 'general'}`
    });
  }

  if (TIKTOK_PIXEL_ID && window.ttq) {
    window.ttq.track('Contact', {
      content_name: channel
    });
  }
}

/**
 * Track Search events
 */
export function trackSearch(query: string): void {
  if (!query.trim()) return;
  debugLog('All', 'Search', { query });

  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'Search', { search_string: query });
  }

  if (GA4_ID && window.gtag) {
    window.gtag('event', 'search', { search_term: query });
  }

  if (TIKTOK_PIXEL_ID && window.ttq) {
    window.ttq.track('Search', { query });
  }
}
