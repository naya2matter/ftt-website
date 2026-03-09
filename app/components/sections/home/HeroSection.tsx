"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { HomeHeroSection } from "@/lib/services/home.types";
import SectionContainer from "@/app/components/layout/SectionContainer";

type Props = { data?: HomeHeroSection };

// Animation variants for staggered content reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function HeroSection({ data }: Props) {
  const bgImage = data?.media?.[0]?.url ;
  const paragraphs = data?.description_html
    ? data.description_html.split(/\r?\n\r?\n/).filter(Boolean)
    : [ ];
  return (
    <main className="relative flex min-h-screen w-full items-center pt-30 pb-10">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-white/50 dark:from-charcoal dark:via-charcoal/70 dark:to-charcoal/40 z-10"></div>
        <div
          className="h-full w-full bg-cover bg-center"
        >
          <img
            src={bgImage}
            alt="Hero Background"
            className="h-full w-full object-cover object-center opacity-80"
          />
        </div>
      </div>

      {/* Content Container */}
      <SectionContainer
        size="xl"
        noPaddingY
        className="relative z-20 bg-[#FFFFFF33] dark:bg-[#1A1A1A80] rounded-[25px] backdrop-blur-sm w-full min-w-[340px] max-w-[1300px] lg:w-[935px] lg:h-[611px] pt-[35px] gap-[18px] "
      >
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2 ">
            <span className="h-0.5 w-12 bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {data?.subheader }
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-sragen text-4xl font-bold leading-[110%] tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl uppercase align-middle dark:drop-shadow-[0_0_20px_rgba(235,25,32,0.2)]"
          >
            {data?.title}
          </motion.h1>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="mb-10 max-w-3xl text-base sm:text-lg md:text-xl font-medium leading-[110%] align-middle text-slate-900 dark:text-slate-300"
          >
            
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8  }}
              >
                {paragraphs}
              </motion.p>
            
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href={data?.button1_link ?? ""}
              className="flex min-w-40 sm:min-w-50 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 sm:px-7 sm:py-4 md:px-8 md:py-5 text-base sm:text-lg font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(235,25,32,0.2)] dark:shadow-[0_0_30px_rgba(235,25,32,0.4)]"
            >
              {data?.button1_text }
              <span className="material-symbols-outlined">trending_flat</span>
            </Link>
          </motion.div>

          
        </motion.div>
      </SectionContainer>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-white/30"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 1,
          ease: [0.25, 0.1, 0.25, 1] as const,
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
          Explore
        </span>
        <motion.span
          className="material-symbols-outlined"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1] as const,
          }}
        >
          keyboard_double_arrow_down
        </motion.span>
      </motion.div>
    </main>
  );
}
