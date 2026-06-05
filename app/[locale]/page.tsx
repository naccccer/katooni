import { HeroKinetic } from "@/components/home/HeroKinetic";
import { MarqueeDrop } from "@/components/home/MarqueeDrop";
import { FeaturedDrop } from "@/components/home/FeaturedDrop";
import { ShoeScrollCinematic } from "@/components/home/ShoeScrollCinematic";
import { BrandPillars } from "@/components/home/BrandPillars";
import { StorePreview } from "@/components/home/StorePreview";
import { ManifestoBlock } from "@/components/home/ManifestoBlock";

export default function HomePage() {
  return (
    <>
      <HeroKinetic />
      <MarqueeDrop />
      <FeaturedDrop />
      <ShoeScrollCinematic />
      <BrandPillars />
      <StorePreview />
      <ManifestoBlock />
    </>
  );
}
