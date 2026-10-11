import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { categories, products } from '@/lib/catalog';
import { ShopCatalog } from '@/components/shop-catalog';
import { Breadcrumbs } from '@/components/breadcrumbs';
export const metadata = pageMetadata(
  'The shop',
  'Explore MODIVO’s digital product concepts: creative templates, planners, event resources, and thoughtful tools. Our first collection is coming soon.',
  '/shop/',
);
export default function ShopPage() {
  return (
    <main id="main" className="store-main wrap">
      <Breadcrumbs items={[{ label: 'Shop', href: '/shop/' }]} />
      <div className="store-intro">
        <div>
          <div className="section-kicker">THE MODIVO COLLECTION</div>
          <h1>
            Good things.
            <br />
            <span className="serif">For your next thing.</span>
          </h1>
        </div>
        <p>
          Considered tools for creative living.
          <br />
          Find a little clarity, a fresh perspective,
          <br />
          or a place to begin.
        </p>
      </div>
      <div className="store-notice">
        <span className="status-dot" />
        <p>
          Our first collection is in development. These are concept previews, with no purchases
          available yet.
        </p>
      </div>
      <ShopCatalog products={products} />
      <nav className="collection-links" aria-label="Browse all collections">
        {categories.map((category) => (
          <Link key={category.id} href={`/collections/${category.id}/`}>
            {category.title} ↗
          </Link>
        ))}
      </nav>
    </main>
  );
}
