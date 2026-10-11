import { categories, validCheckoutUrl, type Product } from './catalog';
export function validateCatalog(
  catalog: Product[],
  imageExists: (path: string) => boolean = () => true,
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const product of catalog) {
    const fail = (message: string) => errors.push(`${product.slug || product.id}: ${message}`);
    if (!product.id || ids.has(product.id)) fail('duplicate or missing ID');
    ids.add(product.id);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) || slugs.has(product.slug))
      fail('invalid or duplicate slug');
    slugs.add(product.slug);
    if (!categories.some((c) => c.id === product.category)) fail('unknown category');
    if (!product.title.trim() || !product.description.trim() || !product.fullDescription.trim())
      fail('missing copy');
    if (!['concept', 'coming-soon', 'available'].includes(product.status))
      fail('unknown availability');
    if (product.price) {
      if (!Number.isSafeInteger(product.price.amount) || product.price.amount <= 0)
        fail('price must be positive integer minor units');
      if (!Intl.supportedValuesOf('currency').includes(product.price.currency))
        fail('currency must be a supported ISO currency');
    }
    if (product.checkoutUrl && !validCheckoutUrl(product.checkoutUrl))
      fail('use the stable HTTPS Lemon Squeezy /checkout/buy/ URL, without queries');
    if (product.checkoutMode === 'test')
      fail('test checkout configuration is prohibited in the public catalog');
    for (const image of product.images) {
      if (
        !image.src.startsWith('/') ||
        image.src.startsWith('//') ||
        image.src.includes('..') ||
        /[?#]/.test(image.src) ||
        !/\.(avif|webp|png|jpe?g|svg|gif)$/i.test(image.src) ||
        !imageExists(image.src)
      )
        fail(`missing or invalid local image: ${image.src}`);
      if (
        !image.alt.trim() ||
        !Number.isSafeInteger(image.width) ||
        !Number.isSafeInteger(image.height) ||
        image.width <= 0 ||
        image.height <= 0
      )
        fail('image needs alt text and positive dimensions');
    }
    for (const date of [product.updatedAt, product.publishedAt])
      if (
        date &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
          Number.isNaN(Date.parse(date)) ||
          new Date(date).toISOString().slice(0, 10) !== date)
      )
        fail('invalid ISO date');
    for (const slug of product.relatedProducts)
      if (slug === product.slug || !catalog.some((p) => p.slug === slug))
        fail(`invalid related product: ${slug}`);
    if (product.status === 'available') {
      if (
        !product.price ||
        !validCheckoutUrl(product.checkoutUrl) ||
        product.checkoutMode !== 'live' ||
        !product.checkoutVerified
      )
        fail('available products require a verified live checkout and price');
      for (const key of [
        'images',
        'fileFormats',
        'includedFiles',
        'compatibility',
        'instructions',
        'audience',
        'features',
        'faq',
      ] as const)
        if (!product[key].length) fail(`available product missing ${key}`);
      for (const key of [
        'licenseType',
        'licenseSummary',
        'updates',
        'version',
        'updatedAt',
        'publishedAt',
      ] as const)
        if (!product[key]) fail(`available product missing ${key}`);
    }
  }
  return errors;
}
