import { HeroKinetic } from "@/components/home/HeroKinetic";
import { StorePreview } from "@/components/home/StorePreview";

export const metadata = {
  title: "Katooni — درباره ما",
};

export default function AboutPage() {
  return (
    <>
      <HeroKinetic />
      <StorePreview />
    </>
  );
}
