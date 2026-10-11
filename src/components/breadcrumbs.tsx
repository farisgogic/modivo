import Link from 'next/link';
import { absoluteUrl, site } from '@/lib/site';
export type Crumb = { label: string; href: string };
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href}>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {site.url && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [{ label: 'Home', href: '/' }, ...items].map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                item: absoluteUrl(item.href),
              })),
            }).replace(/</g, '\\u003c'),
          }}
        />
      )}
    </>
  );
}
