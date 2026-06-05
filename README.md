# Katooni

Premium sneaker, trainer, and running shoe storefront. Bilingual (Farsi / English), RTL-first, dark cinematic aesthetic, kinetic type, 3D scrolltelling, Toman pricing.

## Stack

- **Next.js 15** (App Router with `[locale]` segment, React Server Components)
- **Tailwind CSS v4** with `@theme` tokens
- **Motion** (`motion/react`) for component animation
- **React Three Fiber + drei** for the 3D scroll scene
- **GSAP** (no longer used by the home page; library still installed for future use)
- **Phosphor Icons** (`@phosphor-icons/react`)
- **next-intl** for i18n with locale routing
- **Geist + Outfit** (display, EN/LTR) + **Doran + Vazirmatn** (self-hosted, FA/RTL)
- TypeScript strict mode

## Run

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/fa`.

## Surfaces

- `/fa` and `/en` — Home: hero, drop marquee, featured drop, 3D scrolltelling editorial, brand pillars, store preview, manifesto
- `/fa/store` and `/en/store` — Product listing with category / size / color / price filters and sort, URL-driven state, mobile bottom-sheet filters
- `/fa/<any>` and `/en/<any>` — 404 with brand voice

## i18n

- Default locale: Farsi (`/fa`)
- All copy in `messages/fa.json` and `messages/en.json`
- Switch via the language toggle in the header
- Filter URL values stay in English; only labels translate
- Prices always display in Toman, computed from stored USD at 1:50,000

## Out of scope (intentional)

PDP, cart, checkout, real auth, CMS, i18n beyond FA/EN, search, wishlist, reviews, analytics, email capture. Products live in `lib/products.ts` as typed static data.

## Image placeholders

All product and editorial imagery is generated as on-brand SVG placeholders in `lib/product-svg.ts`. Always loads, no external dependency, no Picsum. Replace with generated photography from the `imagegen-frontend-web` skill before shipping.
