import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.VITE_SITE_URL || 'https://organicflavouring.com';

const STATIC_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'shop', priority: '0.9', changefreq: 'daily' },
  { path: 'about', priority: '0.7', changefreq: 'monthly' },
  { path: 'certifications', priority: '0.8', changefreq: 'monthly' },
  { path: 'transparency', priority: '0.8', changefreq: 'weekly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' },
  { path: 'terms', priority: '0.5', changefreq: 'yearly' },
  { path: 'privacy', priority: '0.5', changefreq: 'yearly' },
  { path: 'shipping', priority: '0.6', changefreq: 'monthly' },
  { path: 'returns', priority: '0.6', changefreq: 'monthly' },
];

const PRODUCT_SLUGS = [
  'red-chilli-powder',
  'turmeric-powder',
  'coriander-powder',
  'garam-masala',
  'black-pepper',
  'coriander-whole',
  'red-chilli-flakes',
  'gram-flour-besan',
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  for (const r of STATIC_ROUTES) {
    const loc = r.path ? `${SITE_URL}/${r.path}` : `${SITE_URL}/`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Product routes
  for (const slug of PRODUCT_SLUGS) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/product/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync('./public/sitemap.xml', xml, 'utf8');
  console.log(`Generated public/sitemap.xml with ${STATIC_ROUTES.length + PRODUCT_SLUGS.length} URLs.`);
}

generateSitemap();
