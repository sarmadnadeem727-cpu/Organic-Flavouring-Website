import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const DEFAULT_TITLE = "Organic Flavouring | Pakistan's Online Spice Store - Since 2022";
const DEFAULT_DESC = "Buy 100% pure, freshly procured, hygienically packed Pakistani spices online. Red chilli, haldi, coriander, garam masala, zeera & black pepper delivered nationwide.";
const DEFAULT_IMAGE = "/og-image.jpg";

export function usePageMeta({
  title,
  description,
  image,
  type = 'website',
}: PageMetaOptions = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title 
      ? `${title} | Organic Flavouring` 
      : DEFAULT_TITLE;

    const fullDesc = description || DEFAULT_DESC;
    const fullImg = image || DEFAULT_IMAGE;
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://organicflavouring.com';
    const canonicalUrl = `${siteUrl}${pathname}`;

    // Update document title
    document.title = fullTitle;

    // Helper to set or create meta tags
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace(/[\[\]]/g, '').split('=');
        el.setAttribute(attrName, attrVal.replace(/['"]/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Update standard meta tags
    setMetaTag('meta[name="description"]', 'content', fullDesc);

    // OpenGraph
    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    setMetaTag('meta[property="og:description"]', 'content', fullDesc);
    setMetaTag('meta[property="og:image"]', 'content', fullImg.startsWith('http') ? fullImg : `${siteUrl}${fullImg}`);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[property="og:site_name"]', 'content', 'Organic Flavouring');
    setMetaTag('meta[property="og:locale"]', 'content', 'en_PK');

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', fullDesc);
    setMetaTag('meta[name="twitter:image"]', 'content', fullImg.startsWith('http') ? fullImg : `${siteUrl}${fullImg}`);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [title, description, image, type, pathname]);
}
