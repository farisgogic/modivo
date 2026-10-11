# MODIVO launch checklist

This separates implementation from business approval. Checked boxes represent repository work, not external account verification. Owner decisions below remain required. No deployment, commit, push, PR or purchase has been made.

## 1. Website ready — local implementation

- [x] Editorial identity retained; responsive home, shop, collections and detail pages implemented.
- [x] Search, category filters, sorting when supported, empty states and concept states.
- [x] About, Contact, FAQ, privacy, terms, refund-policy and license pages.
- [x] Typed catalog, build-time validation, real-data fields, hosted-checkout safeguards.
- [x] Static export, repository base path, fonts/images, 404, metadata and sitemap foundations.
- [x] Manual GitHub Actions workflow; publish input defaults off.
- [x] Optional analytics defaults off; no form, marketing pixel, account system or payment backend.
- [x] Local lint/type checks, static builds, catalog tests, root/subpath browser checks and Lighthouse documented in QA.md.
- [ ] Owner review of the final QA results and remaining testing limitations.

## 2. Business verification ready — owner work remains

- [x] Brand, confirmed contact email, location (Bosnia and Herzegovina), and digital-only model are stated.
- [x] Website structure and planned fulfillment are explained honestly; no approval claim.
- [ ] Verify MODIVO trademark/name availability and any domain choice.
- [ ] Supply responsible operator/legal identity and any legally required contact/address information.
- [ ] Determine registration, tax, consumer-law and privacy obligations with qualified advisers.
- [ ] Replace/review legal drafts, including retention, privacy rights, refunds and license scope.
- [ ] Confirm a GitHub repository/Pages URL and make the authorized website accessible for provider review.
- [ ] Submit Lemon Squeezy questionnaire/identity verification and obtain eligibility review.

The site can support an application; a concept-only catalog does not guarantee approval.

## 3. First product ready — owner work remains

- [ ] Create and test an actual downloadable product.
- [ ] Verify ownership and all third-party asset/dependency/service licenses.
- [ ] Create truthful images, description, included-file list, formats, compatibility and instructions.
- [ ] Decide price/currency, license, update policy, version, dates and FAQs.
- [ ] Upload deliverables to Lemon Squeezy, never to the public website asset folder.
- [ ] Populate the catalog and run validation and product QA.

## 4. Payments ready — external setup, not completed

- [ ] Obtain live-mode activation and product approval.
- [ ] Confirm actual payout eligibility and destination for the owner/account in Bosnia and Herzegovina.
- [ ] Complete test checkout and receipt checks; record that test-mode downloads are disabled.
- [ ] Copy/create the live product and verify stable Share checkout URL, price, files and support details.
- [ ] Arrange a separately authorized live fulfillment verification; this task authorizes no purchases.
- [ ] Verify refund/support procedures and actual payout setup.
- [ ] Only then set product live/verified/available fields and enable the global sales switch.

## 5. Public launch ready — final owner gate

- [ ] Approve final identity, legal text, contact details and product claims.
- [ ] Confirm public URL/basePath; inspect canonical/social/sitemap URLs on the deployed host.
- [ ] Set `LEGAL_APPROVED=true` only after reviewed text is in place; confirm indexability.
- [ ] Leave sales disabled unless the Payments and First Product lists are complete.
- [ ] Keep analytics off or configure a reviewed provider token, privacy disclosure and visitor opt-in; verify actual collection and stopping behavior.
- [ ] Test Safari/Firefox and real mobile devices; rerun Lighthouse on GitHub Pages with actual hosting compression/cache behavior.
- [ ] Confirm direct product links, refreshes, 404, contact mailto, checkout destination and final file access.
- [ ] Check the support mailbox is monitored and choose a sustainable support procedure.
- [ ] Explicitly authorize commit/push and deployment, then use the workflow’s publish input.

## Do not confuse these flags with approval

`LEGAL_APPROVED`, `SALES_ENABLED`, `checkoutVerified`, and `ANALYTICS_REVIEWED` record owner decisions. They do not perform legal review, verify a remote store, prove a purchase, or guarantee delivery. The public site must match the facts behind them.
