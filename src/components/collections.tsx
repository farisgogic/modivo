import Link from 'next/link';
import { categories } from '@/lib/catalog';
import { Arrow } from './arrow';
export function Collections() {
  return (
    <div className="collection-index">
      {categories.map((category, index) => (
        <details key={category.id} className="collection-row" name="collections" open={index === 0}>
          <summary>
            <span className="collection-number">0{index + 1}</span>
            <span className={`collection-mark ${category.color}`} aria-hidden="true">
              {category.mark}
            </span>
            <span className="collection-title">{category.title}</span>
            <span className="collection-toggle" aria-hidden="true" />
          </summary>
          <div className="collection-description">
            <p>{category.description}</p>
            <Link href={`/collections/${category.id}/`}>
              Explore this collection <Arrow />
            </Link>
          </div>
        </details>
      ))}
    </div>
  );
}
