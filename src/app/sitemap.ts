import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/lib/site';
import { categories, products } from '@/lib/catalog';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    '/',
    '/shop/',
    '/about/',
    '/contact/',
    '/faq/',
    '/license/',
    '/privacy/',
    '/terms/',
    '/refund-policy/',
    ...categories.map((c) => `/collections/${c.id}/`),
    ...products.map((p) => `/products/${p.slug}/`),
  ].map((path) => ({ url: absoluteUrl(path)! }));
}
