// Server shell. Composition only.
import { Container } from "@/components/primitives/Container";
import { HeroCopy } from "./HeroCopy";
import { HeroVisual } from "./HeroVisual";

export function HeroKinetic() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100dvh] overflow-hidden bg-ink-0 pt-24 md:pt-24"
    >
      <Container className="relative grid min-h-[calc(100dvh-72px)] grid-cols-1 items-center gap-10 py-16 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5 md:col-start-1">
          <HeroCopy />
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
