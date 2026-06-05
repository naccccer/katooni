// Library: GSAP only. Pin and scrub 3-step editorial scrolltelling.
"use client";

import { usePinnedScene } from "@/components/gsap/usePinnedScene";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { cn } from "@/lib/cn";

const steps = [
  {
    eyebrow: "01 / Build",
    title: "An upper that disappears on the foot.",
    body: "Single-piece engineered knit, knit-in gusset, zero overlays at the midfoot. The foot is the only thing inside the shoe.",
    accent: "Engineered knit upper",
  },
  {
    eyebrow: "02 / Foam",
    title: "Supercritical midsole, 38 mm of it.",
    body: "Two-density supercritical foam, 38 mm heel, 34 mm forefoot, 4 mm drop. Tuned to return the energy you put in, with a quietness underfoot that hides the work.",
    accent: "Supercritical midsole",
  },
  {
    eyebrow: "03 / Outsole",
    title: "Volt rubber, lugged where it counts.",
    body: "Our own volt rubber compound, lugged for pavement and packed dirt. Coverage maps to where the foot actually loads, not where the camera looks.",
    accent: "Volt rubber outsole",
  },
];

export function PinnedEditorial() {
  const containerRef = usePinnedScene({
    scrub: 1,
    pinSpacing: true,
    build: (gsap, ScrollTrigger, container) => {
      const panels = container.querySelectorAll<HTMLDivElement>("[data-step]");
      const fill = container.querySelector<HTMLDivElement>("[data-fill]");
      const stepEls = container.querySelectorAll<HTMLSpanElement>("[data-step-idx]");

      if (!panels.length) return;

      gsap.set(panels, { autoAlpha: 0, y: 24 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${panels.length * 100}%`,
          pin: true,
          scrub: 0.8,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -24, duration: 1 })
          .to(panel, { autoAlpha: 1, y: 0, duration: 1 }, "<");
      });

      if (fill && stepEls.length) {
        const segment = 1 / stepEls.length;
        stepEls.forEach((el, i) => {
          tl.to(
            el,
            { backgroundColor: "rgba(215, 255, 30, 1)", duration: 0.3 },
            i * segment,
          );
          if (i < stepEls.length - 1) {
            tl.to(
              el,
              { backgroundColor: "rgba(31, 31, 36, 1)", duration: 0.3 },
              (i + 1) * segment,
            );
          }
        });
      }
    },
  });

  return (
    <section
      ref={containerRef}
      aria-label="Editorial: how a Katooni is built"
      className="relative h-[100dvh] overflow-hidden bg-ink-0"
    >
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12">
        <div className="relative md:col-span-7">
          {steps.map((step, i) => (
            <div
              key={step.eyebrow}
              data-step
              className={cn(
                "absolute inset-0 flex flex-col justify-center px-6 py-12 md:px-16",
              )}
            >
              <Eyebrow tone="volt" className="text-volt-500">
                <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
                {step.eyebrow}
              </Eyebrow>
              <h3 className="text-display-md font-display mt-6 max-w-[20ch] text-paper-1">
                {step.title}
              </h3>
              <p className="mt-6 max-w-[44ch] text-base text-paper-2 md:text-lg">
                {step.body}
              </p>
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
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative aspect-square w-[68%]">
              <div className="absolute inset-0 rounded-card border border-ink-3 bg-ink-1" />
              <div className="absolute inset-6 rounded-input border border-ink-3 bg-ink-2" />
              <div className="absolute inset-12 rounded-input border border-ink-3 bg-ink-1" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-display-md text-volt-500">
                  KT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        data-fill
        className="absolute bottom-6 left-6 right-6 z-10 hidden items-center gap-2 md:flex"
        aria-hidden
      >
        {steps.map((s, i) => (
          <span
            key={i}
            data-step-idx
            className="h-1 flex-1 rounded-pill bg-ink-3 transition-colors"
          />
        ))}
      </div>
    </section>
  );
}
