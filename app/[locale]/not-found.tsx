import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="min-h-[100dvh] bg-ink-0 pt-32">
      <div className="container-x flex flex-col items-start gap-6 py-24">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1 className="text-display-lg font-display text-paper-1">
          {t("title")}
        </h1>
        <p className="max-w-[44ch] text-base text-paper-2">
          {t("body")}
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-pill bg-volt-500 px-6 text-sm font-medium text-ink-0 transition-colors hover:bg-volt-600"
        >
          {t("back")}
        </Link>
      </div>
    </section>
  );
}
