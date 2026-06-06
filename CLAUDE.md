# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Katooni — a premium sneaker, trainer, and running shoe storefront. Bilingual (Farsi/English), RTL-first, dark cinematic aesthetic, kinetic type, 3D scrolltelling, Toman pricing.

## Commands

```bash
npm install --legacy-peer-deps   # install; --legacy-peer-deps is required for React 19 RC
npm run dev                      # next dev → http://localhost:3000 (redirects to /fa)
npm run build                    # next build
npm run start                    # next start (after build)
npm run lint                     # next lint
```

There are no tests in this project.

## Architecture

### Routing (Next.js 15 App Router, RSC)

All routes live under `app/[locale]/`. Locale is enforced by `middleware.ts` via `next-intl/middleware`; unmatched paths redirect to the default locale (`fa`, see `i18n/routing.ts`).

- `app/[locale]/layout.tsx` — locale-aware root layout. Sets `<html lang dir>`, wires `NextIntlClientProvider`, `MotionConfig` (reducedMotion: "user"), global font CSS variables (Outfit/Geist for EN/LTR, Kalameh/Vazirmatn for FA/RTL via `fonts.css` + `globals.css`), and mounts `SiteHeader`/`SiteFooter`. Validates the locale with `hasLocale()` → `notFound()`.
- `app/[locale]/page.tsx` — server composition of the seven home sections (Hero, Marquee, FeaturedDrop, ShoeScrollCinematic, BrandPillars, StorePreview, Manifesto).
- `app/[locale]/store/page.tsx` — server component that parses `searchParams` via `lib/filters.parseFiltersFromSearchParams`, then hands off to the client wrapper `StoreClient`.
- `app/[locale]/store/loading.tsx` — Suspense skeleton (pulse placeholders, dark-ink palette).
- `app/[locale]/not-found.tsx` — brand-voice 404.
- `app/[locale]/globals.css` — Tailwind v4 `@theme` tokens (ink-0..3, paper-1..3, volt-500/600, signal-err, radius-pill/card/input, container-max 1440px), font rebinding for `html[lang="fa"]`, display text utilities, `.container-x` / `.eyebrow` / `.hairline` utilities, `prefers-reduced-motion` overrides.

### i18n (`i18n/`, `messages/`)

- `i18n/routing.ts` — `defineRouting` with locales `["fa","en"]`, default `fa`, `localePrefix: "always"`. Exports `Locale`, `RTL_LOCALES`, and `isRtl(locale)`.
- `i18n/request.ts` — `getRequestConfig` that loads `messages/{locale}.json` based on the validated route locale.
- `messages/fa.json` and `messages/en.json` — namespaces: `common`, `nav`, `footer`, `hero`, `marquee`, `featured`, `editorial`, `pillars`, `preview`, `manifesto`, `store`, `product`, `notFound`. All copy is here. Filter URL values (category, gender, size, color hex) stay in English; only labels translate.
- `next-intl` server usage: `getTranslations`, `setRequestLocale` in server components/layouts. Client usage: `useTranslations`, `useLocale` from `next-intl`.

### Component layers (`components/`)

- `primitives/` — Server-renderable design system atoms: `Button` (polymorphic: `href` → `<a>`, else `<button>`; variants `primary|secondary|ghost`; sizes `md|lg`), `Container` (polymorphic `div|section|article|header|footer|nav` wrapping `.container-x`), `Eyebrow` (mono label), `Price` (client, uses `useLocale` + `formatPrice`).
- `chrome/` — Site chrome: `SiteHeader` (fixed, scroll-aware backdrop blur, primary nav, `LocaleSwitcher`, mobile hamburger → `MobileNav`), `SiteFooter`, `MobileNav` (slide-in panel), `LocaleSwitcher` (pathname-aware, replaces `/fa` or `/en` segment).
- `motion/` — Reusable motion primitives, all `"use client"`, all `motion/react` only (never co-located with GSAP): `FadeUp`/`FadeIn` (in-view stagger), `KineticMarquee` (tripled children, `x: ["0%","-33.333%"]` linear infinite), `MagneticButton` (pointer-sprung), `SplitReveal` (per-char or per-word rise from below with stagger variants from `lib/motion-variants`).
- `home/` — Server shells that compose `motion/` primitives + `primitives/`. Each home section is a "use client" composition; the page itself is server-side. `ShoeScrollCinematic` is the only one that lazy-loads the heavy `three` bundle via `next/dynamic({ ssr: false })` and skips the canvas when `prefers-reduced-motion` or non-desktop.
- `store/` — All `"use client"`. `StoreClient` is the URL-driven controller (calls `router.replace` on filter/sort changes via `useTransition`). `FilterRail` is shared between desktop (sticky aside) and `MobileFilterSheet` (which passes `variant="sheet"` + `onApply`). `SortDropdown` is a custom listbox with click-outside dismiss. `ProductCard`/`ProductGrid`/`EmptyState` are presentational.
- `three/` — `ShoeScene` (R3F `<Canvas>` with `<ScrollControls pages={3}>` + `<Environment preset="night" />` + procedural floor + fog), `ShoeModel` (procedural shoe built from `<RoundedBox>`/`<mesh>` parts, pulsing volt emissive band driven by `useFrame`), `CameraRig` (4 keyframe views, eased lerp via `useScroll().offset`), `Particles` (240 instanced spheres). Colors come from `lib/three-config.ts`.

