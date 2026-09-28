# Organic Flavouring

B2C online spice store for Pakistan (Lahore-based, cash-on-delivery, dispatched nationwide). Pure, stone-ground, hygienically packed Pakistani spices, whole masalas, and healthy flours.

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite 6
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons & Animation**: Lucide React + Motion (`motion/react`) + GSAP

## Getting Started

### 1. Prerequisites
- Node.js 18+ and npm

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

Available variables:
- `VITE_SITE_URL`: Base website URL (e.g. `https://organicflavouring.com`)
- `VITE_WHATSAPP_NUMBER`: Support & ordering WhatsApp number in international format without `+` (e.g. `923000000000`)
- `VITE_SUPPORT_EMAIL`: Customer support email address
- `VITE_EMAILJS_PUBLIC_KEY`: EmailJS Public Key
- `VITE_EMAILJS_SERVICE_ID`: EmailJS Service ID
- `VITE_EMAILJS_ADMIN_TEMPLATE_ID`: EmailJS Template ID for admin alerts
- `VITE_EMAILJS_CUSTOMER_TEMPLATE_ID`: EmailJS Template ID for customer confirmations
- `VITE_GOOGLE_SHEETS_WEBHOOK_URL`: Google Apps Script Webhook URL for order storage
- `VITE_META_PIXEL_ID`: Meta (Facebook/Instagram) Pixel ID (optional)
- `VITE_GA4_ID`: Google Analytics 4 Measurement ID (optional)
- `VITE_TIKTOK_PIXEL_ID`: TikTok Pixel ID (optional)

### 3. Development
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build & Verification
```bash
# Typecheck
npm run typecheck

# Production build
npm run build

# Local production preview
npm run preview
```

## Deployment Notes
- **Hosting**: Optimized for Vercel / Netlify / Cloudflare Pages.
- **Routing**: Client-side routing with SPA fallback via `vercel.json` and `_redirects`.
- **Payment Method**: Cash on Delivery (COD) across Pakistan.

## License
All rights reserved. Proprietary and confidential.
