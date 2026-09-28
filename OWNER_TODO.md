# Organic Flavouring — Store Owner Action Items (Launch Checklist)

This document contains all mandatory decisions, API keys, credentials, and business confirmations required before running paid advertisements.

---

## 1. Tracking & Advertising Pixels
*File: `.env` (copy from `.env.example`)*

- [ ] **Meta (Facebook & Instagram) Pixel ID**
  - **Variable:** `VITE_META_PIXEL_ID`
  - **Where to get:** Meta Events Manager -> Data Sources -> Pixel ID.
  - **Status:** Unset. Once added, test with Meta Pixel Helper Chrome extension.
- [ ] **Google Analytics 4 (GA4) Measurement ID**
  - **Variable:** `VITE_GA4_ID` (format: `G-XXXXXXXXXX`)
  - **Where to get:** Google Analytics -> Admin -> Data Streams -> Web Stream Details.
- [ ] **TikTok Pixel ID**
  - **Variable:** `VITE_TIKTOK_PIXEL_ID`
  - **Where to get:** TikTok Ads Manager -> Assets -> Events -> Web Events.
- [ ] **Production Site Canonical URL**
  - **Variable:** `VITE_SITE_URL` (e.g. `https://organicflavouring.com`)

---

## 2. Orders & Google Sheets Webhook (Backend Order Storage)
*File: `api/order.ts` & `.env`*

- [ ] **Setup Google Sheet and Apps Script**
  1. Open [Google Sheets](https://sheets.new) and create a sheet named `Organic Flavouring Orders`.
  2. In the first row, add header columns:
     `Timestamp | Order ID | Status | Customer Name | Phone | City | Address | Landmark | Notes | Items | Subtotal | Shipping | Total | UTM Source | UTM Medium | UTM Campaign | UTM Content | Click ID | User Agent`
  3. Go to **Extensions -> Apps Script**.
  4. Paste the contents of [`docs/google-apps-script.gs`](./docs/google-apps-script.gs).
  5. Click **Deploy -> New Deployment -> Select type: Web App**.
  6. Execute as: **Me**, Who has access: **Anyone**.
  7. Copy the Web App URL.
- [ ] **Add Webhook URL to Environment Variables**
  - **Variable:** `ORDER_WEBHOOK_URL` in `.env` (and Vercel environment variables).

---

## 3. Order Notifications (Admin & Customer Confirmation)
*File: `api/order.ts` & `.env`*

- [ ] **Resend or EmailJS Private Key**
  - **Variables:** `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PRIVATE_KEY`
  - Note: Browser-side EmailJS keys have been removed to prevent quota abuse. Notification requests now dispatch safely from the serverless backend.

---

## 4. Business Claims & Certification Verification
*Reference document: [`docs/claims-to-verify.md`](./docs/claims-to-verify.md)*

- [ ] **Halal Certification**
  - **Claimed Standard:** PS:3733-2022 (R) / OIC-SMIIC 1:2019
  - **Action Required:** Confirm certificate number and issuing body in `src/data/products.ts` (`officialCertificates.halal.certNumber`, `issuer`).
  - Place scanned certificate file into `public/certs/` if you want it displayed in the certificate preview modal.
- [ ] **ISO 9001:2015 Management Standard**
  - **Action Required:** Confirm certificate number and issuing body in `src/data/products.ts` (`officialCertificates.iso.certNumber`, `issuer`).
- [ ] **Laboratory Test Reports (Sudan I–IV & Heavy Metals)**
  - **Claims:** "0% Sudan I-IV dyes", "Zero lead chromate adulteration"
  - **Action Required:** Ensure third-party lab testing reports from PCSIR, SGS, or accredited Pakistani food labs are available on file.

---

## 5. Store Operations & Courier Policies
*Files: `src/pages/Shipping.tsx`, `src/pages/Returns.tsx`, `src/pages/Terms.tsx`*

- [ ] **Delivery Cut-offs & Logistics Partner**
  - Current courier assumptions: Trax / Call Courier / Leopards / TCS.
  - Lahore same-day or next-day cut-off time (e.g. 2:00 PM).
- [ ] **Return & Replacement Window**
  - Placeholder currently set to `[CONFIRM: return window, e.g. 48 to 72 hours]` for damaged/leaking spice jars.
- [ ] **Order Confirmation Calls**
  - Site displays: *"Cash on Delivery. We may confirm your order by call or WhatsApp before dispatch."*
  - Confirm whether your team calls every first-time customer before dispatching parcels.

---

## 6. Real Customer Reviews
*File: `src/data/reviews.ts`*

The four placeholder reviews from the original template have been archived here to prevent unverified social proof on paid ad landing pages:
1. *"The stone-ground red chilli powder has an unmatched fresh aroma and vibrant color. You can instantly tell it's free of synthetic dyes."* — Fatima Zahra, Lahore (verified: false)
2. *"Finally, real whole spices that aren't stale or full of dust. The Kasuri haldi and zeera are staples in our home now."* — Bilal Ahmed, Karachi (verified: false)
3. *"The special garam masala blend elevated our weekend biryani completely. Pure quality and fast nationwide delivery."* — Ayesha Khan, Islamabad (verified: false)
4. *"Exceptional packaging and swift cash on delivery in Faisalabad. Best single-origin spices available online."* — Tariq Mahmood, Faisalabad (verified: false)

- [ ] **Action:** Once real customer feedback is received via WhatsApp, add real quotes with `verified: true` in `src/data/reviews.ts`. The Reviews page and navigation will automatically un-hide.

---

## 7. Cookie Banner Decision
- **Decision:** Cookie consent banner has been intentionally excluded as Organic Flavouring operates exclusively within Pakistan. Under PECA (Pakistan Electronic Crimes Act), standard e-commerce transaction tracking does not require explicit GDPR-style cookie consent banners. Revisit this only if launching international exports to the UK/EU.
