// Library: motion/react only.
"use client";

import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Lightning } from "@phosphor-icons/react";

export function HeroCopy() {
  const t = useTranslations("hero");
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-8">
      <FadeUp>
        <Eyebrow tone="volt" className="text-volt-500">
          <Lightning size={12} weight="fill" />
          {t("eyebrow")}
        </Eyebrow>
      </FadeUp>

      <h1 className="text-display-xl font-display text-paper-1">
        <span className="block">
          <SplitReveal text={t("line1")} delayChildren={0.05} perChar />
        </span>
        <span className="block">
          <SplitReveal text={t("line2")} delayChildren={0.15} perChar />
        </span>
        <span className="block text-volt-500">
          <SplitReveal text={t("line3")} delayChildren={0.3} perChar />
        </span>
      </h1>

      <FadeUp delay={0.4}>
        <p className="max-w-[44ch] text-base text-paper-2 md:text-lg">
          {t("sub")}
        </p>
      </FadeUp>

      <FadeUp delay={0.55}>
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href={`/${locale}/store?category=running`} strength={0.2}>
            <span className="inline-flex h-14 items-center gap-2 rounded-pill bg-volt-500 px-7 text-base font-medium text-ink-0 transition-colors hover:bg-volt-600">
              {t("ctaPrimary")}
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </MagneticButton>
          <Button href={`/${locale}/store`} variant="secondary" size="lg">
            {t("ctaSecondary")}
          </Button>
        </div>
      </FadeUp>

      <FadeUp delay={0.7}>
        <dl className="mt-4 grid max-w-md grid-cols-3 gap-6 border-t border-ink-3 pt-6">
          <div>
            <dt className="eyebrow">{t("specDrop")}</dt>
            <dd className="mt-1 font-mono text-sm text-paper-1">{t("specDropValue")}</dd>
          </div>
          <div>
            <dt className="eyebrow">{t("specWeight")}</dt>
            <dd className="mt-1 font-mono text-sm text-paper-1">{t("specWeightValue")}</dd>
          </div>
          <div>
            <dt className="eyebrow">{t("specPlate")}</dt>
            <dd className="mt-1 font-mono text-sm text-paper-1">{t("specPlateValue")}</dd>
          </div>
        </dl>
      </FadeUp>
    </div>
  );
}
