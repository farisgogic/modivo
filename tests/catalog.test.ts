import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  checkoutFor,
  products,
  validCheckoutUrl,
  formatPrice,
  type Product,
} from '../src/lib/catalog';
import { validateCatalog } from '../src/lib/catalog-validation';
import { discoverProducts } from '../src/lib/discovery';
// Isolated fixture: never inserted into the public catalog, visited, or purchased.
const live: Product = {
  ...products[0],
  slug: 'test-fixture',
  id: 'fixture',
  status: 'available',
  price: { amount: 1200, currency: 'USD' },
  checkoutUrl: 'https://fixture.lemonsqueezy.com/checkout/buy/00000000-0000-0000-0000-000000000000',
  checkoutMode: 'live',
  checkoutVerified: true,
  images: [{ src: '/fixture.webp', alt: 'Fixture artwork', width: 100, height: 100 }],
  includedFiles: ['Example'],
  fileFormats: ['PDF'],
  compatibility: ['PDF reader'],
  instructions: ['Open the file'],
  audience: ['Test audience'],
  features: ['Test feature'],
  licenseType: 'Test license',
  licenseSummary: 'Test permissions',
  updates: 'No promised updates',
  version: '1',
  updatedAt: '2026-10-11',
  publishedAt: '2026-10-11',
  faq: [{ question: 'Test?', answer: 'Yes.' }],
  relatedProducts: [],
};
test('concept and coming-soon states never allow checkout', () => {
  for (const status of ['concept', 'coming-soon'] as const)
    assert.equal(checkoutFor({ ...live, status }, true), null);
});
test('global sales switch, live mode and verified link are all required', () => {
  assert.equal(checkoutFor(live, false), null);
  assert.equal(checkoutFor({ ...live, checkoutMode: 'test' }, true), null);
  assert.equal(checkoutFor({ ...live, checkoutVerified: false }, true), null);
  assert.equal(checkoutFor(live, true), live.checkoutUrl);
});
test('stable checkout only: no cart, credentials, query, test params or foreign host', () => {
  for (const url of [
    'javascript:alert(1)',
    'http://fixture.lemonsqueezy.com/checkout/buy/00000000-0000-0000-0000-000000000000',
    'https://fixture.lemonsqueezy.com/checkout/?cart=abc',
    live.checkoutUrl + '?test=1',
    live.checkoutUrl + '#test',
    'https://lemonsqueezy.com.evil.com/checkout/buy/00000000-0000-0000-0000-000000000000',
    'https://user:pass@fixture.lemonsqueezy.com/checkout/buy/00000000-0000-0000-0000-000000000000',
    'invalid',
  ])
    assert.equal(validCheckoutUrl(url), false, url);
});
test('incomplete and invalid prices never allow checkout', () => {
  assert.equal(checkoutFor({ ...live, price: null }, true), null);
  assert.equal(checkoutFor({ ...live, checkoutUrl: null }, true), null);
  for (const amount of [-1, 0, NaN, Infinity, 1.5])
    assert.equal(checkoutFor({ ...live, price: { amount, currency: 'USD' } }, true), null);
});
test('prices use currency-specific minor units', () => {
  assert.equal(formatPrice({ amount: 1200, currency: 'USD' }), '$12.00');
  assert.equal(formatPrice({ amount: 1200, currency: 'JPY' }), '¥1,200');
  assert.match(formatPrice({ amount: 1234, currency: 'KWD' }), /1\.234/);
});
test('current catalog validates without fabricated commercial details', () => {
  assert.deepEqual(validateCatalog(products), []);
  for (const p of products.filter((p) => p.status === 'concept')) {
    assert.equal(p.price, null);
    assert.equal(checkoutFor(p, true), null);
  }
});
test('reject duplicate identities and unknown categories', () => {
  assert.match(validateCatalog([products[0], products[0]]).join(' '), /duplicate/);
  assert.match(
    validateCatalog([{ ...products[0], category: 'missing' as Product['category'] }]).join(' '),
    /unknown category/,
  );
});
test('reject broken images and unsafe paths', () => {
  for (const src of ['/missing.png', '/../secret.png', 'https://external.com/image.png'])
    assert.match(
      validateCatalog(
        [{ ...live, images: [{ src, alt: 'Image', width: 100, height: 100 }] }],
        () => false,
      ).join(' '),
      /image/,
    );
});
test('reject test mode, incomplete live records and impossible dates', () => {
  assert.match(validateCatalog([{ ...live, checkoutMode: 'test' }]).join(' '), /test checkout/);
  assert.match(validateCatalog([{ ...live, licenseSummary: null }]).join(' '), /licenseSummary/);
  assert.match(validateCatalog([{ ...live, updatedAt: '2026-02-31' }]).join(' '), /date/);
  assert.deepEqual(validateCatalog([live]), []);
});
test('search combines name, description and tags without mutating catalog', () => {
  const before = products.map((p) => p.id);
  assert.equal(discoverProducts(products, { query: 'wedding' }).length, 1);
  assert.equal(discoverProducts(products, { query: 'SPACE' }).length, 1);
  assert.equal(discoverProducts(products, { query: 'no-such-product' }).length, 0);
  assert.deepEqual(
    products.map((p) => p.id),
    before,
  );
});
test('category filters and alphabetical sorting compose', () => {
  assert.equal(discoverProducts(products, { category: 'automation' }).length, 0);
  assert.equal(discoverProducts(products, { category: 'events', query: 'invitation' }).length, 1);
  assert.equal(discoverProducts(products, { sort: 'name' })[0].slug, 'a-fresh-perspective');
});
test('price and newest sorting keep unpriced and undated concepts last', () => {
  const older = {
    ...live,
    id: 'older',
    price: { amount: 500, currency: 'USD' },
    publishedAt: '2025-01-01',
  };
  const items = [products[0], live, older];
  assert.equal(discoverProducts(items, { sort: 'price-low' })[0].id, 'older');
  assert.equal(discoverProducts(items, { sort: 'price-high' })[0].id, 'fixture');
  assert.equal(discoverProducts(items, { sort: 'newest' })[0].id, 'fixture');
});

