import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fa", "en"] as const,
  defaultLocale: "fa",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const RTL_LOCALES: ReadonlyArray<Locale> = ["fa"];
export function isRtl(locale: string): boolean {
  return (RTL_LOCALES as ReadonlyArray<string>).includes(locale);
}