### Library code (`lib/`)

- `cn.ts` — class-name joiner (filter booleans, join spaces). Used in every component.
- `filters.ts` — `FilterState` type, `defaultFilters`, `parseFiltersFromSearchParams` (server, takes `Record<string, string|string[]|undefined>`), `filtersToSearchParams`, `isDefault`, `activeFilterCount`, `PAGE_SIZE = 12`, sort keys `newest|price-asc|price-desc|popularity`. URL is the source of truth for the store; never store filter state in a context/store.
- `pricing.ts` — `USD_TO_TOMAN = 50_000` (fixed illustrative rate). `formatPrice(usd, locale)` → localized digits via `Intl.NumberFormat` (`fa-IR` Persian digits / `en-US` Western) with `تومان` / `toman` suffix.
- `motion-variants.ts` — `EASE_OUT_EXPO = [0.16, 1, 0.3, 1]`, `EASE_OUT_QUART`, `baseTransition`, `fadeUp`, `fadeIn`, `stagger(delayChildren, staggerChildren)`, `charRise`. Single source of truth for the page's motion language.
- `gsap-config.ts` — `getGsap()` that lazy-registers `ScrollTrigger` once. The home page no longer uses GSAP, but the library is still installed. Per the project rules, `motion/react` and GSAP must not coexist in the same file (see the "Library:" header comment in each file).
- `three-config.ts` — `THREE_INK_0..3`, `THREE_VOLT`, `THREE_VOLT_DIM`, `sceneColors` — JS-mirror of the CSS theme tokens used inside the R3F scene.
- `product-types.ts` — `Category` (running/trail/track/court/lifestyle), `Gender` (mens/womens/unisex), `Brand` (katooni/nike/adidas/on/asics/newbalance/hoka), `Colorway`, `Product`.
- `products.ts` — Typed static catalog + `getFeaturedDrop()` and `getStorePreview()` selectors. Adding products means editing this file. Image paths are `/products/{id}.jpg` (real `.jpg` files exist for 36 SKUs in `public/products/`).
- `product-svg.ts` — Generated on-brand SVG placeholders (e.g. `heroLifestyleSvg`). Replaces Picsum/external deps. Real photography is intended to come from the `imagegen-frontend-web` skill before shipping.

### Public assets (`public/`)

- `fonts/` — self-hosted Farsi: Kalameh (4 weights) for display, Vazirmatn (9 weights) for body, both `woff2`. `app/[locale]/fonts.css` declares all `@font-face` rules.
- `images/` — editorial JPGs (hero-lifestyle, editorial-runner, editorial-track).
- `products/` — 36 product JPGs at 1200×1200, one per SKU in `lib/products.ts`.

### Scripts (`scripts/`)

- `expand-catalog.js` — Node script that downloads product JPGs from `picsum.photos` into `public/products/`. Run manually when adding new SKUs.
- `fetch-product-images.js` — same intent, alternate list.

## Conventions

- "Library:" header at the top of every file declares which animation library is in use (`motion/react only`, `react-three-fiber only`, or `motion/react + next-intl` etc.). Never mix GSAP and `motion/react` in the same file.
- Server components by default. Add `"use client"` only when you need state, effects, refs, or motion. Many server shells (e.g. `HeroKinetic`) compose client components — the shell itself stays server.
- Reduced motion is a first-class concern: `MotionConfig reducedMotion="user"` is mounted in the root layout, and every motion primitive checks `useReducedMotion()` and short-circuits to a static render.
- Tailwind v4 `@theme` is the only place colors, fonts, and radii are defined. Don't hardcode colors in components — use `text-paper-1`, `bg-ink-1`, `border-ink-3`, `text-volt-500`, etc. For the 3D scene, mirror those values via `lib/three-config.ts` constants.
- Use `cn()` from `lib/cn.ts` for any conditional class composition.
- Self-hosted Farsi fonts in `public/fonts/` are bound by `html[lang="fa"]` in `globals.css` — don't add per-component font-family overrides; use the `font-display`, `font-sans`, `font-mono` Tailwind utilities.
- The store filter UI is URL-driven. `StoreClient.update()` is the only place filters are written; it uses `router.replace` + `useTransition` and never bumps scroll. Mobile sheet (`MobileFilterSheet`) and desktop rail (`FilterRail` with `variant="rail"`) render the same component with different chrome.
- Prices: stored as USD on `Product.price`, always displayed in Toman via `formatPrice` (or the `<Price>` primitive). The 1:50,000 rate is fixed in `lib/pricing.ts`.
- The 3D canvas (`ShoeScene`) is `next/dynamic` imported with `ssr: false` from `ShoeScrollCinematic`; on mobile or with `prefers-reduced-motion` it falls back to a static skeleton.
- The header is fixed and 72px tall — sticky positioned elements use `top-[88px]` (e.g. `FilterRail`) to clear it.
- The `impeccable` skill is installed at `.claude/skills/impeccable/` and `.agents/skills/impeccable/`. The `skills-lock.json` lists 15 design/visual skills the project was built with.

## Out of scope (intentional)

PDP, cart, checkout, real auth, CMS, i18n beyond FA/EN, search, wishlist, reviews, analytics, email capture. Products live in `lib/products.ts` as typed static data. Filter URL values (category/gender/size/color hex) stay in English; only labels translate.
