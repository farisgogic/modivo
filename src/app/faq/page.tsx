import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { faqs } from '@/lib/faq';
import { Breadcrumbs } from '@/components/breadcrumbs';
export const metadata = pageMetadata(
  'Frequently asked questions',
  'Answers about MODIVO digital downloads, software requirements, licenses, future checkout, refunds, and support.',
  '/faq/',
);
export default function FaqPage() {
  return (
    <main id="main" className="editorial-main wrap">
      <Breadcrumbs items={[{ label: 'FAQ', href: '/faq/' }]} />
      <div className="editorial-header">
        <div className="section-kicker">A LITTLE CLARITY</div>
        <h1>
          Good questions.
          <br />
          <span className="serif">Clear answers.</span>
        </h1>
        <p>Before you make something yours, here’s what to know.</p>
      </div>
      <div className="faq-layout">
        <aside>
          <p>Looking for something specific?</p>
          <Link href="/contact/" className="text-link">
            We’re here to help ↗
          </Link>
          <Link href="/license/">Licenses ↗</Link>
          <Link href="/refund-policy/">Refund information ↗</Link>
        </aside>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
