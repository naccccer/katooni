// Library: motion/react only. Never coexists with gsap in the same file.
"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type KineticMarqueeProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number; // seconds
  pauseOnHover?: boolean;
};

export function KineticMarquee({
  children,
  className,
  duration = 28,
  pauseOnHover = true,
}: KineticMarqueeProps) {
  const reduce = useReducedMotion();
  // Tripled to allow seamless loop
  const items = (
    <>
      {children}
      {children}
      {children}
    </>
  );

  if (reduce) {
    return (
      <div className={cn("overflow-hidden whitespace-nowrap", className)}>
        <div className="inline-flex items-center gap-12">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden whitespace-nowrap",
        pauseOnHover && "hover:[&_*]:[animation-play-state:paused]",
        className,
      )}
    >
      <motion.div
        className="inline-flex items-center gap-12 will-change-transform"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items}
      </motion.div>
    </div>
  );
}
