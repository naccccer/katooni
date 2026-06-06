// Library: motion/react only. Scroll-scrubbed video. A 16:9 frame sits
// centered in the page; the page scrolls past it and the video time
// advances. Feathered edges blend the frame into the surrounding ink
// background so it reads as part of the page, not a separate island.
// The frame fades + scales in as it pins, holds, then fades + scales
// out as the user approaches the next section — no hard boundaries.
"use client";

import { useRef, useEffect } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

const VIDEO_SRC = "/video/orbit.mp4";
const POSTER = "/images/hero-lifestyle.png";
const SECTION_VH = 200;

export function ShoeScrollCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scrub progress 0..1 → video currentTime
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const smoothedProgress = useSpring(progress, { stiffness: 220, damping: 36, mass: 0.6 });

  // Frame entrance/exit: in over the first 12% of the section, out over the last 12%
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [40, 0, 0, -40]);

  // RAF-throttled seek: write currentTime at most once per frame.
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const pendingProgress = useMotionValue(0);

  useMotionValueEvent(smoothedProgress, "change", (v) => {
    pendingProgress.set(v);
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const v0 = videoRef.current;
      if (!v0 || !v0.duration || !isFinite(v0.duration)) return;
      const target = pendingProgress.get() * v0.duration;
      if (Math.abs(v0.currentTime - target) > 0.005) {
        v0.currentTime = target;
        lastTime.current = target;
      }
    });
  });

  // Slow idle drift: while the user is NOT actively scrolling, nudge the
  // video forward by a small delta per frame. Suppressed during scroll
  // (the scroll-driven seek takes over) so they don't fight.
  const isScrolling = useRef(false);
  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      isScrolling.current = true;
      window.clearTimeout((onScroll as any)._t);
      (onScroll as any)._t = window.setTimeout(() => {
        isScrolling.current = false;
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout((onScroll as any)._t);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const v0 = videoRef.current;
    if (!v0) return;
    let mounted = true;
    let last = performance.now();
    const tick = (now: number) => {
      if (!mounted) return;
      const dt = (now - last) / 1000;
      last = now;
      if (!isScrolling.current && v0.duration && isFinite(v0.duration)) {
        v0.currentTime = Math.min(v0.duration, v0.currentTime + dt * 0.06);
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      cancelAnimationFrame(id);
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      aria-label="Orbit"
      className="relative bg-ink-0"
      style={{ height: `${SECTION_VH}dvh` }}
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center px-4 md:px-10">
        <motion.div
          style={reduce ? undefined : { opacity, scale, y }}
          className="relative aspect-video w-full max-w-[1280px] will-change-transform"
        >
          {/* Frame */}
          <div className="relative aspect-video w-full overflow-hidden rounded-card border border-ink-3 bg-ink-1 shadow-[0_0_120px_-20px_rgba(215,255,30,0.18)]">
            {reduce ? (
              <img
                src={POSTER}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={POSTER}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Subtle vignette inside the frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 55%, transparent 50%, rgba(10,10,11,0.5) 100%)",
              }}
            />

            {/* Frame chrome */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4 md:p-6">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-2">
                <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
                <span>Run log / Orbit 01</span>
              </div>
              <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3 md:block">
                Scroll to rotate
              </div>
            </div>
          </div>

          {/* Feather: bleeds the page bg into the frame edges from outside */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-12 -inset-y-10 z-20"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 55%, var(--color-ink-0) 100%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
