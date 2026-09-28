// Central store configuration
import { officialInfo } from '../data/products';

export const FREE_SHIPPING_THRESHOLD = 2500;
export const STANDARD_SHIPPING = 250;
export const CURRENCY = 'PKR';
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || officialInfo.whatsapp || '923015384466';
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || officialInfo.email || 'info@organicflavouring.com';

/**
 * Format currency amount into clean, standard PKR string (e.g. "Rs. 1,250")
 */
export function formatPKR(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString('en-US')}`;
}
