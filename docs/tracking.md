# Organic Flavouring — Ad Tracking & Analytics Guide

This project features a centralized, privacy-conscious analytics setup in [`src/lib/analytics.ts`](file:///g:/Oragnic%20Flavouring%20Project/organic-flavouring%20Website/src/lib/analytics.ts).
It natively integrates **Meta Pixel (Facebook/Instagram)**, **Google Analytics 4 (GA4)**, and **TikTok Pixel** without render-blocking script tags or cookie walls (operating exclusively for the Pakistani COD market).

---

## 1. Environment Variables Configuration

In `.env` (or in your hosting provider's dashboard: Vercel / Netlify / Cloudflare):

```bash
# Ad Pixels & Analytics (Optional: left empty disables platform silently)
VITE_META_PIXEL_ID="your_meta_pixel_id_here"
VITE_GA4_ID="G-XXXXXXXXXX"
VITE_TIKTOK_PIXEL_ID="your_tiktok_pixel_id_here"
```

> **Zero Overhead When Unset**:
> If an ID is left blank or omitted, the tracking script is completely skipped—no third-party scripts are injected and zero network requests are made.

---

## 2. Event Reference

All values are tracked in **PKR** (`currency: 'PKR'`).

| Event Name | Standard Trigger | Meta Pixel (`fbq`) | GA4 (`gtag`) | TikTok (`ttq`) | Payload Details |
|---|---|---|---|---|---|
| **PageView** | On initial load & every SPA route change | `PageView` | `page_view` | `page()` | `path`, `title` |
| **ViewContent** | Visiting any product detail page | `ViewContent` | `view_item` | `ViewContent` | SKU, name, category, selected pack price |
| **AddToCart** | Quick-add on cards or main "Add to Cart" button | `AddToCart` | `add_to_cart` | `AddToCart` | SKU, name, variant/packSize, price, quantity |
| **InitiateCheckout**| Visiting `/checkout` or `/cart` with active items | `InitiateCheckout` | `begin_checkout` | `InitiateCheckout`| Item SKUs, count, total basket value |
| **Purchase** | Server confirms order (`/api/order` 200 OK) | `Purchase` | `purchase` | `CompletePayment`| `orderId`, server-computed total, items |
| **Contact / Lead** | Tapping WhatsApp or phone direct links | `Contact` | `generate_lead` | `Contact` | Channel (`whatsapp`), inquiry type |
| **Search** | Submitting search term in navbar or shop page | `Search` | `search` | `Search` | Search query text |

---

## 3. First-Touch Attribution (UTMs & Click IDs)

When a customer clicks an Instagram, Facebook, TikTok, or Google ad, their query parameters are automatically captured on first landing and stored in `sessionStorage` (`of_utm_data`):
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid` (Meta click ID)
- `ttclid` (TikTok click ID)
- `gclid` (Google ad click ID)

When the customer checks out, these parameters are posted to `/api/order` and written directly into your Google Sheet, allowing you to trace exactly which ad campaign created each sale.

---

## 4. Local Testing & Verification

### 4.1 Debug Mode in Browser
Add `?debug_analytics=1` to any URL (e.g. `http://localhost:5173/shop?debug_analytics=1`).
Open DevTools Console: every event will be logged in bold terracotta with its full payload:
```
[Analytics:All] PageView { path: "/shop", title: "Shop" }
[Analytics:All] AddToCart { content_name: "Red Chilli Powder", value: 320, packSize: "100g", ... }
[Analytics:All] Purchase { orderId: "OF-260928-AB12", value: 1450, ... }
```

### 4.2 Browser Extensions
- **Meta Pixel Helper**: Checks that `PageView`, `ViewContent`, `AddToCart`, and `Purchase` fire with correct PKR values and SKUs.
- **GA4 DebugView**: Run `Google Analytics Debugger` extension and check real-time streams in GA4 Admin → DebugView.
- **TikTok Pixel Helper**: Validates `AddToCart` and `CompletePayment`.

---

## 5. Future Conversions API (CAPI) Roadmap

To send server-side purchase signals for ad platforms:
1. `trackPurchase` passes the server order ID as the Meta `eventID`:
   ```ts
   window.fbq('track', 'Purchase', payload, { eventID: order.orderId });
   ```
2. When ready to add Meta Conversions API (CAPI), call the Meta Graph API `/v18.0/{PIXEL_ID}/events` directly from `api/order.ts` using the exact same `order.orderId` as `event_id`.
3. Meta will automatically deduplicate the browser pixel event with the server event, ensuring 100% signal retention against ad blockers and iOS privacy barriers.
