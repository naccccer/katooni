// Library: motion/react only. Pinned section that mounts the 3D Canvas.
// Lazy-loads the heavy three bundle on the client only.
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Eyebrow } from "@/components/primitives/Eyebrow";

const ShoeScene = dynamic(
  () => import("@/components/three/ShoeScene").then((m) => m.ShoeScene),
  {
    ssr: false,
    loading: () => <SceneSkeleton />,
  },
);

function SceneSkeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[68%]">
        <div className="absolute inset-0 animate-pulse rounded-card border border-ink-3 bg-ink-1" />
        <div className="absolute inset-6 animate-pulse rounded-input border border-ink-3 bg-ink-2" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-display-md text-volt-500">KT</span>
        </div>
      </div>
    </div>
  );
}

export function ShoeScrollCinematic() {
  const [reduce, setReduce] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const t = useTranslations("editorial");
  const locale = useLocale();
  const motionPref = useReducedMotion();

  useEffect(() => {
    setReduce(motionPref ?? false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [motionPref]);

  const showCanvas = isDesktop && !reduce;

  const steps = [
    {
      eyebrow: t("step1Eyebrow"),
      title: t("step1Title"),
      body: t("step1Body"),
      accent: t("step1Accent"),
    },
    {
      eyebrow: t("step2Eyebrow"),
      title: t("step2Title"),
      body: t("step2Body"),
      accent: t("step2Accent"),
    },
    {
      eyebrow: t("step3Eyebrow"),
      title: t("step3Title"),
      body: t("step3Body"),
      accent: t("step3Accent"),
    },
  ];

  return (
    <section
      aria-label="How a Katooni is built"
      className="relative h-[100dvh] overflow-hidden bg-ink-0"
    >
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12">
        <div className="relative md:col-span-7">
          {steps.map((step, i) => (
            <div
              key={step.eyebrow}
              className="absolute inset-0 flex flex-col justify-center px-6 py-12 md:px-16"
            >
              <Eyebrow tone="volt" className="text-volt-500">
                <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
                {step.eyebrow}
              </Eyebrow>
              <motion.h3
                className="text-display-md font-display mt-6 max-w-[20ch] text-paper-1"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={i}
              >
                {step.title}
              </motion.h3>
              <motion.p
                className="mt-6 max-w-[44ch] text-base text-paper-2 md:text-lg"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {step.body}
              </motion.p>
              <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-paper-3">
                <span className="font-mono">{step.accent}</span>
                <span aria-hidden className="h-px w-8 bg-ink-3" />
                <span className="font-mono">
                  Step {i + 1} / {steps.length}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative hidden md:col-span-5 md:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(215,255,30,0.18),transparent_60%)]" />
          {showCanvas ? (
            <ShoeScene />
          ) : (
            <SceneSkeleton />
          )}
        </div>
      </div>
    </section>
  );
}
