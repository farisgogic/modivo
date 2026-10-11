import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { HeroObject } from '@/components/hero-object';
import { Arrow } from '@/components/arrow';
import { ProductCard } from '@/components/product-card';
import { Collections } from '@/components/collections';
import { Contact } from '@/components/footer';
import { products } from '@/lib/catalog';
export default function Home() {
  return (
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="section-kicker">
            <span className="status-dot" /> DIGITAL GOODS. HUMAN POSSIBILITIES.
          </div>
          <h1 id="hero-title">
            <span>Beautifully</span>
            <br />
            <span className="serif">useful.</span>
            <BrandMark className="headline-spark" />
          </h1>
          <p>
            Thoughtful digital products for the things you make,
            <br className="desktop-break" /> the plans you have, and the life in between.
          </p>
          <Link href="/shop/" className="button button-dark">
            Explore the collection <Arrow diagonal />
          </Link>
          <div className="hero-small">
            <span className="tiny-stack" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>
              A world of possibilities.
              <br />
              <strong>Our first collection is taking shape.</strong>
            </span>
          </div>
        </div>
        <HeroObject />
        <div className="hero-baseline">
          <span>DESIGNED WITH INTENTION. MADE FOR REAL LIFE.</span>
          <a href="#collections">
            A LITTLE SCROLL, A LOT TO DISCOVER <span>↓</span>
          </a>
        </div>
      </section>
      <div className="statement-strip" aria-label="For the makers, planners, dreamers, and doers">
        <span>For the makers.</span>
        <b aria-hidden="true">✳</b>
        <span>The planners.</span>
        <b aria-hidden="true">✳</b>
        <span>The dreamers.</span>
        <b aria-hidden="true">✳</b>
        <span>And the doers.</span>
        <b aria-hidden="true">✳</b>
      </div>
      <section id="collections" className="collections-section wrap section-space">
        <div className="section-kicker">
          <span>01 / THE POSSIBILITIES</span>
          <span>A LITTLE SOMETHING FOR YOUR NEXT THING</span>
        </div>
        <div className="collections-layout">
          <div className="section-intro">
            <h2>
              Many ways
              <br />
              to make
              <br />
              <span className="serif">it yours.</span>
            </h2>
            <p>
              Big plans. Small rituals. Wild ideas.
              <br />
              Useful things for wherever you’re headed.
            </p>
            <div className="collection-note">
              <span>ONE BRAND. MANY POSSIBILITIES.</span>
              <p>
                From a fresh page to a fresh start.
                <br />
                Choose your kind of useful.
              </p>
              <Arrow diagonal />
            </div>
          </div>
          <Collections />
        </div>
      </section>
      <section id="explore" className="featured-section section-space">
        <div className="wrap">
          <div className="section-kicker">
            <span>02 / ON THE DRAWING BOARD</span>
            <span className="status-label">
              <span className="status-dot" /> IN THE MAKING
            </span>
          </div>
          <div className="section-heading">
            <h2>
              A glimpse of
              <br />
              <span className="serif">what’s next.</span>
            </h2>
            <p>
              Thoughtful from the first sketch.
              <br />
              Meet a few ideas we’re exploring.
              <br />
              <Link className="text-link" href="/shop/">
                Explore all ideas ↗
              </Link>
            </p>
          </div>
          <div className="product-grid">
            {products
              .filter((product) => product.featured)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          <div className="concept-disclaimer">
            <span>THESE ARE IDEAS, NOT ITEMS FOR SALE. YET.</span>
            <p>
              Concept previews offer a look at our direction.
              <br />
              Final products, formats, and pricing will come with launch.
            </p>
          </div>
        </div>
      </section>
      <section className="how-section wrap section-space">
        <div className="section-kicker">
          <span>03 / LESS BETWEEN YOU AND YOUR IDEAS</span>
          <span>THE PLAN FOR LAUNCH</span>
        </div>
        <div className="how-heading">
          <h2>
            Find it. Make it <span className="serif">yours.</span>
          </h2>
          <p>
            Digital by nature. Simple by design.
            <br />
            Here’s how it will work when we launch.
          </p>
        </div>
        <div className="steps">
          <div>
            <span className="step-number">
              01<span>↗</span>
            </span>
            <h3>Find your good thing.</h3>
            <p>Explore the collection and find the right starting point for your next idea.</p>
          </div>
          <div>
            <span className="step-number">
              02<span>↗</span>
            </span>
            <h3>Make it official.</h3>
            <p>
              One-time purchases through Lemon Squeezy’s secure checkout. Clear details before you
              buy.
            </p>
          </div>
          <div>
            <span className="step-number">
              03<span>↗</span>
            </span>
            <h3>Let the making begin.</h3>
            <p>Download your files through Lemon Squeezy, open them up, and make them your own.</p>
          </div>
        </div>
      </section>
      <section id="about" className="philosophy-section">
        <div className="wrap philosophy-layout">
          <div className="philosophy-side">
            <div className="section-kicker">04 / A THOUGHT WE COME BACK TO</div>
            <BrandMark className="philosophy-flower" />
            <span>THE MODIVO POINT OF VIEW</span>
          </div>
          <div>
            <h2>
              Less friction.
              <br />
              <span className="serif">More possibility.</span>
            </h2>
            <div className="philosophy-principles">
              <span>01 / THOUGHTFUL BY DESIGN</span>
              <span>02 / USEFUL BY NATURE</span>
              <span>03 / YOURS TO MAKE</span>
            </div>
            <div className="philosophy-copy">
              <p>
                A clearer Monday. An invitation that feels like you. A good idea that finally gets
                off the ground.
              </p>
              <p>
                We believe the best digital tools make everyday things a little easier, a little
                more beautiful, and a lot more yours. Thoughtfully made. Easy to pick up. A pleasure
                to use.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
