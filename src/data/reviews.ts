export interface Review {
  id: string;
  name: string;
  date: string; // ISO date string: YYYY-MM-DD
  rating: number; // 1-5
  text: string;
  location?: string;
  productId?: string;
  verified: boolean;
}

/**
 * Verified customer reviews registry.
 * Only reviews with `verified: true` will be displayed on the website.
 * Initialized empty to ensure 100% genuine customer reviews.
 */
export const reviews: Review[] = [];
