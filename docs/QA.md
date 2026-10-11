# Validation report

Latest storefront verification: 12 October 2026. No commit, push, deployment, publication, external checkout, or purchase was performed.

## Current storefront results

- ESLint and TypeScript passed. Type checking now generates Next.js route types first, so a fresh checkout does not depend on an earlier build.
- Production static export passed at root and `/modivo/`. The canonical site has 18 pages, plus the legacy refund alias, not-found output, robots and sitemap. The generated output contains 22 HTML files, including framework not-found variants. `.nojekyll` is present.
- **14/14 catalog, checkout-rendering, discovery and metadata tests passed.** Synthetic checkout fixtures never enter the catalog and were never opened or purchased.
- **9/9 Playwright tests passed at root; 9/9 passed under `/modivo/`.** Root output was restored afterward. The final mobile typography adjustment was rebuilt and the complete root browser suite passed again.
- Browser tests use the production static export on isolated ports 4173/4174, with server reuse disabled. They do not test or stop an existing user development server.
- Home and six representative storefront routes were checked at **320, 375, 390, 430, 768, 1024, 1440 and 1920px**: no horizontal overflow. Screenshots cover home at all widths and six storefront routes at 390/1440px.
- All canonical storefront routes loaded; their titles were unique, descriptions present, and Open Graph titles consistent. Internal links returned 200; missing routes returned the custom 404. Direct product loads and refreshes passed.
- Search, category filters, name sorting, empty-state reset, category → product → license, mobile navigation, keyboard radio controls, skip link, disclosure controls and email destinations passed. Price/date sorting is unit-tested with isolated fixtures and clearly disabled for the current unpriced/undated catalog.
- Zero axe WCAG A/AA violations on home, product, shop, FAQ, Contact and an empty collection. This is automated coverage, not a full accessibility certification.
- JavaScript-disabled navigation, static product browsing and collection disclosures passed. Reduced-motion entrance behavior passed. No page errors occurred in the responsive checks; home console-error checks passed.
- Analytics remain off: no Cloudflare or Google Analytics requests/scripts in the tested shop. No public fixture URLs or fictional Product schema were found in exported HTML.

Visual review covered desktop shop, About and an empty collection, plus mobile shop, product and Contact. The first production test pass exposed a test locator that omitted a decorative arrow; it was corrected and the journey passed. Mobile notice, filter, field-label, result and product-meta typography was enlarged after the Lighthouse readability audit.

## Current Lighthouse measurement

Lighthouse 12.8.2, headless Chrome, default simulated mobile throttling, uncompressed static preview on port 4173:

| Page                               | Performance | Accessibility | Best practices | SEO | FCP  | LCP  | TBT  | CLS |
| ---------------------------------- | ----------- | ------------- | -------------- | --- | ---- | ---- | ---- | --- |
| Home                               | 84          | 100           | 100            | 63  | 1.2s | 4.6s | 10ms | 0   |
| Shop, after readability correction | 85          | 100           | 100            | 63  | 1.1s | 4.4s | 10ms | 0   |

Reports: `artifacts/lighthouse-storefront-home.json` and `artifacts/lighthouse-storefront-shop.json`. Shop best-practices improved from 96 to 100 after enlarging functional text; the legible-text audit now passes. SEO is limited by intentional noindex/crawl blocking. Text compression and framework JavaScript dominate the local performance opportunities. These are lab measurements, not deployed Core Web Vitals or a 90+ performance claim. Remeasure GitHub Pages compression, caching and real network behavior after an authorized launch.

## Current limitations

Chrome only; Safari, Firefox and real devices remain to be tested. Actual product galleries, live purchase navigation, third-party checkout, receipt delivery, downloadable files, refunds, payouts and analytics collection cannot be verified without real owner-provided products/accounts. Checkout rendering safeguards were tested with an isolated URL fixture; no payment-success claim is made. Contact links were tested, but mailbox ownership or email delivery was not. The manual GitHub Actions workflow has not run remotely.

Canonical/social repository paths were tested with an isolated metadata fixture; the public build contains no assumed domain and intentionally remains noindex. Verify deployed metadata, social previews and sitemap once the real Pages URL is confirmed. Product/Offer schema is conditional on a real available listing and enabled sales; current concepts emit none.

See LAUNCH.md for the separate website, business, product, payment and public-launch gates.

## Earlier studio refinement — 11 October 2026

The refined design passed production build, ESLint, TypeScript, and **5/5 Playwright tests** on 11 October 2026. Responsive checks cover 320, 390, 768, 1440, and 1920 pixels; home and product axe checks report zero violations. The new test verifies keyboard selection and mutually exclusive pressed states for the hero concept controls. Screenshot review covered the revised desktop gallery, mobile stack, shortened philosophy, and large footer wordmark. JavaScript-free and reduced-motion checks still pass.

