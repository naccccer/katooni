// Library: motion/react only. Never coexists with gsap in the same file.
"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  strength?: number;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.25,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  if (reduce) {
    if (href) {
      return (
        <Link
          href={href}
          className={cn("inline-block", className)}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn("inline-block", className)}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }

  const inner = (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="inline-block"
      >
        <Link
          href={href}
          className={cn("inline-block", className)}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          aria-label={ariaLabel}
        >
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <button
        className={cn("inline-block", className)}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        aria-label={ariaLabel}
      >
        {inner}
      </button>
    </div>
  );
}
