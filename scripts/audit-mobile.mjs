import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: '360x640', width: 360, height: 640 },
  { name: '375x667', width: 375, height: 667 },
  { name: '390x844', width: 390, height: 844 },
  { name: '412x915', width: 412, height: 915 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1280x800', width: 1280, height: 800 },
];

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/shop', name: 'shop' },
  { path: '/product/red-chilli-powder', name: 'product' },
  { path: '/checkout', name: 'checkout' },
  { path: '/about', name: 'about' },
  { path: '/transparency', name: 'transparency' },
  { path: '/certifications', name: 'certifications' },
  { path: '/contact', name: 'contact' },
];

const BASE_URL = process.env.AUDIT_URL || 'http://localhost:5173';
const SCREENSHOT_DIR = path.resolve('./docs/mobile-screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runAudit() {
  console.log(`Starting mobile responsiveness & overflow audit on ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });
  let hasErrors = false;

  for (const vp of VIEWPORTS) {
    console.log(`\n--- Auditing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.width < 1024,
      hasTouch: vp.width < 1024,
    });
    const page = await context.newPage();

    for (const r of ROUTES) {
      const url = `${BASE_URL}${r.path}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      } catch {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
      }

      await page.waitForTimeout(600);

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const innerW = window.innerWidth;
        return {
          scrollWidth: scrollW,
          innerWidth: innerW,
          overflows: scrollW > innerW,
          diff: scrollW - innerW,
        };
      });

      if (overflow.overflows) {
        console.error(`❌ OVERFLOW DETECTED: [${r.name}] at ${vp.name} (scrollWidth: ${overflow.scrollWidth}px vs innerWidth: ${overflow.innerWidth}px, diff: +${overflow.diff}px)`);
        hasErrors = true;
      } else {
        console.log(`✅ [${r.name}] at ${vp.name}: No overflow (${overflow.scrollWidth}px <= ${overflow.innerWidth}px)`);
      }

      // Capture screenshot for key pages
      if (['home', 'shop', 'product', 'checkout'].includes(r.name)) {
        const shotPath = path.join(SCREENSHOT_DIR, `${r.name}-${vp.name}.png`);
        await page.screenshot({ path: shotPath, fullPage: false });
      }
    }

    await context.close();
  }

  await browser.close();
  if (hasErrors) {
    console.error('\nAudit finished with horizontal overflow issues.');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL VIEWPORTS AND ROUTES PASSED WITH ZERO HORIZONTAL OVERFLOW!');
  }
}

runAudit().catch(err => {
  console.error('Audit failed to run:', err);
  process.exit(1);
});