test('rendered checkout action never exposes the fixture URL when sales are disabled', async () => {
  const { createElement } = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { CheckoutAction } = await import('../src/components/checkout-action');
  const oldSales = process.env.NEXT_PUBLIC_SALES_ENABLED;
  const oldLegal = process.env.NEXT_PUBLIC_LEGAL_APPROVED;
  const oldUrl = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    process.env.NEXT_PUBLIC_SALES_ENABLED = 'false';
    assert.equal(
      renderToStaticMarkup(createElement(CheckoutAction, { product: live })).includes(
        live.checkoutUrl!,
      ),
      false,
    );
    process.env.NEXT_PUBLIC_SALES_ENABLED = 'true';
    process.env.NEXT_PUBLIC_LEGAL_APPROVED = 'true';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.invalid/';
    assert.ok(
      renderToStaticMarkup(createElement(CheckoutAction, { product: live })).includes(
        live.checkoutUrl!,
      ),
    );
    assert.equal(
      renderToStaticMarkup(
        createElement(CheckoutAction, { product: { ...live, status: 'concept' } }),
      ).includes(live.checkoutUrl!),
      false,
    );
  } finally {
    for (const [key, value] of [
      ['NEXT_PUBLIC_SALES_ENABLED', oldSales],
      ['NEXT_PUBLIC_LEGAL_APPROVED', oldLegal],
      ['NEXT_PUBLIC_SITE_URL', oldUrl],
    ]) {
      if (value === undefined) delete process.env[key!];
      else process.env[key!] = value;
    }
  }
});

test('canonical and social metadata keep the configured repository path', async () => {
  const { site } = await import('../src/lib/site');
  const { pageMetadata } = await import('../src/lib/seo');
  const old = site.url;
  try {
    site.url = 'https://example.invalid/modivo/';
    const metadata = pageMetadata('Test title', 'Test description', '/shop/');
    assert.equal(metadata.alternates?.canonical, 'https://example.invalid/modivo/shop/');
    assert.match(
      JSON.stringify(metadata.openGraph),
      /https:\/\/example.invalid\/modivo\/social-preview.png/,
    );
    site.url = undefined;
    assert.equal(pageMetadata('Test', 'Description', '/shop/').alternates?.canonical, undefined);
  } finally {
    site.url = old;
  }
});
