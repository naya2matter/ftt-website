import BenefitsCTASection from "../../sections/benefits/BenefitsCTASection";
import BenefitsHeroSection from "../../sections/benefits/BenefitsHeroSection";

export default function Benefits() {
  return (
    <>
      <main className="min-h-screen bg-[#E8E8E0] dark:bg-slate-900 w-full pt-20">
        <BenefitsHeroSection />
        <BenefitsCTASection />
      </main>
    
    </>
  );
}