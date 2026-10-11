import Link from 'next/link';
import Image from 'next/image';
import { categoryFor, checkoutFor, formatPrice, type Product } from '@/lib/catalog';
import { assetPath } from '@/lib/site';
import { Arrow } from './arrow';
import { ProductArt } from './product-art';
export function ProductCard({ product }: { product: Product }) {
  const available = Boolean(checkoutFor(product));
  return (
    <Link href={`/products/${product.slug}/`} className="product-card">
      <div className={`product-scene scene-${product.visual}`}>
        {!available && (
          <span className="concept-tag">
            {product.status === 'concept' ? 'CONCEPT PREVIEW' : 'COMING SOON'}
          </span>
        )}
        {product.images.length ? (
          <Image
            src={assetPath(product.images[0].src)}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 760px) 90vw, 30vw"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <ProductArt kind={product.visual} />
        )}
        <span className="scene-edition" aria-hidden="true">
          EDITION / {product.id}
        </span>
        <span className="product-open">
          <Arrow diagonal />
        </span>
      </div>
      <div className="product-meta">
        <span>{categoryFor(product.category).title}</span>
        <span>
          {available && product.price
            ? `${formatPrice(product.price)} ${product.price.currency}`
            : 'COMING SOON'}
        </span>
      </div>
      <h3>{product.title}</h3>
      <p>{product.description.split('. ')[0]}.</p>
    </Link>
  );
}
