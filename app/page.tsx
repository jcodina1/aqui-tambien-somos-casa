import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ValuePillars } from "@/components/ValuePillars";
import { StatsSection } from "@/components/StatsSection";
import { StoryGallery } from "@/components/StoryGallery";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValuePillars />
        <StatsSection />
        <StoryGallery />
        <ProductShowcase />
      </main>
      <Footer />
    </>
  );
}
