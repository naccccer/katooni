import { Container } from "@/components/primitives/Container";

export default function StoreLoading() {
  return (
    <div>
      <div className="border-b border-ink-3">
        <Container className="py-10">
          <div className="h-3 w-24 animate-pulse rounded-pill bg-ink-2" />
          <div className="mt-3 h-10 w-64 animate-pulse rounded-pill bg-ink-2" />
        </Container>
      </div>
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-card border border-ink-3 bg-ink-1"
            >
              <div className="aspect-[4/5] w-full animate-pulse bg-ink-2" />
              <div className="space-y-2 p-4">
                <div className="h-2 w-12 animate-pulse rounded-pill bg-ink-2" />
                <div className="h-5 w-3/4 animate-pulse rounded-pill bg-ink-2" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
