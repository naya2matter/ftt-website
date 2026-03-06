"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionContainer from "@/app/components/layout/SectionContainer";
import VideoPlayer from "@/app/components/common/VideoPlayer";
import type { HomeTestimonialsSection } from "@/lib/services/home.types";

const headerVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 16, rotate: -0.6 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function TestimonialsCarouselSection({ data }: { data?: HomeTestimonialsSection }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = (data?.testimonials ?? []).filter(t => t.is_active).length > 0
    ? data!.testimonials.filter(t => t.is_active).map(t => ({
        video: t.video?.url ?? "/Shawn.mp4",
        quote: t.text,
        name: t.name,
        role: t.position,
      }))
    : [
        { video: "/Shawn.mp4", quote: "First Team feels like family", name: "John D.", role: "Over-the-Road Driver, 1 Years" },
        { video: "/Shawn.mp4", quote: "First Team feels like family", name: "John D.", role: "Over-the-Road Driver, 2 Years" },
        { video: "/Shawn.mp4", quote: "First Team feels like family", name: "John D.", role: "Over-the-Road Driver, 3 Years" },
      ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth || 350;
      const gap = 24; // gap-6 = 24px
      const scrollAmount = cardWidth + gap;
      
      // Calculate next index with wrapping
      let nextIndex = activeIndex;
      if (direction === "right") {
        nextIndex = activeIndex >= testimonials.length - 1 ? 0 : activeIndex + 1;
      } else {
        nextIndex = activeIndex <= 0 ? testimonials.length - 1 : activeIndex - 1;
      }
      
      // Scroll to the calculated position
      scrollRef.current.scrollTo({
        left: nextIndex * scrollAmount,
        behavior: "smooth",
      });
      
      setActiveIndex(nextIndex);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(() => {
        const cardWidth = container.querySelector('div')?.offsetWidth || 350;
        const gap = 24;
        const index = Math.round(container.scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [testimonials.length]);

  return (
    <section className="relative w-full bg-[#E8E8E0] dark:bg-slate-900 py-16 md:py-20">
      <SectionContainer size="xl" noPaddingY>
        {/* Header Text */}
        <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">
            {data?.hook ?? "Our Drivers"}
          </h2>
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {data?.title ?? "What Our Drivers Say"}
          </h1>
          {/* Paragraph */}
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            {data?.description ?? "At First Team Trucking, we believe the best way to understand our company is to hear directly from the drivers who keep us moving."}
          </p>
        </div>

        {/* Navigation Controls - Always show on mobile, conditionally on desktop */}
        <div className={`flex gap-3 ${testimonials.length <= 3 ? 'lg:hidden' : ''}`}>
          <button
            onClick={() => scroll("left")}
            className="size-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary text-slate-800 dark:text-white transition-all group"
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined group-hover:text-white">
              arrow_back
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="size-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary text-slate-800 dark:text-white transition-all group"
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined group-hover:text-white">
              arrow_forward
            </span>
          </button>
        </div>
      </motion.div>

      {/* Video Testimonial Carousel */}
      <div
        ref={scrollRef}
        className={`flex ${testimonials.length <= 3 ? 'justify-center' : 'justify-start'} gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="flex-none w-full sm:w-[350px] md:w-[352px] snap-start group cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px", amount: 0.3 }}
            variants={cardVariants}
            animate={
              index === activeIndex
                ? { scale: 1, opacity: 1 }
                : { scale: 0.98, opacity: 0.85 }
            }
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <motion.div 
              className="relative aspect-16/10 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px", amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <VideoPlayer
                videoSrc={testimonial.video}
                title={`Testimonial from ${testimonial.name}`}
                showControls={true}
                className="w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <blockquote className="font-condensed text-2xl md:text-3xl font-bold uppercase italic text-slate-900 dark:text-white leading-none mb-3">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary"></div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {testimonial.name} • {testimonial.role}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      </SectionContainer>
    </section>
  );
}
