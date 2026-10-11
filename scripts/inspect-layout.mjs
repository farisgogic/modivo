import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
for (const width of [320, 390, 768, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
  console.log(
    width,
    await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      overflow: [...document.querySelectorAll('body *')]
        .map((e) => ({ tag: e.tagName, cls: e.className, right: e.getBoundingClientRect().right }))
        .filter((x) => x.right > window.innerWidth + 1),
    })),
  );
  await page.screenshot({ path: `artifacts/inspect-${width}.png`, fullPage: true });
}
await browser.close();
