import RequirementsCTASection from "../../sections/requirements/RequirementsCTASection";
import RequirementsHeroSection from "../../sections/requirements/RequirementsHeroSection";
import type { HomeNeedsSection, HomeCTA } from "@/lib/services/home.types";

type Props = { needsSection?: HomeNeedsSection; cta?: HomeCTA };

export default function Requirements({ needsSection, cta }: Props) {
    return (
        <>
            <main className=" bg-[#E8E8E0] dark:bg-slate-900 w-full pt-20">
                <RequirementsHeroSection data={needsSection} />
                <RequirementsCTASection cta={cta} />
            </main>
        </>
    )}