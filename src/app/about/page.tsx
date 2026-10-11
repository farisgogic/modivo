import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BrandMark } from '@/components/brand-mark';
import { categories } from '@/lib/catalog';
export const metadata = pageMetadata(
  'Our thinking',
  'MODIVO is a digital products brand based in Bosnia and Herzegovina, exploring beautifully useful templates and tools for creative living.',
  '/about/',
);
export default function AboutPage() {
  return (
    <main id="main" className="editorial-main wrap">
      <Breadcrumbs items={[{ label: 'About', href: '/about/' }]} />
      <div className="editorial-header">
        <div className="section-kicker">THE MODIVO POINT OF VIEW</div>
        <h1>
          Make room for
          <br />
          <span className="serif">the good stuff.</span>
        </h1>
        <p>Good design earns its place in your day.</p>
      </div>
      <section className="about-manifesto">
        <div className="about-symbol">
          <BrandMark />
          <span>
            THOUGHTFUL BY DESIGN.
            <br />
            USEFUL BY NATURE.
          </span>
        </div>
        <div>
          <h2>
            Less figuring out.
            <br />
            <span className="serif">More getting into it.</span>
          </h2>
          <p>
            A planner should leave you clearer than it found you. A template should feel like a
            starting point, not a set of limits. A useful tool should help an idea become something
            you can actually make.
          </p>
          <p>
            That’s the thinking behind MODIVO. We’re developing digital products that balance visual
            care with practical purpose—small, considered tools for everyday projects and bigger
            plans.
          </p>
          <p>
            Based in Bosnia and Herzegovina, MODIVO is building its first collection. There is no
            finished catalog to buy yet. The concepts here share the direction we’re exploring,
            honestly and in progress.
          </p>
        </div>
      </section>
      <section className="about-principles">
        <div>
          <span>01 / BEAUTIFUL</span>
          <h3>Care you can see.</h3>
          <p>Clear type, useful structure, and details that feel considered from the first page.</p>
        </div>
        <div>
          <span>02 / PRACTICAL</span>
          <h3>A purpose you can feel.</h3>
          <p>Less friction between having an idea and doing something with it.</p>
        </div>
        <div>
          <span>03 / OPEN</span>
          <h3>A place to make it yours.</h3>
          <p>Flexible starting points, with clear instructions and honest expectations.</p>
        </div>
      </section>
      <section className="about-collections">
        <h2>
          Many kinds of <span className="serif">useful.</span>
        </h2>
        <nav className="collection-links" aria-label="Browse collections">
          {categories.map((c) => (
            <Link href={`/collections/${c.id}/`} key={c.id}>
              {c.title} ↗
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
