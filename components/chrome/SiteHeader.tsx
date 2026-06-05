// Library: motion/react only.
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";
import { LocaleSwitcher } from "./LocaleSwitcher";

type SiteHeaderProps = { locale: string };

export function SiteHeader({ locale }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { label: t("store"), href: `/${locale}/store` },
    { label: t("running"), href: `/${locale}/store?category=running` },
    { label: t("trail"), href: `/${locale}/store?category=trail` },
    { label: t("track"), href: `/${locale}/store?category=track` },
    { label: t("court"), href: `/${locale}/store?category=court` },
    { label: t("lifestyle"), href: `/${locale}/store?category=lifestyle` },
  ];

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(10,10,11,0.78)" : "rgba(10,10,11,0)",
          borderBottomColor: scrolled ? "rgba(31,31,36,1)" : "rgba(31,31,36,0)",
        }}
        transition={{ duration: reduce ? 0 : 0.25 }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-8">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 text-paper-1"
            aria-label="Katooni home"
          >
            <span className="font-display text-2xl font-extrabold tracking-tighter">
              Katooni
            </span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-volt-500 transition-transform group-hover:scale-150 sm:inline-block" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative px-3 py-2 text-sm text-paper-1 transition-colors hover:text-volt-500",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-volt-500 transition-transform duration-300 ease-out group-hover:scale-x-100",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LocaleSwitcher />
            </div>
            <Link
              href={`/${locale}/store`}
              className="hidden h-10 items-center justify-center rounded-pill border border-ink-3 px-4 text-sm text-paper-1 transition-colors hover:border-paper-2 hover:bg-ink-1 md:inline-flex"
            >
              {tCommon("findPair")}
            </Link>
            <button
              type="button"
              onClick={() => setOpenMobile(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-ink-3 text-paper-1 transition-colors hover:border-paper-2 hover:bg-ink-1 lg:hidden"
              aria-label={tCommon("openMenu")}
            >
              <span aria-hidden className="block">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      <MobileNav
        open={openMobile}
        onClose={() => setOpenMobile(false)}
        items={items}
        locale={locale}
      />
    </>
  );
}
