// Library: motion/react only.
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Price } from "@/components/primitives/Price";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FadeUp } from "@/components/motion/FadeUp";
import { ArrowUpRight, Star } from "@phosphor-icons/react";
import { getFeaturedDrop } from "@/lib/products";

export function FeaturedDrop() {
  const drop = getFeaturedDrop();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1.06, 1.04]);

  return (
    <section
      ref={ref}
      aria-label="Featured drop"
      className="relative bg-ink-0 py-20 md:py-32"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <div className="relative aspect-[5/6] w-full overflow-hidden rounded-card border border-ink-3 bg-ink-1">
              <motion.div
                style={reduce ? undefined : { scale }}
                className="absolute inset-0"
              >
                <Image
                  src={drop.image}
                  alt={drop.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-pill border border-ink-3 bg-ink-0/70 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-paper-1 backdrop-blur-md">
                <Star size={12} weight="fill" className="text-volt-500" />
                Featured drop
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 md:col-span-5">
            <FadeUp>
              <Eyebrow tone="volt" className="text-volt-500">
                <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
                02 / Drop
              </Eyebrow>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-display-lg font-display text-paper-1">
                {drop.name}
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="max-w-[44ch] text-base text-paper-2">
                {drop.short} Available in three colorways. Limited first run
                of 1,200 pairs. Each pair is individually numbered on the
                medial heel.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <dl className="grid grid-cols-3 gap-6 border-y border-ink-3 py-6">
                <div>
                  <dt className="eyebrow">Price</dt>
                  <dd className="mt-1">
                    <Price value={drop.price} size="md" />
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Weight</dt>
                  <dd className="mt-1 font-mono text-sm text-paper-1">
                    {drop.weightGrams} g
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Drop</dt>
                  <dd className="mt-1 font-mono text-sm text-paper-1">
                    {drop.drop} mm
                  </dd>
                </div>
              </dl>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="/store" strength={0.2}>
                  <span className="inline-flex h-14 items-center gap-2 rounded-pill bg-volt-500 px-7 text-base font-medium text-ink-0 transition-colors hover:bg-volt-600">
                    Shop the drop
                    <ArrowUpRight size={18} weight="bold" />
                  </span>
                </MagneticButton>
                <Link
                  href="/store"
                  className="text-sm text-paper-2 underline-offset-4 hover:text-volt-500 hover:underline"
                >
                  Read the spec sheet
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
