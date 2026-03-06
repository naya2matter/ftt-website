"use client";

import { motion, Variants } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import type { HomeTemptationSection } from "@/lib/services/home.types";

/* ------------------ Animations (TS-safe) ------------------ */

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageContainerVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const glowVariants: Variants = {
  initial: { opacity: 0.4, scale: 0.9 },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    scale: [0.9, 1.1, 0.9],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 16,
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -40, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

/* ------------------ Component ------------------ */

export default function PayGrowthHeroSection({ data }: { data?: HomeTemptationSection }) {
  const requirements = data?.requirements ?? [
    { text: "" },
    { text: "" },
    { text: "" },
  ];
  const imageUrl = data?.image ;
  const paragraphs = data?.description
    
  return (
    <section className="relative w-full overflow-hidden bg-[#E8E8E0] dark:bg-slate-900 py-16 md:py-20">
      <SectionContainer
        size="xl"
        noPaddingY
        className="relative overflow-hidden"
      >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          className="z-10"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.span
            variants={badgeVariants}
            className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded uppercase tracking-widest mb-4"
          >
            {data?.hook ?? "Amazon Freight Partner"}
          </motion.span>

          <motion.div variants={itemVariants}>
            {/* Heading */}
            <h1
              className="
                px-[2px]
                text-[2.1rem]
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                uppercase
                font-black
                leading-[1.12]
                tracking-tight
                text-slate-900
                dark:text-white
                mb-6
                break-words
              "
            >
              {data?.title ?? (
                <>
                  Pay &amp; Growth:
                  <br />
                  <span className="text-primary block">Performance-Based</span>
                  Rewards
                </>
              )}
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-xl space-y-4 mb-8"
          >
            {/* Paragraphs */}
            
              <p  className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                {paragraphs}
              </p>
            
            <motion.ul 
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            >
              {requirements.map((req, i) => (
                <motion.li key={i} variants={listItemVariants} className="flex items-start gap-2">
                  <motion.span 
                    className="material-symbols-outlined text-primary text-lg sm:text-xl mt-0.5 flex-shrink-0"
                    whileInView={{ scale: [0.5, 1.3, 1], rotateY: [0, 180, 360] }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                  >check_circle</motion.span>
                  {/* List Item Text */}
                  <span className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300">{req.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-all">
              {data?.button1_text }
            </button>
            {(data?.button2_text) && (
              <button className="border border-slate-300 hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/5 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-all">
                {data.button2_text}
              </button>
            )}
            {!data?.button2_text && (
              <button className="border border-slate-300 hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/5 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-all">
                View Openings
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="relative"
          variants={imageContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
          <img
            src={imageUrl}
            alt="Modern semi-truck on the highway during sunset"
            className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] rounded-xl object-cover border border-slate-200 dark:border-white/10 shadow-2xl"
          />
        </motion.div>
      </div>
      </SectionContainer>
    </section>
  );
}
