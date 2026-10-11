import { analyticsEnabled } from './site';
export type Policy = { title: string; description: string; sections: [string, string][] };
export const policies: Record<string, Policy> = {
  privacy: {
    title: 'Privacy policy',
    description:
      'How the MODIVO website, email support, optional analytics, and future hosted checkout handle information. Draft for owner review.',
    sections: [
      [
        'Who this concerns',
        'MODIVO is a digital products brand based in Bosnia and Herzegovina. The responsible legal operator and any required address disclosures have not yet been confirmed. Contact modivo2026@gmail.com with privacy questions.',
      ],
      [
        'Browsing this website',
        'This is a static website prepared for GitHub Pages. It has no customer accounts, contact forms, or order database. Fonts and product artwork are served with the site. GitHub may process request information, including IP addresses, to operate and protect its hosting service.',
      ],
      [
        'Email you send us',
        'Contact links open your email application. If you choose to email MODIVO, Gmail receives your address, message, and attachments. We use the information you send to address your question or support issue. Do not send passwords, API keys, or card information.',
      ],
      [
        'Analytics and local storage',
        analyticsEnabled
          ? 'Optional Cloudflare Web Analytics is configured. No analytics script is loaded until you enable it using the footer control. It measures page visits and performance; Cloudflare receives technical request data when the script runs. Consent is held only in page memory, is not saved in cookies or browser storage, and resets on a full reload. Use “Stop analytics and reload” in the footer to stop future requests. Previously sent data is not recalled.'
          : 'Analytics are disabled. The application does not add tracking cookies, marketing pixels, or analytics requests, and does not store search or filter choices in browser storage.',
      ],
      [
        'Future purchases',
        'When sales are enabled, Lemon Squeezy will handle checkout and digital delivery under its own terms and privacy policy. It may collect payment, billing, and transaction details; MODIVO may receive order and customer information needed for support. This website does not collect or verify payment-card data.',
      ],
      [
        'Requests and retention — owner review required',
        'Before launch, the owner must identify the responsible operator, applicable legal bases, retention schedule, international-transfer information, rights and complaint procedures, and any required consent notices for the intended audience. Those matters have not been finalized. Contact us with access, correction, or deletion questions so the request can be assessed under applicable law.',
      ],
    ],
  },
  terms: {
    title: 'Terms of use',
    description:
      'Draft terms for MODIVO’s digital product website, future hosted checkout, product delivery, and support.',
    sections: [
      [
        'About MODIVO',
        'MODIVO is a brand based in Bosnia and Herzegovina preparing one-time purchases of downloadable digital products. It does not sell physical goods. A registered entity name, street address, and tax registration have not been supplied; this draft does not assert any.',
      ],
      [
        'Availability and product information',
        'Concept previews are design explorations and are not offers for sale. Product pages identify availability, included files, formats, software requirements, license terms, and prices when those details are confirmed. No purchase is available for a concept.',
      ],
      [
        'Hosted checkout',
        'The planned checkout provider is Lemon Squeezy, which acts as merchant of record for transactions through its service. It handles payments and transaction-related sales tax, refunds, and chargebacks under its terms. MODIVO is responsible for the product description, files supplied, and product support. Store activation has not been confirmed.',
      ],
      [
        'Delivery and use',
        'Files are intended to be delivered through Lemon Squeezy’s supported download flow after a completed purchase. No MODIVO account is required. Required third-party software, subscriptions, or accounts are separate unless the listing explicitly says otherwise. A return URL or redirect alone does not prove payment.',
      ],
      [
        'Intellectual property and licenses',
        'Buying a digital file does not transfer ownership of the underlying intellectual property. Permitted uses depend on the license supplied with that product and applicable third-party rights. Viewing a concept grants no product license.',
      ],
      [
        'Support and unresolved terms',
        'Product support is by email at modivo2026@gmail.com. No guaranteed response time, lifetime support, or updates are promised. Operator identity, contract formation, applicable law, dispute procedures, and consumer disclosures require owner and qualified legal review before sales. These draft terms do not exclude applicable mandatory rights.',
      ],
    ],
  },
  'refund-policy': {
    title: 'Refund policy',
    description:
      'MODIVO’s draft refund and purchase-support information for future digital downloads. No purchases are currently available.',
    sections: [
      [
        'Current status',
        'No products are currently available to purchase. This is a draft refund framework, not a finalized promise of eligibility, a refund window, or a blanket no-refund rule.',
      ],
      [
        'How to ask for help',
        'For a future purchase problem, email modivo2026@gmail.com with the product name, order reference, and a description of the issue. Please explain if a file is missing, damaged, inaccessible, or materially different from its description. Do not send payment-card details.',
      ],
      [
        'Who handles what',
        'MODIVO investigates product and file issues and provides support. Lemon Squeezy, the planned merchant of record, processes refunds and transaction disputes through its platform. It retains discretion to issue refunds under its own terms.',
      ],
      [
        'Consumer rights',
        'Digital content can be subject to specific consumer rights and rules about immediate delivery. Nothing in this draft limits mandatory rights. Any required consent to immediate supply and acknowledgment about withdrawal rights must be reviewed for the intended markets and supported checkout flow.',
      ],
      [
        'Owner review required before sales',
        'Confirm eligibility criteria, request deadlines, handling of defective or misdescribed files, response expectations, withdrawal disclosures, and the business identity. Publish a reviewed policy before enabling checkout.',
      ],
    ],
  },
  license: {
    title: 'License information',
    description:
      'Understand MODIVO’s product-specific license approach, commercial permissions, third-party content, and redistribution restrictions.',
    sections: [
      [
        'No universal license',
        'Current concept previews have no downloadable product license. Each released product must state its license type and permitted uses on its product page and in the delivered files. No universal commercial, resale, or redistribution rights are granted here.',
      ],
      [
        'Personal and commercial use',
        'Check whether a particular product permits personal projects, business use, or client work, and whether there are limits on users or end products. Those permissions must be explicit in the final product license. If your intended use is unclear, contact MODIVO before buying.',
      ],
      [
        'Redistribution and ownership',
        'Permission to edit or use a template is different from permission to resell, share, sublicense, or distribute its source files. Do not assume those rights are included. The final license must define applicable restrictions and retain the rights of third-party creators.',
      ],
      [
        'Third-party assets and software',
        'Canva content, fonts, code dependencies, service APIs, and n8n software can carry their own terms. A MODIVO purchase cannot override them. Product listings must identify requirements and relevant third-party licenses; paid software or services are not included unless explicitly stated.',
      ],
      [
        'Owner review required',
        'Before releasing any product, provide a reviewed license covering allowed use, restrictions, seat or client scope, ownership, third-party notices, and termination where applicable. The product’s actual license must be supplied with the download.',
      ],
    ],
  },
};
