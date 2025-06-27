import HeroLanding from "@/components/hero-landing";
import FeaturesSection from "@/components/features-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7faff] relative px-2 sm:px-0">
      <HeroLanding />
      <FeaturesSection />
    </main>
  );
}
