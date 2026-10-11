'use client';
import { useState } from 'react';
import Link from 'next/link';
import { categories, type Product } from '@/lib/catalog';
import { discoverProducts, type SortOrder } from '@/lib/discovery';
import { ProductCard } from './product-card';
export function ShopCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortOrder>('featured');
  const found = discoverProducts(products, { query, category, sort });
  const priceSupported =
    new Set(products.flatMap((p) => (p.price ? [p.price.currency] : []))).size === 1;
  return (
    <div className="shop-discovery">
      <div className="shop-toolbar">
        <label className="search-control">
          <span>Find your next good thing</span>
          <input
            type="search"
            placeholder="Search templates, planners, ideas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="sort-control">
          <span>Arrange by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOrder)}>
            <option value="featured">Featured first</option>
            <option value="name">Name, A–Z</option>
            <option value="newest" disabled={!products.some((p) => p.publishedAt)}>
              Newest {products.some((p) => p.publishedAt) ? '' : '(at launch)'}
            </option>
            <option value="price-low" disabled={!priceSupported}>
              Price, low to high {priceSupported ? '' : '(unavailable)'}
            </option>
            <option value="price-high" disabled={!priceSupported}>
              Price, high to low {priceSupported ? '' : '(unavailable)'}
            </option>
          </select>
        </label>
      </div>
      <fieldset className="filter-chips">
        <legend className="sr-only">Filter by collection</legend>
        {[{ id: 'all', title: 'All ideas' }, ...categories].map((c) => (
          <label key={c.id}>
            <input
              type="radio"
              name="collection"
              value={c.id}
              checked={category === c.id}
              onChange={() => setCategory(c.id)}
            />
            <span>{c.title}</span>
          </label>
        ))}
      </fieldset>
      <div className="catalog-result-bar">
        <p role="status" aria-live="polite">
          {found.length} {found.length === 1 ? 'idea' : 'ideas'} to explore
          {query ? ` for “${query}”` : ''}
        </p>
        {category !== 'all' && (
          <Link href={`/collections/${category}/`}>Inside this collection ↗</Link>
        )}
        <span>Digital by nature. Yours to make.</span>
      </div>
      {found.length ? (
        <>
          <h2 className="sr-only">Products and concept previews</h2>
          <div className="product-grid shop-grid">
            {found.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="catalog-empty">
          <span aria-hidden="true">↗</span>
          <h2>
            A little space for
            <br />
            <em>what’s next.</em>
          </h2>
          <p>
            {query
              ? 'No ideas match that search. Try a different word or collection.'
              : 'This collection is taking shape. Explore the other ideas while we work on it.'}
          </p>
          <button
            className="button button-dark"
            onClick={() => {
              setQuery('');
              setCategory('all');
              setSort('featured');
            }}
          >
            Explore all ideas ↗
          </button>
        </div>
      )}
      <noscript>
        <p className="store-notice">
          Search and sorting need JavaScript. All concepts remain listed; use the collection links
          to browse individual categories.
        </p>
      </noscript>
    </div>
  );
}
