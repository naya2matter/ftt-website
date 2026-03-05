import RequirementsCTASection from "../../sections/requirements/RequirementsCTASection";
import RequirementsHeroSection from "../../sections/requirements/RequirementsHeroSection";

export default function Requirements() {
    return (
        <>
            <main className=" bg-[#E8E8E0] dark:bg-slate-900 w-full pt-20">
                <RequirementsHeroSection />
                <RequirementsCTASection />
            </main>
        </>
    )}