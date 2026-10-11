import type { Product } from './catalog';
export type SortOrder = 'featured' | 'name' | 'newest' | 'price-low' | 'price-high';
export function discoverProducts(
  catalog: Product[],
  {
    query = '',
    category = 'all',
    sort = 'featured',
  }: { query?: string; category?: string; sort?: SortOrder },
): Product[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return catalog
    .filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        terms.every((term) =>
          `${p.title} ${p.description} ${p.fullDescription} ${p.tags.join(' ')}`
            .toLocaleLowerCase()
            .includes(term),
        ),
    )
    .sort((a, b) => {
      if (sort === 'name') return a.title.localeCompare(b.title);
      if (sort === 'newest')
        return (
          (b.publishedAt || '').localeCompare(a.publishedAt || '') || a.title.localeCompare(b.title)
        );
      if (sort === 'price-low' || sort === 'price-high') {
        if (!a.price || !b.price)
          return a.price ? -1 : b.price ? 1 : a.title.localeCompare(b.title);
        return (
          a.price.currency.localeCompare(b.price.currency) ||
          (sort === 'price-low' ? a.price.amount - b.price.amount : b.price.amount - a.price.amount)
        );
      }
      return Number(b.featured) - Number(a.featured) || a.id.localeCompare(b.id);
    });
}
