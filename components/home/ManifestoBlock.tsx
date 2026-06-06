// Library: motion/react only.
"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";

export function ManifestoBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const t = useTranslations("manifesto");
  const locale = useLocale();
  const lines = t.raw("lines") as string[];

  return (
    <section
      ref={ref}
      aria-label="Manifesto"
      className="relative bg-ink-0 py-24 md:py-40"
    >
      <Container className="max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <p className="eyebrow mb-10 text-paper-3">{t("eyebrow")}</p>
            <h2 className="text-display-lg font-display text-paper-1">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  {reduce ? (
                    <span>{line}</span>
                  ) : (
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.08,
                      }}
                    >
                      {line}
                    </motion.span>
                  )}
                </span>
              ))}
            </h2>

            <div className="mt-16 flex flex-wrap items-center gap-4">
              <Button href={`/${locale}/store`} size="lg">
                {t("cta")}
                <ArrowUpRight size={18} weight="bold" />
              </Button>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper-3">
                Run log v0.4.0 - Updated 02.06.26
              </span>
            </div>
          </div>

          <div className="hidden md:col-span-4 md:flex md:items-end">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-ink-3 bg-ink-1">
              <img
                src="/images/editorial-runner.png"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
