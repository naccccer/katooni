// Library: motion/react only.
"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { heroLifestyleSvg } from "@/lib/product-svg";
import { cn } from "@/lib/cn";
import { formatPrice, usdToToman } from "@/lib/pricing";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const locale = useLocale();
  const t = useTranslations("hero");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const heroUrl = heroLifestyleSvg(1800, 2200);

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full md:aspect-[5/6]">
      <div className="absolute start-6 top-6 hidden h-12 items-center gap-2 rounded-pill border border-ink-3 bg-ink-1/80 px-4 text-xs uppercase tracking-[0.18em] text-paper-2 backdrop-blur-md md:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
        {t("tag")}
      </div>

      <motion.div
        style={reduce ? undefined : { y, scale }}
        className="relative h-full w-full overflow-hidden rounded-card border border-ink-3 bg-ink-1"
      >
        <img
          src={heroUrl}
          alt={t("tag")}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-0/40 via-transparent to-transparent" />
      </motion.div>

      <div
        aria-hidden
        className={cn(
          "absolute -bottom-4 end-4 hidden h-12 items-center gap-2 rounded-pill bg-volt-500 px-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-0 md:inline-flex",
        )}
      >
        Volt 02
        <span className="font-mono">{formatPrice(285, locale)}</span>
      </div>
    </div>
  );
}
