// Library: GSAP only. Never coexists with motion/react in the same file.
"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap-config";

type PinnedSceneOptions = {
  scrub?: number | boolean;
  pinSpacing?: boolean;
  start?: string;
  end?: string;
  build: (
    gsapApi: ReturnType<typeof getGsap>["gsap"],
    ScrollTrigger: ReturnType<typeof getGsap>["ScrollTrigger"],
    container: HTMLDivElement,
  ) => void;
};

export function usePinnedScene(opts: PinnedSceneOptions) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      opts.build(gsap, ScrollTrigger, ref.current as HTMLDivElement);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
