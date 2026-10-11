# MODIVO

An editorial digital-product storefront, built with Next.js App Router, React, TypeScript, and Tailwind CSS. Static HTML export for GitHub Pages; no backend, authentication, database, payment API, or paid hosting requirement.

MODIVO is based in **Bosnia and Herzegovina**. Contact: **modivo2026@gmail.com**. No custom domain, registered company details, live products, or payment-provider approval are assumed. Current products are clearly labeled design concepts and cannot be purchased.

## Run locally

Node 22 LTS recommended (minimum 20.9). Dependencies are locked.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Copy `.env.example` to `.env.local` only when configuration is needed. Leave the public URL and base path blank for normal local development.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:browser
npm run preview
```

The build first validates the catalog and environment, then exports to `out/`. Browser tests start a local static server on an isolated port and use installed Google Chrome; install Chrome or adjust the Playwright channel for another installed browser. Screenshots and reports go into ignored `artifacts/`. Run `npm run preview` separately to browse the production export at http://127.0.0.1:4173. Browser tests own an isolated server on that port and do not reuse a development server.

## Pages and editing

| Where                                | What to edit                                                               |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `src/app/page.tsx`                   | Homepage copy and editorial sections                                       |
| `src/app/shop/`                      | Shop with static-catalog search, category filters and sorting              |
| `src/app/collections/[slug]/`        | Statically generated collection pages                                      |
| `src/app/products/[slug]/`           | Product details, gallery, specifications, FAQs and related products        |
| `src/app/about/`, `contact/`, `faq/` | Brand story, email support and FAQs                                        |
| `src/lib/catalog.ts`                 | Products, prices, images, collection data and checkout configuration       |
| `src/lib/policies.ts`                | Privacy, terms, refund policy and license drafts; **review before launch** |
| `src/lib/site.ts`, `seo.ts`          | Brand/contact configuration and per-page SEO                               |
| `src/app/globals.css`                | Foundational design tokens and original components                         |
| `src/app/refinement.css`             | Studio identity refinement                                                 |
| `src/app/storefront.css`             | Shop, collection, detail, information pages and shared motion              |
| `src/components/product-art.tsx`     | Original CSS concept artwork                                               |
| `public/`                            | Local images, favicon, and editable SVG/PNG social preview                 |

Shop prices and newest ordering remain unavailable when the data does not support them. Mixed currencies are not compared as though they were equivalent. Concept previews have no invented prices, files, dates, or licenses. The legacy `/refunds/` route remains available, with canonical URL pointing to `/refund-policy/`.

Detailed guides: [Adding products](docs/CATALOG.md), [Lemon Squeezy activation and testing](docs/LEMON-SQUEEZY.md), [Launch checklist](docs/LAUNCH.md), [Actual QA results](docs/QA.md), [Design rationale](docs/DESIGN.md).

## GitHub Pages

The prepared workflow `.github/workflows/deploy-pages.yml` is **manual only**. Its `deploy` input defaults to **false**: an ordinary manual run validates and uploads an artifact; publication requires explicitly checking that input. Nothing has been committed, pushed, or deployed by this task.

When authorized:

1. Confirm the repository and final URL. Commit/push only with owner authorization.
2. Set repository **Settings → Pages → Source → GitHub Actions**. Configure the `github-pages` environment and any required approvals.
3. `actions/configure-pages` supplies the actual `base_url` and `base_path`. Next.js embeds the right path for project Pages (`/repository/`) or root/custom-domain hosting.
4. Run the workflow with deployment **disabled** to inspect validation and the static artifact.
5. Complete the applicable launch checklist, then explicitly run with deployment enabled.

`.nojekyll` is included, and the export contains real HTML for deep routes and `404.html`. Do not add an SPA fallback or use server features. GitHub Pages has limited custom response-header control; measure the final served site rather than assuming local cache behavior.

### Configuration

| Build variable                           | Default and purpose                                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                   | Unset. Full confirmed HTTPS base URL including repository path. No placeholder in public builds.                  |
| `NEXT_PUBLIC_BASE_PATH`                  | Empty. `/repository-name` for project Pages, empty for root hosting.                                              |
| `NEXT_PUBLIC_CONTACT_EMAIL`              | `modivo2026@gmail.com`                                                                                            |
| `NEXT_PUBLIC_LEGAL_APPROVED`             | `false`. Owner attestation **after replacing/reviewing legal text**; enables indexing when the public URL exists. |
| `NEXT_PUBLIC_SALES_ENABLED`              | `false`. Also requires URL/legal configuration and per-product live/verified checkout.                            |
| `NEXT_PUBLIC_ANALYTICS_ENABLED`          | `false`. Optional Cloudflare Web Analytics, loaded only after visitor opt-in.                                     |
| `NEXT_PUBLIC_ANALYTICS_REVIEWED`         | `false`. Owner attestation after reviewing provider, audience, consent, and disclosures.                          |
| `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | Empty. Public beacon site token, **not** an API secret.                                                           |

Repository variables map to `LEGAL_APPROVED`, `SALES_ENABLED`, `ANALYTICS_ENABLED`, `ANALYTICS_REVIEWED`, and `CLOUDFLARE_ANALYTICS_TOKEN` in the workflow. All values are baked into the build. Never add secrets to `NEXT_PUBLIC_*` variables.

### Repository path check

```sh
NEXT_PUBLIC_BASE_PATH=/modivo npm run build
NEXT_PUBLIC_BASE_PATH=/modivo MODIVO_PREVIEW_PORT=3001 npm run test:browser
NEXT_PUBLIC_BASE_PATH=/modivo npm run preview
```

Leave the URL unset for this local path-only test. When a real public URL is confirmed, set it with the same path; validation rejects mismatches. Stop any existing preview on the desired port first. Restore normal local output with `npm run build` afterward. `MODIVO_PREVIEW_PORT` is only for local QA.

### Custom domain later

Verify ownership/name availability, configure the domain and DNS in GitHub Pages, wait for HTTPS, then rebuild with the Pages action’s updated URL/base path (usually empty). Confirm canonicals, social images, sitemap, fonts, and deep links. Do not create a CNAME file or redirect to an unconfirmed hostname. Recheck indexing and the Lemon Squeezy business website URL.

## SEO and privacy

Each public page has its own title, description, canonical URL when known, Open Graph and Twitter metadata. Breadcrumb structured data is generated only when a public URL exists. Concepts emit no Product offers, reviews, or availability schema. Sitemap covers the canonical public routes. Without a confirmed URL and legal review the site is deliberately `noindex`; local social-image URLs are omitted rather than inventing a public domain.

Analytics are disabled. Optional [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/get-started/) needs no proxy/DNS change and has a free service. If configured and reviewed, visitors can opt in using the footer control; no script loads beforehand. Consent is kept only in memory, and a full reload stops it. No cookies or consent IDs are stored by MODIVO. Provider data collection and audience-specific consent requirements need owner review; the privacy page switches its disclosure with the configuration. This integration has not been connected to a real analytics account.

The contact route uses mailto, not a form. For a later form, [Formspree](https://formspree.io/) is a static-hosting-compatible option to evaluate; confirm current plan limits, privacy terms, abuse controls and accessibility before adding it. No form service is installed or connected.
