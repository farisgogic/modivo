export const categories = [
  {
    id: 'creative',
    title: 'Creative templates',
    short: 'Make an impression.',
    description:
      'Considered starting points for your next big idea. Presentations, social templates, and creative resources.',
    mark: 'Aa',
    color: 'lilac',
  },
  {
    id: 'planning',
    title: 'Planners & organizers',
    short: 'A little room to think.',
    description:
      'Digital planners and gentle systems to bring a little more clarity to everyday life.',
    mark: '▦',
    color: 'citrus',
  },
  {
    id: 'events',
    title: 'Events & celebrations',
    short: 'For the moments that matter.',
    description: 'Invitations, stationery, and planning kits for gathering your favorite people.',
    mark: '✳',
    color: 'peach',
  },
  {
    id: 'productivity',
    title: 'Productivity tools',
    short: 'Less busy. More purpose.',
    description: 'Notion and spreadsheet templates that make space for the work you care about.',
    mark: '↗',
    color: 'blue',
  },
  {
    id: 'automation',
    title: 'AI & automation',
    short: 'Find your flow.',
    description:
      'Thoughtful AI and no-code workflow templates for the repetitive parts of your day.',
    mark: '↔',
    color: 'pink',
  },
  {
    id: 'development',
    title: 'Developer resources',
    short: 'A better place to start.',
    description: 'Starter kits and software templates that give useful ideas a head start.',
    mark: '</>',
    color: 'sage',
  },
] as const;
export type Category = (typeof categories)[number]['id'];
export type Product = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  description: string;
  fullDescription: string;
  tags: string[];
  images: { src: string; alt: string; width: number; height: number }[];
  price: { amount: number; currency: string } | null;
  status: 'concept' | 'coming-soon' | 'available';
  checkoutUrl: string | null;
  checkoutMode: 'unconfigured' | 'test' | 'live';
  checkoutVerified: boolean;
  featured: boolean;
  visual: 'planner' | 'stationery' | 'creative';
  fileFormats: string[];
  includedFiles: string[];
  compatibility: string[];
  instructions: string[];
  audience: string[];
  features: string[];
  licenseType: string | null;
  licenseSummary: string | null;
  updates: string | null;
  version: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  faq: { question: string; answer: string }[];
  relatedProducts: string[];
};
const conceptDefaults = {
  images: [],
  price: null,
  status: 'concept',
  checkoutUrl: null,
  checkoutMode: 'unconfigured',
  checkoutVerified: false,
  fileFormats: [],
  includedFiles: [],
  compatibility: [],
  instructions: [],
  audience: [],
  features: [],
  licenseType: null,
  licenseSummary: null,
  updates: null,
  version: null,
  updatedAt: null,
  publishedAt: null,
  faq: [],
} as const;
export const products: Product[] = [
  {
    ...conceptDefaults,
    fileFormats: [],
    includedFiles: [],
    compatibility: [],
    instructions: [],
    audience: [],
    features: [],
    faq: [],
    id: '01',
    slug: 'a-little-more-space',
    title: 'A little more space',
    category: 'planning',
    description:
      'A quieter approach to planning. An exploration of undated pages, small intentions, and making room for what matters.',
    images: [],
    price: null,
    status: 'concept',
    checkoutUrl: null,
    featured: true,
    visual: 'planner',
    fullDescription:
      'A design study in making space: quieter pages, a considered rhythm, and a place to put your thoughts. This preview explores the visual direction for a future planner; it does not show a finished downloadable product.',
    tags: ['planner', 'organization', 'everyday'],
    relatedProducts: ['the-art-of-gathering', 'a-fresh-perspective'],
  },
  {
    ...conceptDefaults,
    fileFormats: [],
    includedFiles: [],
    compatibility: [],
    instructions: [],
    audience: [],
    features: [],
    faq: [],
    id: '02',
    slug: 'the-art-of-gathering',
    title: 'The art of gathering',
    category: 'events',
    description:
      'Good things start with an invitation. A stationery concept for celebrations with a little character and a lot of heart.',
    images: [],
    price: null,
    status: 'concept',
    checkoutUrl: null,
    featured: true,
    visual: 'stationery',
    fullDescription:
      'An exploration of warm typography and meaningful details for gathering people together. The invitation shown is original concept artwork. Editable formats, event planning contents, and software requirements have not yet been decided.',
    tags: ['invitation', 'wedding', 'events', 'stationery'],
    relatedProducts: ['a-little-more-space', 'a-fresh-perspective'],
  },
  {
    ...conceptDefaults,
    fileFormats: [],
    includedFiles: [],
    compatibility: [],
    instructions: [],
    audience: [],
    features: [],
    faq: [],
    id: '03',
    slug: 'a-fresh-perspective',
    title: 'A fresh perspective',
    category: 'creative',
    description:
      'A flexible visual language for your next idea. An exploration of expressive layouts, confident type, and thoughtful details.',
    images: [],
    price: null,
    status: 'concept',
    checkoutUrl: null,
    featured: true,
    visual: 'creative',
    fullDescription:
      'A visual study for creative starting points: confident typography, adaptable compositions, and room for your own perspective. Final templates, formats, licensing, and editing requirements will be confirmed before release.',
    tags: ['design', 'creative', 'templates'],
    relatedProducts: ['a-little-more-space', 'the-art-of-gathering'],
  },
];
export const categoryFor = (id: Category) => categories.find((category) => category.id === id)!;
export function validCheckoutUrl(value: string | null): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      /^[a-z0-9-]+\.lemonsqueezy\.com$/.test(url.hostname) &&
      /^\/checkout\/buy\/[a-f0-9-]{36}$/.test(url.pathname) &&
      !url.username &&
      !url.password &&
      !url.port &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}
export function checkoutFor(
  product: Product,
  salesEnabled = process.env.NEXT_PUBLIC_SALES_ENABLED === 'true' &&
    process.env.NEXT_PUBLIC_LEGAL_APPROVED === 'true' &&
    Boolean(process.env.NEXT_PUBLIC_SITE_URL),
): string | null {
  return salesEnabled &&
    product.status === 'available' &&
    product.checkoutMode === 'live' &&
    product.checkoutVerified &&
    validCheckoutUrl(product.checkoutUrl) &&
    product.price &&
    Number.isSafeInteger(product.price.amount) &&
    product.price.amount > 0
    ? product.checkoutUrl
    : null;
}
export function formatPrice(price: NonNullable<Product['price']>): string {
  const formatter = new Intl.NumberFormat('en', { style: 'currency', currency: price.currency });
  return formatter.format(
    price.amount / 10 ** (formatter.resolvedOptions().maximumFractionDigits ?? 2),
  );
}
export function productLabel(product: Product): string {
  return checkoutFor(product)
    ? 'Available · digital download'
    : product.status === 'concept'
      ? 'Concept preview · coming soon'
      : 'Coming soon';
}
