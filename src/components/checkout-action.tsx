import { checkoutFor, formatPrice, type Product } from '@/lib/catalog';
import { site } from '@/lib/site';
import { Arrow } from './arrow';
export function CheckoutAction({ product }: { product: Product }) {
  const checkout = checkoutFor(product);
  return (
    <div className="checkout-action">
      {checkout && product.price ? (
        <>
          <p className="product-price">
            {formatPrice(product.price)} <span>{product.price.currency} · one-time purchase</span>
          </p>
          <a className="button button-dark" href={checkout} rel="external">
            Buy digital download <Arrow diagonal />
          </a>
          <p>
            Continue to Lemon Squeezy for payment and delivery. Any applicable taxes and final total
            are shown at checkout.
          </p>
        </>
      ) : (
        <>
          <p className="availability-note">
            <span className="status-dot" /> Coming soon · not available to purchase
          </p>
          <a
            className="button button-dark"
            href={`mailto:${site.email}?subject=${encodeURIComponent(`A question about ${product.title}`)}`}
          >
            Ask us about it <Arrow diagonal />
          </a>
        </>
      )}
    </div>
  );
}
