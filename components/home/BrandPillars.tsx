// Library: motion/react only.
"use client";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { FadeUp } from "@/components/motion/FadeUp";
import { Footprints, Hand, Path, Pulse } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const pillars = [
  {
    icon: Hand,
    title: "Hand-lasted",
    body: "Every upper is pulled over a last in our Kyoto workshop. Eight minutes per pair, by the same hand each time.",
    span: "md:col-span-7",
    accent: true,
  },
  {
    icon: Path,
    title: "One outsole, three surfaces",
    body: "Pavement, packed dirt, indoor court. We change the lug. We do not change the shoe.",
    span: "md:col-span-5",
    accent: false,
  },
  {
    icon: Pulse,
    title: "Tuned to a 4 mm drop",
    body: "Midfoot strike for most of us. We bias the geometry there and let the rest of the foot do what it does.",
    span: "md:col-span-5",
    accent: false,
  },
  {
    icon: Footprints,
    title: "Built to be re-soled",
    body: "When the rubber goes, the upper does not. Send the pair back and we re-lace the outsole in fourteen days.",
    span: "md:col-span-7",
    accent: true,
  },
];

export function BrandPillars() {
  return (
    <section
      aria-label="Brand pillars"
      className="relative bg-ink-0 py-20 md:py-32"
    >
      <Container>
        <FadeUp>
          <Eyebrow>What we believe</Eyebrow>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-display-lg font-display mt-4 max-w-[18ch] text-paper-1">
            Four ideas. We hold them on purpose.
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <FadeUp
                key={pillar.title}
                delay={0.1 * i}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-card border border-ink-3 bg-ink-1 p-8 transition-colors hover:border-ink-3/0",
                  pillar.span,
                  pillar.accent ? "min-h-[280px] bg-ink-2" : "min-h-[240px]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-pill border",
                      pillar.accent
                        ? "border-volt-500/40 bg-ink-0 text-volt-500"
                        : "border-ink-3 bg-ink-0 text-paper-2",
                    )}
                  >
                    <Icon size={18} weight="bold" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper-3">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-10 text-3xl font-bold tracking-tighter text-paper-1 md:text-4xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-sm text-paper-2 md:text-base">
                  {pillar.body}
                </p>
                {pillar.accent && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-volt-500/10 blur-3xl"
                  />
                )}
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
