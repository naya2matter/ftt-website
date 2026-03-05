import { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import GalleryHeroSection from "@/app/components/sections/gallery/GalleryHeroSection";
import GalleryGridSection from "@/app/components/sections/gallery/GalleryGridSection";
import GalleryActionBarSection from "@/app/components/sections/gallery/GalleryActionBarSection";
import GalleryFooterSection from "@/app/components/sections/gallery/GalleryFooterSection";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Life at FTT | First Team Trucking",
  description:
    "Explore life at First Team Trucking with highlights of our fleet, facilities, and team culture.",
};

export default function GalleryPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#E8E8E0] dark:bg-slate-900">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <GalleryHeroSection />
        <GalleryGridSection />
        {/* <GalleryActionBarSection /> */}

      </main>
      <Footer />
    </div>
  );
}
