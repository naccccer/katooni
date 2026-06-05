import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[100dvh] bg-ink-0 pt-32">
      <div className="container-x flex flex-col items-start gap-6 py-24">
        <span className="eyebrow">404 / Off the route</span>
        <h1 className="text-display-lg font-display text-paper-1">
          This page is between kilometers.
        </h1>
        <p className="max-w-[44ch] text-base text-paper-2">
          The link you followed has been moved or never existed. Head back to
          the front door and we will point you somewhere useful.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-pill bg-volt-500 px-6 text-sm font-medium text-ink-0 transition-colors hover:bg-volt-600"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
