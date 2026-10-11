import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const origin = `http://127.0.0.1:${process.env.MODIVO_PREVIEW_PORT || '4173'}`;
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
test('shop search, filters, sorting, empty results and collection journey', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Explore the collection', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${base}/shop/`));
  const search = page.getByRole('searchbox');
  await search.fill('wedding');
  await expect(page.locator('.shop-grid .product-card')).toHaveCount(1);
  await expect(page.getByRole('status')).toContainText('1 idea');
  await search.fill('nothing-like-this');
  await expect(
    page.getByRole('heading', { name: 'A little space for what’s next.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Explore all ideas' }).click();
  await expect(page.locator('.shop-grid .product-card')).toHaveCount(3);
  await page.getByRole('combobox').selectOption('name');
  await expect(page.locator('.shop-grid .product-card h3').first()).toHaveText(
    'A fresh perspective',
  );
  await page.getByRole('radio', { name: 'Events & celebrations', exact: true }).check();
  await page.getByRole('link', { name: 'Inside this collection' }).click();
  await expect(page).toHaveURL(new RegExp(`${base}/collections/events/`));
  await page.locator('.product-card').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The art of gathering');
  await expect(page.getByRole('link', { name: 'Buy digital download' })).toHaveCount(0);
  await expect(page.getByText('Coming soon · not available to purchase')).toBeVisible();
  await page.getByRole('link', { name: /^License information/ }).click();
  await expect(page).toHaveURL(new RegExp(`${base}/license/`));
});
test('all storefront routes, refresh, metadata, keyboard and accessibility', async ({
  page,
  request,
}) => {
  test.setTimeout(90000);
  const routes = [
    'shop/',
    'about/',
    'contact/',
    'faq/',
    'privacy/',
    'terms/',
    'refund-policy/',
    'license/',
    'collections/creative/',
    'collections/planning/',
    'collections/events/',
    'collections/productivity/',
    'collections/automation/',
    'collections/development/',
    'products/a-little-more-space/',
    'products/the-art-of-gathering/',
    'products/a-fresh-perspective/',
  ];
  const titles = new Set<string>();
  const checkedLinks = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(`./${route}`);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title), title).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{30,}/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    const links = await page
      .locator('a[href]')
      .evaluateAll((elements) => [...new Set(elements.map((e) => (e as HTMLAnchorElement).href))]);
    for (const href of links) {
      if (new URL(href).origin === origin && !checkedLinks.has(href)) {
        expect((await request.get(href)).status(), href).toBe(200);
        checkedLinks.add(href);
      }
    }
  }
  for (const route of [
    'shop/',
    'faq/',
    'contact/',
    'products/a-little-more-space/',
    'collections/automation/',
  ]) {
    await page.goto(`./${route}`);
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
      route,
    ).toEqual([]);
  }
  await page.goto('./products/a-little-more-space/');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A little more space');
  await page.goto('./contact/');
  await expect(page.locator('.contact-email')).toHaveAttribute(
    'href',
    'mailto:modivo2026@gmail.com',
  );
  await page.goto('./shop/');
  await page.getByRole('radio', { name: 'All ideas', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Creative templates', exact: true })).toBeChecked();
});
test('storefront layouts at eight widths and mobile menu destination', async ({ page }) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of [
      'shop/',
      'products/a-little-more-space/',
      'collections/automation/',
      'about/',
      'contact/',
      'faq/',
    ]) {
      await page.goto(`./${route}`);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route} at ${width}`,
      ).toBe(true);
      if ([390, 1440].includes(width))
        await page.screenshot({
          path: `artifacts/storefront-${route.replaceAll('/', '-')}${width}.png`,
          fullPage: true,
        });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Shop', exact: true })
    .click();
  await expect(page).toHaveURL(new RegExp(`${base}/shop/`));
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  expect(errors).toEqual([]);
});
test('static content stays usable without JavaScript and analytics stay off', async ({
  browser,
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('./shop/');
  expect(
    requests.filter(
      (url) => url.includes('cloudflareinsights') || url.includes('google-analytics'),
    ),
  ).toEqual([]);
  await expect(page.locator('script[src*="cloudflareinsights"]')).toHaveCount(0);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const plain = await context.newPage();
  await plain.goto(`${origin}${base}/shop/`);
  await expect(plain.locator('.product-card')).toHaveCount(3);
  await expect(plain.getByRole('searchbox')).toBeHidden();
  await plain.locator('.product-card').first().click();
  await expect(plain.getByRole('heading', { level: 1 })).toHaveText('A little more space');
  await context.close();
});
