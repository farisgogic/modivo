import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, categoryFor } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductGallery } from '@/components/product-gallery';
import { ProductCard } from '@/components/product-card';
import { ProductSchema } from '@/components/product-schema';
import { CheckoutAction } from '@/components/checkout-action';
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return pageMetadata(
    p?.title || 'Product not found',
    p?.description || 'Explore MODIVO digital products.',
    `/products/${slug}/`,
  );
}
function SpecList({ items, empty }: { items: string[]; empty: string }) {
  return items.length ? (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ) : (
    <p className="unconfirmed">{empty}</p>
  );
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const category = categoryFor(product.category);
  const related = product.relatedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is typeof product => Boolean(p));
  return (
    <main id="main" className="detail-main wrap">
      <ProductSchema product={product} />
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop/' },
          { label: category.title, href: `/collections/${category.id}/` },
          { label: product.title, href: `/products/${slug}/` },
        ]}
      />
      <div className="detail-grid">
        <ProductGallery product={product} />
        <div className="detail-copy">
          <Link href={`/collections/${category.id}/`} className="section-kicker">
            {category.title.toUpperCase()} ↗
          </Link>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="detail-notice">
            <h2>
              {product.status === 'concept'
                ? 'An idea in the making.'
                : product.status === 'available'
                  ? 'Made for your next idea.'
                  : 'Something good is on its way.'}
            </h2>
            <p>
              {product.status === 'concept'
                ? 'This is a design exploration, not a finished product. Final files, compatibility, licensing, and pricing will be confirmed before release.'
                : product.fullDescription}
            </p>
          </div>
          <CheckoutAction product={product} />
          <div className="product-trust">
            <span>Digital files. No shipping.</span>
            <span>No MODIVO account required.</span>
          </div>
          <div className="detail-quicklinks">
            <Link href="/license/">License information ↗</Link>
            <Link href="/refund-policy/">Refund policy ↗</Link>
          </div>
        </div>
      </div>
      <div className="product-information">
        <aside>
          <span className="section-kicker">THE DETAILS, THOUGHT THROUGH</span>
          <h2>
            A closer
            <br />
            <span className="serif">look.</span>
          </h2>
          <p>{product.fullDescription}</p>
          {(product.version || product.updatedAt) && (
            <p className="version-note">
              {product.version && `Version ${product.version}`}
              {product.updatedAt && (
                <>
                  {' '}
                  · Updated <time dateTime={product.updatedAt}>{product.updatedAt}</time>
                </>
              )}
            </p>
          )}
        </aside>
        <div className="product-specs">
          <section>
            <h3>What’s included</h3>
            <SpecList
              items={product.includedFiles}
              empty="The final file list will be confirmed at launch. No downloadable files are included in this concept preview."
            />
          </section>
          <section>
            <h3>Formats & compatibility</h3>
            {product.fileFormats.length > 0 && (
              <p className="format-tags">{product.fileFormats.join(' / ')}</p>
            )}
            <SpecList
              items={product.compatibility}
              empty="File formats, editing software, account requirements, and any paid third-party subscriptions are not finalized yet."
            />
          </section>
          {product.audience.length > 0 && (
            <section>
              <h3>Made for</h3>
              <SpecList
                items={product.audience}
                empty="The intended uses will be described alongside the finished product."
              />
            </section>
          )}
          {product.features.length > 0 && (
            <section>
              <h3>Thoughtful details</h3>
              <SpecList
                items={product.features}
                empty="This preview explores the design direction. Final features and benefits will be confirmed before purchase is enabled."
              />
            </section>
          )}
          {product.instructions.length > 0 && (
            <section>
              <h3>Getting started</h3>
              <SpecList
                items={product.instructions}
                empty="Step-by-step setup or editing instructions will accompany the final product."
              />
            </section>
          )}
          <section>
            <h3>License & future updates</h3>
            <p>
              {product.licenseSummary ||
                'No usage license is offered with this preview. Personal and commercial permissions will be defined for the finished product.'}
            </p>
            <p>
              {product.updates ||
                'Future updates are not promised; the final listing will state whether any are included.'}
            </p>
            <Link className="text-link" href="/license/">
              Read the license framework ↗
            </Link>
          </section>
          <section>
            <h3>A little help, when you need it</h3>
            <p>
              For product questions or a future download issue, email{' '}
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              . Include the product name, your software version, and the issue. For an order,
              include the order reference—never your card details or passwords.
            </p>
            <Link className="text-link" href="/refund-policy/">
              Refund and purchase support ↗
            </Link>
          </section>
        </div>
      </div>
      <section className="product-faq">
        <div className="section-kicker">BEFORE YOU BEGIN</div>
        <h2>
          A few good <span className="serif">questions.</span>
        </h2>
        <div className="faq-list">
          {(product.faq.length
            ? product.faq
            : [
                {
                  question: 'Can I buy or download this concept?',
                  answer:
                    'Not yet. It is a visual exploration of a future product. There is no checkout or downloadable file for this concept.',
                },
                {
                  question: 'Will I need specific software?',
                  answer:
                    'Requirements have not been finalized. Before launch, the listing will identify supported software, account requirements, and any third-party costs.',
                },
              ]
          ).map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <h2>
              Another <span className="serif">possibility.</span>
            </h2>
            <Link href="/shop/" className="text-link">
              All ideas ↗
            </Link>
          </div>
          <div className="product-grid shop-grid">
            {related.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
