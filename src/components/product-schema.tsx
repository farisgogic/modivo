import { checkoutFor, type Product } from '@/lib/catalog';
import { absoluteUrl, site } from '@/lib/site';
/** Only genuine, configured live listings produce Product/Offer structured data. */
export function ProductSchema({ product }: { product: Product }) {
  if (!site.url || !checkoutFor(product) || !product.price) return null;
  const digits =
    new Intl.NumberFormat('en', {
      style: 'currency',
      currency: product.price.currency,
    }).resolvedOptions().maximumFractionDigits ?? 2;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    category: product.category,
    image: product.images.map((image) => absoluteUrl(image.src)),
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.slug}/`),
      price: (product.price.amount / 10 ** digits).toFixed(digits),
      priceCurrency: product.price.currency,
      availability: 'https://schema.org/InStock',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
