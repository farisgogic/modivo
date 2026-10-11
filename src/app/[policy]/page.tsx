import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { policies } from '@/lib/policies';
import { Breadcrumbs } from '@/components/breadcrumbs';
export const dynamicParams = false;
export function generateStaticParams() {
  return [...Object.keys(policies), 'refunds'].map((policy) => ({ policy }));
}
export async function generateMetadata({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = await params;
  const key = policy === 'refunds' ? 'refund-policy' : policy;
  const content = policies[key];
  return pageMetadata(
    content?.title || 'Information',
    content?.description || 'MODIVO information.',
    `/${key}/`,
  );
}
export default async function PolicyPage({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = await params;
  const key = policy === 'refunds' ? 'refund-policy' : policy;
  const content = policies[key];
  if (!content) notFound();
  return (
    <main id="main" className="legal-main wrap">
      <Breadcrumbs items={[{ label: content.title, href: `/${key}/` }]} />
      <div className="section-kicker">CLEAR EXPECTATIONS</div>
      <h1>{content.title}</h1>
      <p className="legal-notice">
        Draft for review. This information is not yet a finalized legal policy. Unresolved operator,
        business, and consumer-law details must be reviewed before public launch or sales.
      </p>
      {policy === 'refunds' && (
        <p>
          This information is also available at <Link href="/refund-policy/">Refund policy</Link>.
        </p>
      )}
      {content.sections.map(([heading, text]) => (
        <section key={heading}>
          <h2>{heading}</h2>
          <p>{text}</p>
        </section>
      ))}
      <section>
        <h2>Questions?</h2>
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
      <nav className="legal-links" aria-label="Related policies">
        {Object.entries(policies)
          .filter(([slug]) => slug !== key)
          .map(([slug, item]) => (
            <Link key={slug} href={`/${slug}/`}>
              {item.title} ↗
            </Link>
          ))}
      </nav>
      {['privacy', 'terms', 'refund-policy'].includes(key) && (
        <p className="policy-source">
          Provider information:{' '}
          <a href="https://docs.lemonsqueezy.com/help/payments/merchant-of-record">
            Lemon Squeezy’s merchant-of-record role
          </a>{' '}
          and{' '}
          <a href="https://docs.lemonsqueezy.com/help/payments/refunds-chargebacks">
            refund handling
          </a>
          . For data handled by hosting, see{' '}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
            GitHub’s privacy statement
          </a>
          .
        </p>
      )}
    </main>
  );
}
