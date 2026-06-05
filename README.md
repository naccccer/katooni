# Katooni

Premium sneaker, trainer, and running shoe storefront. Dark cinematic aesthetic, kinetic type, scroll-pinned editorial sections.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **Tailwind CSS v4** with `@theme` tokens
- **Motion** (`motion/react`) for component animation
- **GSAP + ScrollTrigger** for one scroll-pinned section
- **Phosphor Icons** (`@phosphor-icons/react`)
- TypeScript strict mode

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Surfaces

- `/` - Home: hero, drop marquee, featured drop, pinned editorial, brand pillars, store preview, manifesto
- `/store` - Product listing with category / size / color / price filters and sort, URL-driven state

## Out of scope (intentional)

PDP, cart, checkout, real auth, CMS, i18n, search, wishlist, reviews, analytics, email capture. Products live in `lib/products.ts` as typed static data.

## Image placeholders

Hero and product imagery currently use Picsum (descriptive seeds). Replace with generated images before final shipping.
