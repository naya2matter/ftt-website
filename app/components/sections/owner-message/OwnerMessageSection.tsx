"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import VideoPlayer, { VideoPlayerRef } from "@/app/components/common/VideoPlayer";
import type { HomeFounderSection } from "@/lib/services/home.types";

// Animation variants for horizontal slide-in
const textBlockVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const videoBlockVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay: 0.2,
    },
  },
};

// Decorative blob animations
const blobVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

export default function OwnerMessageSection({ data }: { data?: HomeFounderSection }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoPlayerRef = useRef<VideoPlayerRef>(null);

  const videoSrc = data?.video?.url ?? "/Shawn.mp4";
  const paragraphs = data?.description
    ? data.description.split(/\r?\n\r?\n/).filter(Boolean)
    : [
        "At First Team Trucking, we believe drivers deserve more than just a paycheck, they deserve respect, opportunity, and a clear path to grow.",
        "Our pay structure is built to reward your performance with predictable, consistent earnings. You'll haul Amazon freight on set lanes, meaning no guesswork and no surprises.",
        "Whether you're new to Amazon lanes or an experienced CDL Class A driver, our team is committed to giving you the tools, training, and support you need to succeed. If you're willing to show up, stay safe, and take pride in your work, there's a place for you here.",
      ];

  const handleScrollToVideo = () => {
    // Scroll to video
    const videoElement = document.getElementById('owner-message-video');
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Toggle play/pause after a short delay to allow scroll
    setTimeout(() => {
      videoPlayerRef.current?.toggle();
    }, 500);
  };

  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900  overflow-hidden py-16 md:py-20 ">
      <SectionContainer size="xl" noPaddingY>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content: Text Block */}
          <motion.div
            className="flex flex-col space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textBlockVariants}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit">
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                {data?.hook_text ?? "Meet Our Founder"}
              </span>
            </div>
            {/* Heading */}
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              {data?.title ?? "A Message from the Owner:"}
            </h2>
            <motion.div 
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
            >
              {/* Paragraphs */}
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-slate-600 dark:text-white/90 text-base sm:text-lg font-normal leading-relaxed"
                  initial={{ opacity: 0, y: 20, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                  style={{ transformPerspective: 1000 }}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleScrollToVideo}
                className="group flex items-center justify-center gap-3 min-w-50 h-14 rounded-lg bg-primary text-white text-lg font-bold transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 p-5 cursor-pointer"
              >
                <span className="material-symbols-outlined">play_circle</span>
                <span>Watch Shawn&apos;s Message</span>
              </button>
            </div>
          </motion.div>

          {/* Right Content: Video Player */}
          <motion.div
            id="owner-message-video"
            className="relative group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={videoBlockVariants}
          >
            {/* Decorative Background Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
              variants={blobVariants}
              animate="animate"
            ></motion.div>
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
              variants={blobVariants}
              animate="animate"
              transition={{ delay: 1 }}
            ></motion.div>

            {/* Video Container */}
            <VideoPlayer
              ref={videoPlayerRef}
              videoSrc={videoSrc}
              title="A Message from Shawn, Owner"
              showControls={true}
              onPlayStateChange={setIsVideoPlaying}
            />
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