The new Lighthouse run (`artifacts/lighthouse-refinement.json`) measured **83 performance, 100 accessibility, 100 best practices, 63 SEO** on the same uncompressed local preview. FCP 1.2s, LCP 4.7s, TBT 30ms, CLS 0. This does not demonstrate a performance improvement over the previous run; deployed performance remains to be measured. The indexing restriction remains intentional. GitHub Pages path handling was not changed; the subpath verification below describes the previous implementation pass.

The results below are the initial implementation baseline, retained for comparison.

## Checks executed

| Check                                    | Result                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ESLint                                   | Passed, zero warnings/errors                                                                          |
| TypeScript                               | Passed                                                                                                |
| Production static export                 | Passed; home, three product routes, three legal routes, 404, robots, sitemap                          |
| Checkout and catalog tests               | 4 passed                                                                                              |
| Playwright at root path                  | 4 passed                                                                                              |
| Playwright at `/modivo/` repository path | 4 passed                                                                                              |
| Responsive widths                        | 320, 390, 768, 1440, 1920 pixels; no horizontal overflow                                              |
| Keyboard                                 | Skip link, mobile toggle, Escape close/focus return, native collection disclosures                    |
| Reduced motion                           | Entrance animation disabled; stylesheet removes transitions and pointer transforms                    |
| JavaScript disabled                      | Mobile navigation visible, native collection disclosures and product links functional                 |
| Browser errors                           | No page or console errors in tested home views                                                        |
| Accessibility                            | Zero axe WCAG A/AA violations on home and representative product page                                 |
| Internal links                           | Homepage navigation, product and legal links return 200; custom missing route returns 404             |
| Repository-path assets and metadata      | Verified `/modivo/` asset/icon paths, canonical, social image, seven sitemap entries, and `.nojekyll` |

The GitHub Pages path test used `https://example.invalid/modivo/` only as a local metadata fixture. It is not a proposed or assumed public URL. Root-local output was rebuilt afterward.

## Lighthouse

Production static export served from `http://127.0.0.1:3000/`, Chrome headless, Lighthouse 12.8.2, default simulated mobile throttling:

| Category       | Score |
| -------------- | ----- |
| Performance    | 85    |
| Accessibility  | 100   |
| Best practices | 100   |
| SEO            | 63    |

Measured FCP 1.1s, LCP 4.4s, total blocking time 10ms, CLS 0. These are local lab results, not field Core Web Vitals or a claim about deployed performance. The deliberately simple preview server does not compress responses or configure production cache headers. The report flags uncompressed assets and framework JavaScript; deployment performance must be remeasured on GitHub Pages. The site remains intentionally `noindex` with crawl blocking until the URL and legal review are configured; that is the failing SEO audit. Legible-text audit passes after refinement.

The initial Lighthouse pass was 83/100/96/63. Font preloading and readable supporting text improved the measured result to 85/100/100/63. No 90+ performance claim is made.

Reports and screenshots are generated under ignored `artifacts/`. Run the documented tests to recreate them.

## Two design review passes

1. Evaluated the three concepts and the first complete implementation. Simplified the category index to native HTML, provided a no-JavaScript menu fallback, kept concepts honest, and removed an unsupported registration mark.
2. Inspected actual desktop and mobile full-page screenshots. Corrected sheet-stack overflow at 320px and tablet widths, increased supporting text and caption sizes, refined concept labels, and preloaded the local font. Repeated responsive screenshots and accessibility checks after corrections. The final desktop/mobile composition uses consistent margins, deliberate section contrast, and a mobile-specific vertical hero.

## Limitations and launch prerequisites

- Browser verification used Chrome; Safari and Firefox device testing was not performed.
- GitHub Actions is prepared and manual-only; it has not run remotely. Pages configuration and permissions require verification when the repository is confirmed.
- Lighthouse reflects a local uncompressed preview, not deployed caching or network performance.
- Trademark, domain, and MODIVO name availability must be verified. No legal availability is assumed.
- Replace legal drafts with reviewed policies and identify the responsible operator and jurisdiction before launch. Set the legal approval flag only afterward.
- Confirm the final GitHub Pages URL; configure metadata during the deployment build.
- No real product files, prices, checkout links, or licenses were supplied. Concepts remain unavailable for purchase. Publish final product details and complete Lemon Squeezy onboarding before enabling sales.
- Contact is a working mailto link to modivo2026@gmail.com; email delivery/mailbox ownership was not tested.
