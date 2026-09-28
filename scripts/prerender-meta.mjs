import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve('dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = process.env.VITE_SITE_URL || 'https://organicflavouring.com';

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

// Products catalogue for metadata injection
const products = [
  {
    id: 'red-chilli-powder',
    name: 'Red Chilli Powder (Dandi Cut)',
    shortDescription: '100% pure single-origin Kunri red chilli. Zero Sudan dyes, sun-dried, stone-milled with vibrant natural pungency.',
    image: '/images/products/red-chilli-powder-1.webp',
    startingPrice: 140,
  },
  {
    id: 'turmeric-powder',
    name: 'Turmeric Powder (Haldi)',
    shortDescription: 'High-curcumin single-origin Kasur turmeric powder. Vibrant golden color, cold stone-milled, 100% pure and unadulterated.',
    image: '/images/products/turmeric-powder-1.webp',
    startingPrice: 140,
  },
  {
    id: 'coriander-powder',
    name: 'Coriander Powder (Dhaniya)',
    shortDescription: 'Freshly roasted and stone-milled whole coriander seeds from Sindh. Aromatic, citrusy, and 100% unadulterated.',
    image: '/images/products/coriander-powder-1.webp',
    startingPrice: 140,
  },
  {
    id: 'garam-masala',
    name: 'Special Garam Masala',
    shortDescription: 'Traditional 12-spice artisanal blend ground in small batches. Aromatic royal cumin, black cardamom, cloves, and cinnamon.',
    image: '/images/products/garam-masala-1.webp',
    startingPrice: 280,
  },
  {
    id: 'black-pepper',
    name: 'Black Pepper Powder (Kali Mirch)',
    shortDescription: 'Pungent Malabar-grade whole black peppercorns gently cracked and ground for maximum piperine heat and fresh aroma.',
    image: '/images/products/black-pepper-1.webp',
    startingPrice: 320,
  },
  {
    id: 'coriander-whole',
    name: 'Whole Coriander Seeds (Sabut Dhaniya)',
    shortDescription: 'Golden, plump sun-dried whole coriander seeds with intense floral and citrus essential oils. 100% clean and unadulterated.',
    image: '/images/products/coriander-powder-2.webp',
    startingPrice: 140,
  },
  {
    id: 'red-chilli-flakes',
    name: 'Red Chilli Flakes (Kuti Lal Mirch)',
    shortDescription: 'Coarsely crushed sun-dried red chillies with natural seeds. Perfect piquant heat for pizzas, pastas, and karahi tempering.',
    image: '/images/products/red-chilli-flakes-1.webp',
    startingPrice: 140,
  },
  {
    id: 'gram-flour-besan',
    name: 'Pure Gram Flour (Besan)',
    shortDescription: '100% pure chana dal besan, double sifted with fine texture. Zero adulteration, gluten-free, perfect for pakoras and sweets.',
    image: '/images/products/turmeric-powder-1.webp',
    startingPrice: 120,
  }
];

const staticPages = [
  {
    route: 'shop',
    title: 'Pure Pakistani Spices & Masalas | Organic Flavouring',
    description: 'Explore our farm-procured spices, everyday pure powders, and whole masalas. Cash on delivery available across Pakistan.',
    image: '/og-image.jpg',
  },
  {
    route: 'about',
    title: 'Our Heritage & Story | Organic Flavouring',
    description: 'Homegrown spice venture established in 2022 in Lahore, Pakistan. Dedicated to 100% pure, unadulterated spices and farm freshness.',
    image: '/og-image.jpg',
  },
  {
    route: 'certifications',
    title: 'Quality & Halal Certifications | Organic Flavouring',
    description: 'Accredited quality standards: PS:3733-2022 Halal compliance and ISO 9001:2015 certified processing facilities.',
    image: '/og-image.jpg',
  },
  {
    route: 'transparency',
    title: 'Batch Transparency & Provenance | Organic Flavouring',
    description: 'Verify your spice jar origin, harvest belt, lab test results, and grinding dates with full batch traceability.',
    image: '/og-image.jpg',
  },
  {
    route: 'contact',
    title: 'Contact Us & WhatsApp Support | Organic Flavouring',
    description: 'Get in touch with Organic Flavouring in Lahore, Pakistan. Chat with our team on WhatsApp or send an order inquiry.',
    image: '/og-image.jpg',
  },
  {
    route: 'checkout',
    title: 'Cash on Delivery Checkout | Organic Flavouring',
    description: 'Fast, secure Cash on Delivery checkout for Organic Flavouring spices across Pakistan.',
    image: '/og-image.jpg',
  },
  {
    route: 'cart',
    title: 'Cash on Delivery Checkout | Organic Flavouring',
    description: 'Fast, secure Cash on Delivery checkout for Organic Flavouring spices across Pakistan.',
    image: '/og-image.jpg',
  },
  {
    route: 'reviews',
    title: 'Customer Reviews & Feedback | Organic Flavouring',
    description: 'Read verified experiences and feedback from real home cooks and kitchens across Pakistan.',
    image: '/og-image.jpg',
  },
  {
    route: 'terms',
    title: 'Terms of Service | Organic Flavouring',
    description: 'Terms and conditions for placing orders with Organic Flavouring in Pakistan.',
    image: '/og-image.jpg',
  },
  {
    route: 'privacy',
    title: 'Privacy Policy | Organic Flavouring',
    description: 'Privacy practices and data handling policies for Organic Flavouring customers in Pakistan.',
    image: '/og-image.jpg',
  },
  {
    route: 'shipping',
    title: 'Shipping Policy | Organic Flavouring',
    description: 'Nationwide delivery rates, dispatch timelines, and COD policies for Organic Flavouring in Pakistan.',
    image: '/og-image.jpg',
  },
  {
    route: 'returns',
    title: 'Returns & Refund Policy | Organic Flavouring',
    description: 'Fair, transparent return and replacement policies for Organic Flavouring spices in Pakistan.',
    image: '/og-image.jpg',
  },
];

function injectMeta(html, { title, description, image, canonicalUrl }) {
  let updated = html;

  // Replace title
  updated = updated.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  updated = updated.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description}" />`
  );

  // Replace canonical
  updated = updated.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph
  updated = updated.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
  updated = updated.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`);
  updated = updated.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image.startsWith('http') ? image : `${SITE_URL}${image}`}" />`);
  updated = updated.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);

  // Replace Twitter
  updated = updated.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  updated = updated.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`);
  updated = updated.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image.startsWith('http') ? image : `${SITE_URL}${image}`}" />`);

  return updated;
}

function writePrerender(targetRelDir, htmlContent) {
  const targetDir = path.join(DIST_DIR, targetRelDir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');
}

// 1. Prerender static pages
for (const p of staticPages) {
  const canonicalUrl = `${SITE_URL}/${p.route}`;
  const prerendered = injectMeta(baseHtml, {
    title: p.title,
    description: p.description,
    image: p.image,
    canonicalUrl,
  });
  writePrerender(p.route, prerendered);
}
console.log(`Prerendered metadata for ${staticPages.length} static routes.`);

// 2. Prerender product pages
for (const p of products) {
  const canonicalUrl = `${SITE_URL}/product/${p.id}`;
  const title = `${p.name} | Organic Flavouring`;
  const description = `${p.shortDescription} Starting from Rs. ${p.startingPrice}. Cash on Delivery across Pakistan.`;
  const image = p.image;

  const prerendered = injectMeta(baseHtml, {
    title,
    description,
    image,
    canonicalUrl,
  });

  writePrerender(`product/${p.id}`, prerendered);
}
console.log(`Prerendered metadata for ${products.length} product pages.`);
