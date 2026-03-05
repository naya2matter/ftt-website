import PayGrowthHeroSection from "@/app/components/sections/pay-growth/PayGrowthHeroSection";
import PayGrowthCTASection from "@/app/components/sections/pay-growth/PayGrowthCTASection";



export default function PayGrowth() {
  return (
    <main className="min-h-screen bg-[#E8E8E0] dark:bg-slate-900 w-full pt-20">
      <PayGrowthHeroSection />
      <PayGrowthCTASection />
    </main>
  );
}
