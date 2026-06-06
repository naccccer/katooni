// Library: motion/react only. Never coexists with gsap in the same file.
"use client";

import { motion, useReducedMotion } from "motion/react";
import { charRise, stagger as staggerVariant } from "@/lib/motion-variants";

type SplitRevealProps = {
  text: string;
  className?: string;
  mode?: "char" | "word";
  delayChildren?: number;
  staggerChildren?: number;
};

export function SplitReveal({
  text,
  className,
  mode = "word",
  delayChildren = 0,
  staggerChildren = mode === "char" ? 0.018 : 0.08,
}: SplitRevealProps) {
  const reduce = useReducedMotion();
  const tokens = mode === "char" ? Array.from(text) : text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      variants={staggerVariant(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {tokens.map((t, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span variants={charRise} className="inline-block">
            {t === " " ? " " : t}
            {mode === "word" && i < tokens.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
