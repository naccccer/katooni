// Library: motion/react only.
"use client";

import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/pricing";

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

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.05);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.05);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full md:aspect-[5/6]">
      <div className="absolute start-6 top-6 hidden h-12 items-center gap-2 rounded-pill border border-ink-3 bg-ink-0/60 px-4 text-xs uppercase tracking-[0.18em] text-paper-2 backdrop-blur-md md:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
        {t("tag")}
      </div>

      <motion.div
        style={reduce ? { y, scale } : { y, scale, x: sx, translateY: sy }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative h-full w-full cursor-crosshair overflow-hidden rounded-card border border-ink-3 bg-ink-1"
      >
        <img
          src="/images/hero-lifestyle.png"
          alt={t("tag")}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-0/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(215,255,30,0.15),transparent_40%)]" />
      </motion.div>

      <div
        aria-hidden
        className={cn(
          "absolute -bottom-4 end-4 hidden h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-pill bg-volt-500 px-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-0 md:inline-flex",
        )}
      >
        Volt 02
        <span className="font-mono">{formatPrice(285, locale)}</span>
      </div>
    </div>
  );
}
