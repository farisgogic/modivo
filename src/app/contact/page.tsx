import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Breadcrumbs } from '@/components/breadcrumbs';
export const metadata = pageMetadata(
  'Contact MODIVO',
  'Contact MODIVO at modivo2026@gmail.com for digital product questions, licensing information, and future purchase support. Based in Bosnia and Herzegovina.',
  '/contact/',
);
export default function ContactPage() {
  return (
    <main id="main" className="editorial-main wrap">
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact/' }]} />
      <div className="editorial-header">
        <div className="section-kicker">LET’S TALK</div>
        <h1>
          A question.
          <br />
          An idea.
          <br />
          <span className="serif">A simple hello.</span>
        </h1>
      </div>
      <div className="contact-page-grid">
        <div>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
            <span aria-hidden="true">↗</span>
          </a>
          <p>Bosnia and Herzegovina</p>
          <p>Our first digital product collection is in development.</p>
        </div>
        <div>
          <h2>A little context helps.</h2>
          <p>
            For product questions, include the product name and what you’d like to know. For a
            future purchase issue, include the order reference and your software version.
          </p>
          <p>
            Please don’t send card details, passwords, or API keys. Email is our support channel; a
            guaranteed response time has not been established.
          </p>
          <Link className="text-link" href="/faq/">
            You might find your answer here ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
