// Library: motion/react only.
"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import type { OvalaProduct } from "@/data/ovala-products";

type ProductRailProps = {
  products: OvalaProduct[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

type Slot = "left" | "center" | "right";

function getSlot(selectedIndex: number, total: number, slot: number): Slot {
  let d = (slot - selectedIndex) % total;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  if (Math.abs(d) < 0.5) return "center";
  return d > 0 ? "right" : "left";
}

// The three cards live in a single row. The active card sits at the
// visual center of the row; the other two flank it. The cards animate
// between left/center/right positions as the selected product changes.
const SLOT_X_PCT: Record<Slot, string> = {
  left: "16.6667%",
  center: "50%",
  right: "83.3333%",
};

const SLOT_ANIM: Record<Slot, TargetAndTransition> = {
  left: { x: "-50%", scale: 0.85, opacity: 0.5, filter: "blur(2px) saturate(0.5) brightness(0.6)" },
  center: { x: "-50%", scale: 1, opacity: 1, filter: "blur(0px) saturate(1) brightness(1)" },
  right: { x: "-50%", scale: 0.85, opacity: 0.5, filter: "blur(2px) saturate(0.5) brightness(0.6)" },
};

export function ProductRail({ products, selectedIndex, onSelect }: ProductRailProps) {
  const reduce = useReducedMotion();
  const total = products.length;

  const transition = useMemo(
    () => ({ duration: reduce ? 0 : 0.7, ease: EASE }),
    [reduce],
  );

  return (
    <div dir="ltr" className="relative mx-auto w-full max-w-[1100px] px-6 md:px-10">
      <div className="relative h-[160px] md:h-[180px]">
        {products.map((p, i) => {
          const slot = getSlot(selectedIndex, total, i);
          const isActive = slot === "center";
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={isActive}
              aria-label={`${p.brandFa} ${p.nameFa}`}
              initial={false}
              animate={{ ...SLOT_ANIM[slot], left: SLOT_X_PCT[slot] }}
              transition={transition}
              className="absolute top-0 w-[33.333%] max-w-[320px] outline-none focus-visible:outline-2 focus-visible:outline-volt-500"
              style={{ willChange: "transform, opacity, filter, left" }}
            >
              <div
                className={
                  "relative w-full rounded-xl border border-paper-3/15 bg-ink-1/40 px-5 py-6 backdrop-blur-sm transition-[border-color,background,box-shadow] duration-500 " +
                  (isActive
                    ? "border-volt-500/60 bg-ink-1/60 shadow-[0_24px_60px_-30px_rgba(215,255,30,0.55)]"
                    : "")
                }
                style={{ aspectRatio: "5 / 3" }}
              >
                <div className="flex h-full flex-col items-start justify-between text-start">
                  <span
                    className={
                      "truncate text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 " +
                      (isActive ? "text-paper-2" : "text-paper-3")
                    }
                  >
                    {p.brandFa}
                  </span>
                  <span
                    className={
                      "truncate text-base font-medium transition-colors duration-300 md:text-lg " +
                      (isActive ? "text-volt-500" : "text-paper-1")
                    }
                  >
                    {p.nameFa}
                  </span>
                </div>
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute end-4 top-4 inline-flex h-1.5 w-1.5 rounded-full bg-volt-500 shadow-[0_0_12px_rgba(215,255,30,0.9)]"
                  />
                ) : null}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
