// Library: motion/react only. Parallax scroll effect.
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full md:aspect-[5/6]">
      <div className="absolute -left-6 top-6 hidden h-12 items-center gap-2 rounded-pill border border-ink-3 bg-ink-1/80 px-4 text-xs uppercase tracking-[0.18em] text-paper-2 backdrop-blur-md md:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
        Cat Runner 02
      </div>

      <motion.div
        style={reduce ? undefined : { y, scale }}
        className="relative h-full w-full overflow-hidden rounded-card border border-ink-3 bg-ink-1"
      >
        <Image
          src="https://picsum.photos/seed/katooni-hero-runner/1800/2200"
          alt="Katooni Kat Runner 02, volt-soled trainer on dark studio background"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-0/40 via-transparent to-transparent" />
      </motion.div>

      <div
        aria-hidden
        className={cn(
          "absolute -bottom-4 right-4 hidden h-12 items-center gap-2 rounded-pill bg-volt-500 px-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-0 md:inline-flex",
        )}
      >
        Volt 02
        <span className="font-mono">/ $285</span>
      </div>
    </div>
  );
}
