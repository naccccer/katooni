// Library: motion/react only. Scroll-scrubbed video: as the user scrolls
// through the section, the video's currentTime advances from 0 to duration.
// The video element is sticky; the surrounding section is 300dvh tall.
"use client";

import { useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";

const VIDEO_SRC = "/video/orbit.mp4";
const POSTER = "/images/hero-lifestyle.png";
const SECTION_VH = 300; // total scroll distance for the section

export function ShoeScrollCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Throttle the time value to 0..1 progress
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const v0 = videoRef.current;
    if (!v0 || !v0.duration || !isFinite(v0.duration)) return;
    const target = v * v0.duration;
    // Avoid no-op writes that can stutter on some browsers
    if (Math.abs(v0.currentTime - target) > 0.01) {
      v0.currentTime = target;
    }
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Orbit"
      className="relative bg-ink-0"
      style={{ height: `${SECTION_VH}dvh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
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

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-0/40 via-transparent to-ink-0/60"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 md:p-10">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-2">
            <span className="h-1.5 w-1.5 rounded-full bg-volt-500" />
            <span>Run log / Orbit 01</span>
          </div>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-paper-3 md:block">
            Scroll to rotate
          </div>
        </div>
      </div>
    </section>
  );
}
