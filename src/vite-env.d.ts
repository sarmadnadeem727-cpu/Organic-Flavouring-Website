/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_ADMIN_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_CUSTOMER_TEMPLATE_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_TIKTOK_PIXEL_ID?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GOOGLE_SHEETS_WEBHOOK_URL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
