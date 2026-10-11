import type { MetadataRoute } from 'next';
import { absoluteUrl, launchReady } from '@/lib/site';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', ...(launchReady ? { allow: '/' } : { disallow: '/' }) },
    sitemap: launchReady ? absoluteUrl('/sitemap.xml') : undefined,
  };
}
