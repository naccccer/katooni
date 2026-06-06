import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-ink-0">
      <img
        src="/images/404.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-0 via-ink-0/40 to-transparent" />
      <div className="container-x relative z-10 flex min-h-[100dvh] flex-col items-start justify-end gap-6 pb-24 pt-32">
        <span className="eyebrow text-paper-3">{t("eyebrow")}</span>
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
