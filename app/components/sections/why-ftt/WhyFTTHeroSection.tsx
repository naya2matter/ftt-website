"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import type { HomeWhyUsSection } from "@/lib/services/home.types";

const titleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const dividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.9,
      delay: 0.3,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 50,
    scale: 0.9,
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 12,
      delay: 0.2,
    },
  },
};

export default function WhyFTTHeroSection({ data }: { data?: HomeWhyUsSection }) {
  const features = data?.items && data.items.length > 0
    ? data.items
    : [];

  return (
    <section className="relative w-full overflow-hidden bg-[#E8E8E0] dark:bg-slate-900  mt-5">
      <SectionContainer size="xl" noPaddingY>
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <motion.h1
            className="font-brand text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={titleVariants}
          >
            Why <span className="text-primary">First Team</span> Trucking
          </motion.h1>
          <motion.div
            className="w-24 h-1.5 bg-primary mx-auto rounded-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once:true, margin:"-100px"}}
            variants={dividerVariants}
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              className="group relative bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
            >
              <motion.div
                className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={iconVariants}
              >
                {feature.icon.startsWith("http") || feature.icon.startsWith("/") ? (
                  <img
                    src={feature.icon}
                    alt={feature.name}
                    className="w-8 h-8 object-contain"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <span className="material-symbols-outlined text-3xl">
                    {feature.icon}
                  </span>
                )}
              </motion.div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {feature.name}
              </p>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
      </SectionContainer>
    </section>
  );
}
