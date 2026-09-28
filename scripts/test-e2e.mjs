import { chromium } from '@playwright/test';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function runE2E() {
  console.log(`Starting E2E tests against ${BASE_URL} on viewport 390x844 (Mobile)...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // ----------------------------------------------------
    // Scenario 1: Browse -> Product -> Pack Size -> Add to Cart -> Quantity -> Checkout -> Validation -> Mock Order Success
    // ----------------------------------------------------
    console.log('\n--- Scenario 1: Full Buying Funnel & Successful Order ---');

    // 1. Visit shop
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle', timeout: 15000 });
    assert(page.url().includes('/shop'), 'Navigated to /shop');

    // 2. Select product
    const firstProductLink = page.locator('a[href^="/product/"]').first();
    await firstProductLink.click();
    await page.waitForTimeout(1000);
    assert(page.url().includes('/product/'), 'Navigated to product detail page');

    // 3. Verify above-the-fold elements
    const heading = await page.locator('h1').textContent();
    assert(heading && heading.length > 0, `Product title rendered: "${heading?.trim()}"`);

    // 4. Select second pack size chip if available
    const packChips = page.locator('button:has-text("g"), button:has-text("kg")');
    const chipCount = await packChips.count();
    if (chipCount > 1) {
      await packChips.nth(1).click();
      console.log('  ✓ Selected secondary pack size chip');
    }

    // 5. Add to cart
    const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart")').first();
    await addToCartBtn.click();
    await page.waitForTimeout(1000);

    // 6. Navigate to /checkout
    await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'networkidle', timeout: 15000 });
    assert(page.url().includes('/checkout'), 'Navigated to /checkout');

    // 7. Test form validation on empty submit
    const submitBtn = page.locator('button[type="submit"]:has-text("Place Order")');
    await submitBtn.click();
    await page.waitForTimeout(500);

    const nameError = page.locator('text=Please enter your full name');
    const hasNameError = (await nameError.count()) > 0;
    assert(hasNameError, 'Validation correctly flags missing full name');

    // 8. Mock order API success
    await page.route('**/api/order', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          orderId: 'OF-260928-K7Q2',
          subtotal: 560,
          shipping: 250,
          total: 810,
        }),
      });
    });

    // 9. Fill valid customer details
    await page.fill('#checkout-name', 'Ali Raza');
    await page.fill('#checkout-phone', '0300 1234567');
    await page.selectOption('#checkout-city', 'Lahore');
    await page.fill('#checkout-address', 'House 22, Street 4, Sector Y, DHA Phase 3');

    // 10. Submit valid order
    await submitBtn.click();
    await page.waitForTimeout(1500);

    const confirmationText = page.locator('text=Order Placed Successfully');
    const hasConfirmation = (await confirmationText.count()) > 0;
    assert(hasConfirmation, 'Order Confirmation screen rendered with server-issued ID');

    const orderIdMatch = page.locator('text=OF-260928-K7Q2');
    const hasOrderId = (await orderIdMatch.count()) > 0;
    assert(hasOrderId, 'Order ID OF-260928-K7Q2 displayed on screen');

    // ----------------------------------------------------
    // Scenario 2: API Failure -> Graceful WhatsApp Fallback
    // ----------------------------------------------------
    console.log('\n--- Scenario 2: Server API Failure & WhatsApp Fallback ---');

    // Reset storage to order again and add an item so cart is not empty
    await page.evaluate(() => {
      sessionStorage.clear();
      localStorage.clear();
    });
    
    // Quick add product from shop
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
    const quickAddBtn = page.locator('button:has-text("Add to Cart")').first();
    await quickAddBtn.click();
    await page.waitForTimeout(1000);

    await page.goto(`${BASE_URL}/checkout`, { waitUntil: 'networkidle' });

    // Mock API failure
    await page.unroute('**/api/order');
    await page.route('**/api/order', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Google Sheets synchronization temporary unavailable',
        }),
      });
    });

    await page.fill('#checkout-name', 'Usman Khan');
    await page.fill('#checkout-phone', '0321 7654321');
    await page.selectOption('#checkout-city', 'Karachi');
    await page.fill('#checkout-address', 'Apartment 4B, Clifton Block 2');

    const retrySubmitBtn = page.locator('button[type="submit"]:has-text("Place Order")');
    await retrySubmitBtn.click();
    await page.waitForTimeout(1000);

    const whatsAppFallback = page.locator('text=Order via WhatsApp Instead');
    const hasWhatsAppFallback = (await whatsAppFallback.count()) > 0;
    assert(hasWhatsAppFallback, 'Server failure triggered friendly WhatsApp fallback button');

  } catch (err) {
    console.error('Test error caught:', err);
    failed++;
  } finally {
    await browser.close();
  }

  console.log(`\n========================================`);
  console.log(`E2E Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runE2E();
