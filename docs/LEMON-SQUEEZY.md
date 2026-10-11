# Lemon Squeezy: owner activation and verification

Prepared from official documentation checked 11–12 October 2026. **No account was accessed, store activated, purchase performed, payout verified, or file delivery tested by this project.** Recheck provider rules at release.

## Responsibilities and architecture

MODIVO supplies the product, accurate listing, license, and product support. Lemon Squeezy is the planned merchant of record for hosted transactions: it handles payment, transaction-related tax, refunds and chargebacks under its terms. This does not confirm MODIVO’s activation or resolve the owner’s business obligations. [Official merchant-of-record documentation](https://docs.lemonsqueezy.com/help/payments/merchant-of-record).

Flow: MODIVO product page → external Lemon Squeezy hosted checkout → provider confirmation/receipt → provider file delivery. No API key, Lemon.js overlay, webhook, order database, authentication, custom downloads, or payment-success route is needed. Never interpret a redirect as proof of payment. [Hosted checkout](https://docs.lemonsqueezy.com/help/checkout/hosted-checkout).

## Activation — owner action

- Complete the business/customer questionnaire accurately and provide identity verification. Describe the real digital goods, intended audience, and website; do not invent registration details. Confirm product eligibility and acceptance of the business model. Activation involves provider review, not automatic approval. Test products must be copied to live mode; they are not promoted automatically. [Activate your store](https://docs.lemonsqueezy.com/help/getting-started/activate-your-store).
- Bosnia and Herzegovina is listed for bank payouts in the documentation checked. This is not confirmation that this owner, account, bank, or payout setup has been approved. Verify the actual available bank/PayPal options during onboarding. [Supported countries](https://docs.lemonsqueezy.com/help/getting-started/supported-countries).
- Set up the payout destination and any requested tax/identity information in the provider dashboard. Confirm currency, payout requirements and the ability to receive funds on the actual account. Do not enter account or tax details into this website’s source. [Getting paid](https://docs.lemonsqueezy.com/help/getting-started/getting-paid).

## Test checkout — owner procedure, no real money

1. In the Lemon Squeezy dashboard, explicitly select **test mode**.
2. Create a separate test product with one-time pricing and upload a non-sensitive test file. Confirm title, product type and file names. Keep test URLs outside the public catalog.
3. Publish the test-mode product and use **Share/Preview** for its test checkout. Confirm test mode before proceeding.
4. Use the provider’s documented test card (for example `4242 4242 4242 4242`), future expiry and test CVC, never real payment-card details.
5. Check the order in the dashboard and the receipt. **Test receipts are sent to the owner/team, regardless of the customer email entered. File downloads are disabled for all test-mode purchases.** Record checkout/receipt success separately from file-access verification.
6. Exercise a failure case with the provider’s test-card instructions. Check dashboard refund/support controls on the test order where supported; do not assume a test refund validates settlement in live mode.

Source: [Test mode](https://docs.lemonsqueezy.com/help/getting-started/test-mode). A successful test checkout cannot prove digital delivery or live payout readiness.

## Files and live verification

Upload only the final deliverables to the product in Lemon Squeezy. Its file delivery makes purchased files accessible through its supported flow; replacing product files can affect what existing buyers download, so keep a version/change log. [Adding products and files](https://docs.lemonsqueezy.com/help/products/adding-products).

After approval, copy or create the final live product. Confirm all copied media, variants, prices and files in live mode. Obtain the stable URL from **Share**, with `/checkout/buy/…`; do not paste a `/checkout/?cart=…` address from the browser, since cart links are customer-specific. [Sharing products](https://docs.lemonsqueezy.com/help/products/sharing-products).

Before setting `checkoutVerified: true`:

- Independently confirm that the URL is for the live product and that the displayed product, price, currency, tax handling, license and support details match MODIVO.
- Verify the real confirmation, receipt and download-access flow using an owner-arranged, explicitly authorized live transaction or another provider-supported live verification method. **No real transaction is authorized by this project.** Do not attempt to bypass test-mode download restrictions.
- Download and open every delivered file using the stated software/version; verify Canva access or workflow import from a clean customer context.
- Record order reference, file/version, test date, result, and tester privately. Never store private customer or billing details in the repository.
- Confirm refund handling and payout visibility with the provider. Then enable the reviewed public product and the global sales switch.

## Refunds and support

MODIVO should define a reviewed refund policy and handle product questions through modivo2026@gmail.com. Lemon Squeezy processes refunds and retains discretion under its own policy, including refund decisions intended to prevent chargebacks. Do not publish an absolute no-refunds claim that ignores platform terms or mandatory consumer rights. [Refunds and chargebacks](https://docs.lemonsqueezy.com/help/payments/refunds-chargebacks).

Support workflow: ask for product name, order reference, error and software version; investigate the file or instructions; involve Lemon Squeezy for checkout/transaction issues; document the resolution privately. Never ask for passwords, API secrets, or card details. No response-time guarantee is set yet.

## Category-specific checks

**Canva:** sell an original design, not standalone Canva content. Canva states that templates containing Pro Content must be sold as Canva template links, rather than template PDFs or other exported file types. Confirm the current license and template-link rules for every asset and disclose account/Pro requirements. A PDF containing access instructions is not permission to export/re-sell restricted template artwork. [Canva product-sale guidance](https://www.canva.com/help/using-canva-to-create-products-for-sale/).

**Developer starter kits:** audit dependency licenses and required attribution, list supported runtime/tool versions, remove secrets, test a clean install/build, and document required environment variables and paid external services. The MODIVO license cannot supersede third-party licenses.

**n8n:** test JSON import and document the exact n8n version, nodes, credentials, service subscriptions and activation steps. Exported JSON may include credential names/IDs or authentication headers; sanitize before distribution. [Official export/import guidance](https://docs.n8n.io/build/manage-workflows/export-and-import.md). Review the Sustainable Use License and service-specific restrictions for the intended use; n8n Cloud and hosted/resold software have distinct conditions. Seek clarification for ambiguous commercial use. [Official n8n licensing guidance](https://support.n8n.io/article/can-i-use-your-license-for-my-use-case).
