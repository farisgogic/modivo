import Link from 'next/link';
import { OptionalAnalytics } from './optional-analytics';
import { analyticsEnabled, site } from '@/lib/site';
import { Arrow } from './arrow';
import { BrandMark } from './brand-mark';
export function Contact() {
  return (
    <section id="contact" className="contact-section wrap">
      <div className="section-kicker">
        <span className="status-dot" /> GOOD THINGS TAKE THOUGHT
      </div>
      <div className="contact-layout">
        <h2>
          Something good
          <br />
          is <span className="serif">taking shape.</span>
        </h2>
        <div className="contact-copy">
          <p>
            We’re putting the finishing thoughts into our first collection. Have an idea, a
            question, or just a good feeling?
          </p>
          {site.email ? (
            <a className="button button-dark" href={`mailto:${site.email}`}>
              Let’s talk <Arrow diagonal />
            </a>
          ) : (
            <p className="contact-pending">Our contact details are coming soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer footer-editorial wrap">
      <div className="footer-directory">
        <div className="footer-invitation">
          <p className="footer-eyebrow">
            <BrandMark /> A LITTLE MORE POSSIBILITY
          </p>
          <h2>
            Good things.
            <br />
            <span className="serif">Start here.</span>
          </h2>
          <a className="footer-email" href={`mailto:${site.email}`}>
            {site.email}
            <Arrow diagonal />
          </a>
        </div>
        <nav className="footer-column" aria-label="Explore MODIVO">
          <h3>Explore</h3>
          <Link href="/shop/">Shop</Link>
          <Link href="/#collections">Collections</Link>
          <Link href="/about/">Our thinking</Link>
          <Link href="/contact/">
            Say hello <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <nav className="footer-column" aria-label="Help and policies">
          <h3>Good to know</h3>
          <Link href="/faq/">FAQ</Link>
          <Link href="/license/">Licensing</Link>
          <Link href="/refund-policy/">Refund policy</Link>
          <Link href="/contact/">Product support</Link>
        </nav>
      </div>
      {analyticsEnabled && (
        <OptionalAnalytics token={process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN!} />
      )}
      <div className="footer-brand-row">
        <Link className="footer-brand-name" href="/" aria-label="MODIVO home">
          modivo<span aria-hidden="true">·</span>
        </Link>
        <a className="footer-return" href="#top" aria-label="Back to top">
          <span className="footer-return-icon">
            <Arrow diagonal />
          </span>
          <span aria-hidden="true">Back to top</span>
        </a>
      </div>
      <div className="footer-colophon">
        <span>© {new Date().getFullYear()} MODIVO</span>
        <p>
          Thoughtfully digital. <span>Based in Bosnia and Herzegovina.</span>
        </p>
        <nav aria-label="Legal">
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
