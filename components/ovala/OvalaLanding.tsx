// Library: motion/react only.
"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, animate, useReducedMotion } from "motion/react";
import { OvalaNav } from "./OvalaNav";
import { HeroShoeStage } from "./HeroShoeStage";
import { ProductRail } from "./ProductRail";
import { ovalaProducts } from "@/data/ovala-products";

export function OvalaLanding() {
  const total = ovalaProducts.length;
  const reduce = useReducedMotion();

  // The hero wrapper is N viewports tall. Scrolling through it loops the
  // active shoe: 0 → 1 → 2 → 0 → 1 → 2 … indefinitely. One full viewport of
  // scroll = one full cycle through all products.
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ["start start", "end end"],
  });

  // Float in [0, total) that wraps around. We multiply the progress by total
  // and take modulo total so the active index cycles as the user scrolls
  // through the scroller. We do NOT clamp — that would stop the loop.
  const centerRaw = useTransform(scrollYProgress, [0, 1], [0, total], { clamp: false });
  const center = useTransform(centerRaw, (v) => ((v % total) + total) % total);
  const [centerFloat, setCenterFloat] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = center.get();
      setCenterFloat(v);
      const next = Math.round(v) % total;
      setSelectedIndex((prev) => (prev === next ? prev : next));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [center, total]);

  // Smoothly scroll the page so the hero scroller's progress matches the
  // selected card. Lets click-to-jump feel like a real orbit. Because the
  // carousel loops, we pick the closest forward position so the user can
  // continue scrolling the same direction after the click.
  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el || reduce) return;
    const totalScroll = el.offsetHeight - window.innerHeight;
    if (totalScroll <= 0) return;
    const rect = el.getBoundingClientRect();
    const startY = window.scrollY + rect.top;
    // How far through the scroller are we right now? (0..1)
    const currentProgress = (window.scrollY - startY) / totalScroll;
    // Where in the cycle is product i relative to current?
    // We want the next occurrence of i that is >= current cycle's center.
    const currentCenter = ((currentProgress * total) % total + total) % total;
    let delta = (i - currentCenter + total) % total;
    if (delta < 0.01) delta = 0; // already there
    const progressTarget = currentProgress + delta / total;
    const targetY = startY + progressTarget * totalScroll;
    animate(window.scrollY, targetY, {
      type: "tween",
      ease: [0.16, 1, 0.3, 1],
      duration: 0.9,
      onUpdate: (v) => window.scrollTo({ top: v }),
    });
  };

  return (
    <div id="home" dir="rtl" className="relative bg-ink-0 text-paper-1">
      <OvalaNav />

      {/*
        Hero scroller: occupies `total` viewports of vertical scroll. The
        visible viewport (the "stage") is sticky at the top so the user
        stays focused on the shoes as they scroll. Scrolling one full
        viewport walks through every product and loops back to the first.
      */}
      <div ref={scrollerRef} className="relative" style={{ height: `${total * 100}dvh` }}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          <HeroShoeStage
            products={ovalaProducts}
            center={centerFloat}
            selectedIndex={selectedIndex}
            onSelect={scrollToIndex}
          />

          <div className="absolute inset-x-0 bottom-0 pb-8 md:pb-10">
            <ProductRail
              products={ovalaProducts}
              selectedIndex={selectedIndex}
              onSelect={scrollToIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
