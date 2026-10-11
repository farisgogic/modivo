'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/catalog';
import { assetPath } from '@/lib/site';
import { ProductArt } from './product-art';
export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const image = product.images[index];
  return (
    <div className="product-gallery">
      <div className={`product-scene detail-scene scene-${product.visual}`}>
        {product.status === 'concept' && (
          <span className="concept-tag">CONCEPT PREVIEW / {product.id}</span>
        )}
        {image ? (
          <Image
            key={image.src}
            className="gallery-image"
            src={assetPath(image.src)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 760px) 90vw, 46vw"
            priority={index === 0}
          />
        ) : (
          <ProductArt kind={product.visual} />
        )}
      </div>
      {product.images.length > 1 && (
        <div className="gallery-thumbnails" role="group" aria-label="Product images">
          {product.images.map((image, i) => (
            <button
              key={image.src}
              aria-label={`Show image ${i + 1}: ${image.alt}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <Image
                src={assetPath(image.src)}
                width={image.width}
                height={image.height}
                alt=""
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
      <p className="gallery-caption">
        {product.status === 'concept'
          ? 'An original design exploration. Final contents and formats are still to come.'
          : 'Digital product preview. No physical item is shipped.'}
      </p>
      <noscript>
        {product.images.slice(1).map((image) => (
          <Image
            key={image.src}
            src={assetPath(image.src)}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="90vw"
          />
        ))}
      </noscript>
    </div>
  );
}
