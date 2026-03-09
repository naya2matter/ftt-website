import OwnerMessageSection from "../../sections/owner-message/OwnerMessageSection";
import type { HomeFounderSection } from "@/lib/services/home.types";

type Props = { founderSection?: HomeFounderSection };

export default function OwnerMessage({ founderSection }: Props) {
  return (
    <div className="relative flex w-full flex-col bg-[#E8E8E0] dark:bg-slate-900 pt-20">
      <main>
        <OwnerMessageSection data={founderSection} />
      </main>
    </div>
  );
}
