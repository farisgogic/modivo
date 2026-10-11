# Creative direction

Three approaches were evaluated before implementation:

| Direction           | Identity and hero                                          | Interaction and product presentation                                 | Assessment                                                                                                                              |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| The Working Library | Monochrome/cobalt, condensed editorial catalog             | Numbered index, flat product folios                                  | Very clear and fast, good mobile adaptability, but more institutional and less distinctive emotionally.                                 |
| Soft Systems        | Warm clay/cream, gentle serif-led typography               | Tactile stationery and slow reveals                                  | Human and approachable, but risks making the wider brand feel limited to planners and events.                                           |
| The Useful Object   | Ivory/charcoal/citrus, large sans paired with italic serif | A dimensional stack of useful digital sheets; small pointer response | Strong visual signature, clear product relationship, lightweight CSS rendering, and an adaptable vertical mobile composition. Selected. |

The sheet stack makes the abstract idea of digital products tangible. Its three visual languages recur in featured work, connecting the hero to product exploration. Collections are a typographic index rather than six interchangeable cards. A citrus band marks the transition from promise to possibilities; the dark philosophy spread changes the pace before the quiet contact ending.

Tokens live in globals.css: paper #f5f4ee, ink #23251f, citrus #d8ed58; responsive gutter 24–88px; maximum canvas 1600px; 760px and 1100px layout changes; shared cubic-bezier(.22,1,.36,1). The main font is self-hosted Manrope Variable; Georgia supplies an editorial italic without another network request. Fontsource packages include the upstream SIL OFL license.

Motion is deliberately bounded: content appears immediately with a brief entrance, sheets respond to fine pointer movement, and links show small directional cues. No scroll hijacking, custom cursor, automatic carousel, loading gate, or continuous animation. Reduced motion removes transforms and transitions. All product art is original HTML/CSS; the social image is original vector composition rendered to PNG.

Review pass 1: Simplified the category index to native details/summary, added no-JS navigation, removed registration marks to avoid an unsupported trademark claim, and adapted mobile composition into a full-width showcase beneath the headline.

Review pass 2: See QA.md for rendered review, accessibility corrections, and export verification.

## Studio refinement

The second iteration strengthens the existing identity rather than replacing the brand: deeper forest green product artwork, a purpose-built symmetrical eight-point mark, and a bounded studio surface for the hero. Three keyboard-accessible composition controls let visitors bring each concept to the front without auto-rotation. The active control uses `aria-pressed`; number decorations are hidden from assistive technology. Controls disappear with JavaScript disabled, leaving the original static composition.

The featured gallery now uses a staggered editorial layout on desktop and full-width previews on mobile. A shorter philosophy statement, explicit design principles, more deliberate section spacing, rounded action controls, and an oversized footer wordmark give the page clearer pacing. The favicon and social preview match the refined palette. Hero copy no longer fades in, so important text is immediately visible. Reduced-motion support remains in effect.

Refinement styles are isolated in `src/app/refinement.css`; shared foundational layout and component styles remain in `src/app/globals.css`.

## Storefront completion

The shop extends the existing editorial system with a large two-part headline, understated search and native category controls, and an even browsing grid. The homepage keeps its asymmetrical featured gallery. Collection pages add restrained category colors and typographic symbols; empty collections retain useful navigation without invented products.

Product detail pages pair a generous preview with concise availability information, then separate file/compatibility/license details from FAQs and related work. Unconfirmed audience, feature and setup sections stay absent for concepts instead of repeating empty claims. The same section becomes available automatically when real catalog data exists. About and Contact reuse the typography, spacing and footer rather than introducing a separate visual language.

The storefront motion tokens unify gallery, menu and disclosure timing. Progressive view-timeline movement never hides content and is disabled for reduced motion. Native controls retain keyboard focus and 44px minimum filter targets. Visual review covered desktop shop, About and empty collection pages plus mobile shop, product and Contact. A measured readability issue prompted larger mobile notices, filter labels, result counts and product metadata. See QA.md for measured results and limits.
