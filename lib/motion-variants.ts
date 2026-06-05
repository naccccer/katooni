// Shared Motion variants and easings.
// Single source of truth for the page's motion language.

import type { Variants, Transition } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const baseTransition: Transition = {
  duration: 0.6,
  ease: EASE_OUT_EXPO,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

export const charRise: Variants = {
  hidden: { opacity: 0, y: "60%", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};
