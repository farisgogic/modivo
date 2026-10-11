# Adding and maintaining products

Edit `src/lib/catalog.ts`. Collections are defined in `categories`; their IDs are stable slugs for `/collections/[id]/`. A collection without products still gets a useful empty-state page. Edit `title`, `short`, `description`, `mark`, and the existing color token for its editorial identity. Product `category` must match a configured ID.

## From concept to real listing

1. Create the actual deliverable and test it independently. Do not put paid downloads in `public/`: that folder is public. Upload purchased files to Lemon Squeezy later.
2. Add a unique `id` and URL-safe `slug`; fill `title`, concise `description`, `fullDescription`, category and searchable `tags`. Use `status: 'coming-soon'` until ready.
3. Add local preview artwork to `public/products/your-slug/`. Use optimized WebP/AVIF or sensible PNG/SVG files; supply `src` beginning with `/`, meaningful `alt`, actual `width`, and `height`. Paths must exist; basePath is applied by the rendering components. Add multiple images to enable gallery controls. Concept CSS art is a fallback, not evidence of a finished product.
4. Fill `includedFiles`, `fileFormats`, `compatibility`, `instructions`, `audience`, `features`, `licenseType`, `licenseSummary`, `updates`, `version`, `updatedAt`, `publishedAt`, `faq`, and `relatedProducts` (valid product slugs). Dates use `YYYY-MM-DD`; newest sorting uses publication date, not an invented concept date.
5. Set a real `price: { amount, currency }`. Amounts are integer ISO-currency minor units: USD 1200 = $12.00; JPY 1200 = ¥1,200; KWD 1234 = 1.234 KWD. Prices must be positive; no discounts or price comparisons are invented. Match the Lemon Squeezy listing and explain applicable taxes at checkout. Price sorting is disabled for unpriced catalogs or mixed currencies.
6. Complete the payment and delivery checks in `LEMON-SQUEEZY.md`. Copy the stable live Share URL (`https://your-store.lemonsqueezy.com/checkout/buy/<id>`), not the address-bar cart URL. Set `checkoutMode: 'live'` and `checkoutVerified: true` **only after manually confirming the link belongs to the live product**. An opaque URL cannot prove test/live status by itself.
7. Set `status: 'available'` only for an actual released product with complete information. Keep the global sales flag off until reviewed business/legal/public-URL configuration and store activation are complete.
8. Run `npm run validate:catalog`, `npm test`, `npm run build`, and browser checks. Review the real gallery, compatibility, price, license, and checkout destination. A normal product release is a data/content change, not an architecture change.

Concepts deliberately use null prices/versions/dates/licenses and empty file arrays. Those gaps are visibly described as unconfirmed on their pages. Do not fill them with fictional specifications. An available record fails the build if required release details are missing. Never store test links in the public catalog, even if hidden by a button.

## Checkout safeguards

A buy link requires the sales switch, reviewed legal configuration and public URL, available status, positive price, `checkoutMode: 'live'`, owner verification, and a valid stable HTTPS Lemon Squeezy URL. Query strings, fragments, credentials, cart URLs, foreign hosts and insecure schemes are rejected. Rebuild whenever changing availability, prices or URLs.

The `checkoutVerified` flag records owner attestation; validation does not call Lemon Squeezy or prove that the remote product exists, matches the price, or is approved. The website performs no payment verification, does not collect card data, and does not create success or download pages.

## Product-specific requirements

- **Canva:** state editability, Free/Pro account needs, template link access, asset restrictions, and any paid content. Use an original design and audit Canva licensing. Do not distribute editable source access as a public collaboration link.
- **Developer resources:** document runtime/dependency versions, install/build steps, environment variables, supported platforms, license notices and third-party costs. Remove secrets and run a clean-install test.
- **n8n:** document the tested n8n version, JSON import steps, node requirements, external services, credentials to create, API costs/quotas, sample data and activation steps. Remove embedded auth headers, credential names or other sensitive export data. Review n8n and service licensing; selling an original workflow is not permission to resell hosted n8n software.

For all products: explicitly state permitted uses, software/subscription requirements, whether updates are included, and where support is available. Review homepage/FAQ launch wording when the first live product is introduced.
