import BenefitsCTASection from "../../sections/benefits/BenefitsCTASection";
import BenefitsHeroSection from "../../sections/benefits/BenefitsHeroSection";
import type { HomeBenefitsSection, HomeCTA } from "@/lib/services/home.types";

type Props = { benefitsSection?: HomeBenefitsSection; cta?: HomeCTA };

export default function Benefits({ benefitsSection, cta }: Props) {
  return (
    <>
      <main className="min-h-screen bg-[#E8E8E0] dark:bg-slate-900 w-full pt-20">
        <BenefitsHeroSection data={benefitsSection} />
        <BenefitsCTASection cta={cta} />
      </main>
    
    </>
  );
}