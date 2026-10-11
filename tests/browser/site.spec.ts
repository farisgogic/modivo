import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const origin = `http://127.0.0.1:${process.env.MODIVO_PREVIEW_PORT || '4173'}`;
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
test('responsive layouts, clean console, and accessible home', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('./');
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      document.getAnimations().forEach((animation) => {
        if (animation.timeline instanceof DocumentTimeline) animation.finish();
      }),
    );
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Beautifully');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true });
  }
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(errors).toEqual([]);
});
test('keyboard menu, disclosure, product routes, and contact', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByText('Skip to content')).toBeFocused();
  const menu = page.locator('.menu-toggle');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.getByText('Planners & organizers', { exact: true }).first().click();
  await expect(page.getByText('Digital planners and gentle systems')).toBeVisible();
  await page.locator('.product-card').first().click();
  await expect(page).toHaveURL(new RegExp(`${base}/products/a-little-more-space/`));
  await expect(page.getByRole('heading', { name: 'An idea in the making.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ask us about it' })).toHaveAttribute(
    'href',
    /^mailto:modivo2026@gmail.com/,
  );
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations,
  ).toEqual([]);
});
test('internal links, assets, legal routes, and missing page', async ({ page, request }) => {
  await page.goto('./');
  const paths = await page
    .locator('a[href]')
    .evaluateAll((links) => [...new Set(links.map((link) => (link as HTMLAnchorElement).href))]);
  for (const path of paths) {
    const url = new URL(path);
    if (url.origin !== origin) continue;
    expect((await request.get(url.href)).status(), url.href).toBe(200);
  }
  for (const path of ['privacy/', 'terms/', 'refunds/']) {
    await page.goto(`./${path}`);
    await expect(page.getByText('Draft for review.', { exact: false })).toBeVisible();
  }
  expect((await request.get(`${base}/social-preview.png`)).status()).toBe(200);
  expect((await request.get(`${base}/icon.svg`)).status()).toBe(200);
  expect((await request.get(`${base}/does-not-exist/`)).status()).toBe(404);
  await page.goto('./does-not-exist/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Nothing here.');
});
test('reduced motion and JavaScript-free navigation', async ({ browser }) => {
  const context = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${origin}${base}/`);
  expect(
    await page.locator('.hero-copy').evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none');
  await page.screenshot({ path: 'artifacts/reduced-motion.png' });
  await context.close();
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const plain = await noJs.newPage();
  await plain.goto(`${origin}${base}/`);
  await expect(plain.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await plain.getByText('Developer resources', { exact: true }).click();
  await expect(plain.getByText('Starter kits and software templates')).toBeVisible();
  await plain.locator('.product-card').first().click();
  await expect(plain.getByRole('heading', { level: 1 })).toHaveText('A little more space');
  await noJs.close();
});

test('hero concepts can be explored with keyboard controls', async ({ page }) => {
  await page.goto('./');
  const controls = page.getByRole('group', { name: 'Explore concept compositions' });
  const creative = controls.getByRole('button', { name: 'Think different' });
  await creative.focus();
  await page.keyboard.press('Enter');
  await expect(creative).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.hero-object')).toHaveClass(/selected-creative/);
  const stationery = controls.getByRole('button', { name: 'Bring together' });
  await stationery.click();
  await expect(stationery).toHaveAttribute('aria-pressed', 'true');
  await expect(creative).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.hero-object')).toHaveClass(/selected-stationery/);
});
