// Library: motion/react only.
"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { OvalaProduct } from "@/data/ovala-products";

type HeroShoeStageProps = {
  products: OvalaProduct[];
  /** Float in [0, total) that wraps around. */
  center: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

type Slot = "left" | "center" | "right";

function getSlot(center: number, total: number, slot: number): Slot {
  // Use the rounded center as the "anchor". Each item is positioned
  // relative to that anchor, in discrete slot steps. This guarantees one
  // item is always in the center slot — the float scroll progress only
  // drives the smooth tween between integer layouts.
  const anchor = Math.round(center);
  let d = (slot - anchor + total) % total;
  if (d > total / 2) d -= total;
  if (d === 0) return "center";
  return d > 0 ? "right" : "left";
}

// Slot horizontal positions as a percentage of the stage width.
const SLOT_X_PCT: Record<Slot, string> = {
  left: "22%",
  center: "50%",
  right: "78%",
};

const SLOT_ANIM: Record<Slot, { x: string; y: number; scale: number; opacity: number; filter: string; zIndex: number; width: string }> = {
  left: {
    x: "-50%",
    y: 60,
    scale: 0.55,
    opacity: 0.32,
    filter: "blur(8px) saturate(0.6) brightness(0.5)",
    zIndex: 1,
    width: "min(32vh, 36vw)",
  },
  center: {
    x: "-50%",
    y: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px) saturate(1) brightness(1)",
    zIndex: 5,
    width: "min(56vh, 60vw)",
  },
  right: {
    x: "-50%",
    y: 60,
    scale: 0.55,
    opacity: 0.32,
    filter: "blur(8px) saturate(0.6) brightness(0.5)",
    zIndex: 1,
    width: "min(32vh, 36vw)",
  },
};

/**
 * Compute the "scrub" for each product — a float in [0, 1] that maps to
 * the video's currentTime. The product whose offset is closest to 0
 * (i.e. the one currently passing through the center) scrubs from 0 to 1
 * as the user scrolls through it. Other products hold at the first frame.
 *
 * `d` is the signed offset of this product from the center, wrapped to
 * (-total/2, total/2]. We use the abs(d) to find the active product; the
 * active product's scrub is `1 - |d|*2` mapped to [0, 1] (so d=0 → 0,
 * d=±0.5 → 1, but clamped at 0.5 max range).
 */
function getScrub(center: number, total: number, slot: number): { scrub: number; isActive: boolean } {
  let d = (slot - center + total) % total;
  if (d > total / 2) d -= total;
  // For the active product, d is in [-0.5, 0.5] (the "center neighborhood").
  // Map d to scrub: d=+0.5 → scrub=0, d=0 → scrub=0.5, d=-0.5 → scrub=1.
  // Side products (|d| > 0.5) have scrub=0 (paused at first frame).
  const inRange = Math.abs(d) <= 0.5;
  if (!inRange) return { scrub: 0, isActive: false };
  return { scrub: -d + 0.5, isActive: true };
}

export function HeroShoeStage({ products, center, selectedIndex, onSelect }: HeroShoeStageProps) {
  const reduce = useReducedMotion();
  const total = products.length;
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const transition = useMemo(
    () => ({
      duration: reduce ? 0 : 0.9,
      ease: EASE,
    }),
    [reduce],
  );

  // Drive each video's currentTime from the scroll-driven `center` value.
  // The product whose offset is closest to 0 (currently passing through
  // the center) scrubs forward as the user scrolls. Others pause at
  // frame 0. This is the "shoes play just by scroll" behavior.
  useEffect(() => {
    if (reduce) return;
    for (let i = 0; i < products.length; i++) {
      const v = videoRefs.current[i];
      if (!v) continue;
      const { scrub, isActive } = getScrub(center, total, i);
      const dur = Number.isFinite(v.duration) ? v.duration : 0;
      if (dur > 0) {
        const target = isActive ? scrub * dur : 0;
        if (Math.abs(v.currentTime - target) > 0.02) {
          v.currentTime = target;
        }
      }
      if (isActive && v.paused) {
        v.play().catch(() => {});
      } else if (!isActive && !v.paused) {
        v.pause();
        if (Number.isFinite(v.duration)) v.currentTime = 0;
      }
    }
  }, [center, total, products, reduce]);

  return (
    <div
      dir="rtl"
      className="pointer-events-none absolute inset-0"
      aria-roledescription="carousel"
    >
      {/* Volt orbit accent + radial glow behind the center shoe */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(82vh, 92vw)",
          height: "min(82vh, 92vw)",
        }}
      >
        <div className="absolute inset-0 rounded-full border border-volt-500/12" />
        <div className="absolute inset-[14%] rounded-full border border-volt-500/8" />
        <div className="absolute inset-[28%] rounded-full border border-volt-500/5" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(215,255,30,0.08),transparent_60%)]" />
      </div>

      {products.map((p, i) => {
        const slot = getSlot(center, products.length, i);
        const isCenter = i === selectedIndex;
        return (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${p.brandFa} ${p.nameFa}`}
            aria-current={isCenter ? "true" : undefined}
            initial={false}
            animate={{
              ...SLOT_ANIM[slot],
              left: SLOT_X_PCT[slot],
            }}
            transition={transition}
            className="pointer-events-auto absolute top-1/2 -translate-y-1/2 outline-none focus-visible:outline-2 focus-visible:outline-volt-500"
            style={{ willChange: "transform, opacity, filter, left" }}
          >
            <div className="relative w-full" style={{ aspectRatio: "5 / 4" }}>
              {/*
                The video carries its own black background. Since the page
                background is pure black, the two blend. Playback is
                controlled by scroll: the active product's currentTime
                scrubs 0→1 as the user scrolls past it. Side products hold
                at frame 0. No autoplay.
              */}
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={p.video}
                muted
                playsInline
                preload="auto"
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
