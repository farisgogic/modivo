import type { Metadata } from 'next';
import { absoluteUrl, site } from './site';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absoluteUrl(path);
  const images = site.url
    ? [
        {
          url: absoluteUrl('/social-preview.png')!,
          width: 1200,
          height: 630,
          alt: 'MODIVO — Beautifully useful digital products',
        },
      ]
    : [];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — MODIVO`,
      description,
      type: 'website',
      url,
      siteName: site.name,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — MODIVO`,
      description,
      images: images.map((image) => image.url),
    },
  };
}
