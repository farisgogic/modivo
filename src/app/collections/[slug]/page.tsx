import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, products } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductCard } from '@/components/product-card';
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categories.find((c) => c.id === slug);
  return pageMetadata(
    c?.title || 'Collection',
    c?.description || 'Explore MODIVO collections.',
    `/collections/${slug}/`,
  );
}
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  if (!category) notFound();
  const found = products.filter((p) => p.category === category.id);
  return (
    <main id="main" className="store-main wrap">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop/' },
          { label: category.title, href: `/collections/${slug}/` },
        ]}
      />
      <div className={`collection-hero ${category.color}`}>
        <div>
          <div className="section-kicker">THE COLLECTION / {category.title.toUpperCase()}</div>
          <h1>{category.short}</h1>
          <p>{category.description}</p>
        </div>
        <span aria-hidden="true" className="collection-hero-mark">
          {category.mark}
        </span>
      </div>
      <div className="catalog-result-bar">
        <p>
          {found.length} {found.length === 1 ? 'concept' : 'concepts'} in the making
        </p>
        <Link href="/shop/">Explore all collections ↗</Link>
      </div>
      {found.length ? (
        <>
          <h2 className="sr-only">Products in this collection</h2>
          <div className="product-grid shop-grid">
            {found.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="catalog-empty">
          <h2>
            Good ideas
            <br />
            <span className="serif">take thought.</span>
          </h2>
          <p>
            Nothing to preview here just yet. We’re shaping this collection and will share more when
            it’s ready.
          </p>
          <Link href="/shop/" className="button button-dark">
            See what’s taking shape ↗
          </Link>
        </div>
      )}
      <nav aria-label="Other collections" className="collection-links">
        {categories
          .filter((c) => c.id !== slug)
          .map((c) => (
            <Link key={c.id} href={`/collections/${c.id}/`}>
              {c.title} ↗
            </Link>
          ))}
      </nav>
    </main>
  );
}
