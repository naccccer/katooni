// Library: motion/react only.
"use client";

import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArrowUpRight, Lightning } from "@phosphor-icons/react";

export function HeroCopy() {
  return (
    <div className="flex flex-col gap-8">
      <FadeUp>
        <Eyebrow tone="volt" className="text-volt-500">
          <Lightning size={12} weight="fill" />
          Drop 014 - Volt Series
        </Eyebrow>
      </FadeUp>

      <h1 className="text-display-xl font-display text-paper-1">
        <span className="block">
          <SplitReveal text="Run" delayChildren={0.05} perChar />
        </span>
        <span className="block">
          <SplitReveal text="first." delayChildren={0.15} perChar />
        </span>
        <span className="block text-volt-500">
          <SplitReveal text="Volt 02." delayChildren={0.3} perChar />
        </span>
      </h1>

      <FadeUp delay={0.4}>
        <p className="max-w-[44ch] text-base text-paper-2 md:text-lg">
          Carbon-plated, volt-soled, and built for the long mile. Engineered in
          Kyoto. Tested on the first cold morning of the year.
        </p>
      </FadeUp>

      <FadeUp delay={0.55}>
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href="/store?category=running" strength={0.2}>
            <span className="inline-flex h-14 items-center gap-2 rounded-pill bg-volt-500 px-7 text-base font-medium text-ink-0 transition-colors hover:bg-volt-600">
              Shop the drop
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </MagneticButton>
          <Button href="/store" variant="secondary" size="lg">
            Browse the catalog
          </Button>
        </div>
      </FadeUp>

      <FadeUp delay={0.7}>
        <dl className="mt-4 grid max-w-md grid-cols-3 gap-6 border-t border-ink-3 pt-6">
          <div>
            <dt className="eyebrow">Drop</dt>
            <dd className="mt-1 font-mono text-sm text-paper-1">4 mm</dd>
          </div>
          <div>
            <dt className="eyebrow">Weight</dt>
            <dd className="mt-1 font-mono text-sm text-paper-1">198 g</dd>
          </div>
          <div>
            <dt className="eyebrow">Plate</dt>
            <dd className="mt-1 font-mono text-sm text-paper-1">Carbon</dd>
          </div>
        </dl>
      </FadeUp>
    </div>
  );
}
