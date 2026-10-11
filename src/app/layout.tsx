import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
const manrope = localFont({
  src: '../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
});
import './globals.css';
import './refinement.css';
import './storefront.css';
import './footer.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { absoluteUrl, assetPath, launchReady, site } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: { default: 'MODIVO — Beautifully useful.', template: '%s — MODIVO' },
  description: site.description,
  robots: { index: launchReady, follow: launchReady },
  openGraph: {
    title: 'MODIVO — Beautifully useful.',
    description: site.description,
    type: 'website',
    siteName: 'MODIVO',
    images: site.url
      ? [
          {
            url: absoluteUrl('/social-preview.png')!,
            width: 1200,
            height: 630,
            alt: 'MODIVO. Beautifully useful digital products.',
          },
        ]
      : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MODIVO — Beautifully useful.',
    description: site.description,
    images: site.url ? [absoluteUrl('/social-preview.png')!] : [],
  },
  icons: { icon: assetPath('/icon.svg') },
  alternates: { canonical: absoluteUrl('/') },
};
export const viewport: Viewport = { themeColor: '#f5f4ee' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <noscript>
          <style>{`.menu-toggle,.object-controls,.shop-toolbar,.filter-chips,.gallery-thumbnails{display:none}.main-nav{display:flex;position:static;flex-wrap:wrap;gap:12px;padding:0;box-shadow:none;border:0}.site-header{height:auto;min-height:100px;flex-wrap:wrap;padding-block:20px}.main-nav>a{font-size:12px;padding:8px}.main-nav>.nav-contact{margin:0;padding:8px}`}</style>
        </noscript>
        {children}
        <Footer />
      </body>
    </html>
  );
}
