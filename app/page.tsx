import { Hero } from "@/components/landingPage/Hero";

import { SecondaryToolsSection } from "@/components/landingPage/SecondaryToolsSection";
import { FinalCtaSection } from "@/components/landingPage/FinalCtaSection";
import { LandingFooter } from "@/components/landingPage/LandingFooter";
import { HowItWorks } from "@/components/landingPage/HowItWorks";
import FeatureSection from "@/components/landingPage/FeatureSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Hero />
      <HowItWorks />
      <FeatureSection />
      <SecondaryToolsSection />
      <FinalCtaSection />
      <LandingFooter />
    </div>
  );
}
