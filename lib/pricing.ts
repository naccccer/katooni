// Fixed USD -> Toman conversion for the storefront.
// Stored product prices are USD. Display always shows Toman.

export const USD_TO_TOMAN = 50_000; // 1 USD = 50,000 toman (rounded illustrative rate)
export const TOMAN_SUFFIX_FA = "تومان";
export const TOMAN_SUFFIX_EN = "toman";

export function usdToToman(usd: number): number {
  return Math.round(usd * USD_TO_TOMAN);
}

export function formatPrice(usd: number, locale: string): string {
  const toman = usdToToman(usd);
  const isFa = locale === "fa";
  // fa-IR formats with Persian digits; en-US with Western digits
  const intlLocale = isFa ? "fa-IR" : "en-US";
  const number = new Intl.NumberFormat(intlLocale, {
    useGrouping: true,
    maximumFractionDigits: 0,
  }).format(toman);
  const suffix = isFa ? ` ${TOMAN_SUFFIX_FA}` : ` ${TOMAN_SUFFIX_EN}`;
  return `${number}${suffix}`;
}
