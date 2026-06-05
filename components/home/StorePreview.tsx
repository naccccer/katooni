// Library: motion/react only.
"use client";

import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Price } from "@/components/primitives/Price";
import { FadeUp } from "@/components/motion/FadeUp";
import { getStorePreview } from "@/lib/products";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export function StorePreview() {
  const items = getStorePreview();
  const locale = useLocale();
  const t = useTranslations("preview");
  return (
    <section
      aria-label="Store preview"
      className="relative border-t border-ink-3 bg-ink-0 py-20 md:py-32"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <FadeUp>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-display-lg font-display mt-4 max-w-[18ch] text-paper-1">
                {t("title")}
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link
              href={`/${locale}/store`}
              className="inline-flex h-12 items-center gap-2 rounded-pill border border-ink-3 px-5 text-sm text-paper-1 transition-colors hover:border-paper-2 hover:bg-ink-1"
            >
              {t("viewStore")}
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </FadeUp>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
          {items.map((p, i) => {
            const spans = [
              "md:col-span-7",
              "md:col-span-5",
              "md:col-span-5",
              "md:col-span-7",
            ];
            return (
              <FadeUp
                key={p.id}
                delay={0.05 * i}
                className={cn(
                  "group relative overflow-hidden rounded-card border border-ink-3 bg-ink-1",
                  spans[i],
                )}
              >
                <Link
                  href={`/${locale}/store?category=${p.category}`}
                  className="block"
                  aria-label={`View ${p.name} in store`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-0/60 via-transparent to-transparent" />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3">
                        {p.category}
                      </p>
                      <h3 className="font-display mt-1 text-2xl font-bold tracking-tighter text-paper-1 transition-colors group-hover:text-volt-500">
                        {p.name}
                      </h3>
                    </div>
                    <Price valueUsd={p.price} className="text-paper-1" />
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
