import PayGrowthHeroSection from "@/app/components/sections/pay-growth/PayGrowthHeroSection";
import PayGrowthCTASection from "@/app/components/sections/pay-growth/PayGrowthCTASection";
import type { HomeTemptationSection, HomeCTA } from "@/lib/services/home.types";

type Props = { temptationSection?: HomeTemptationSection; cta?: HomeCTA };

export default function PayGrowth({ temptationSection, cta }: Props) {
  return (
    <main className="min-h-screen bg-[#E8E8E0] dark:bg-slate-900 w-full pt-20">
      <PayGrowthHeroSection data={temptationSection} />
      <PayGrowthCTASection cta={cta} />
    </main>
  );
}
