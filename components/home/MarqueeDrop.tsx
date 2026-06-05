// Library: motion/react only.
"use client";

import { KineticMarquee } from "@/components/motion/KineticMarquee";
import { Lightning } from "@phosphor-icons/react";

const items = [
  "New drop 014 - Volt Series",
  "Free shipping over $200",
  "Built in Kyoto",
  "Run log v0.4.0",
  "30-day return window",
  "Stockists in 12 cities",
];

export function MarqueeDrop() {
  return (
    <section
      aria-label="Drop announcements"
      className="border-y border-ink-3 bg-ink-0 py-6"
    >
      <KineticMarquee duration={32} className="text-volt-500">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display inline-flex items-center gap-4 text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            <Lightning size={20} weight="fill" className="text-volt-500" />
            {item}
            <span className="text-paper-3" aria-hidden>
              ✕
            </span>
          </span>
        ))}
      </KineticMarquee>
    </section>
  );
}
