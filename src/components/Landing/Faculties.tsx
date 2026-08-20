"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const FACULTIES = [
  {
    id: 1,
    title: "Expert Instructors",
    description: "Learn from certified therapists and spiritual guides with decades of experience.",
    image: "/assests/course_1.jpg"
  },
  {
    id: 2,
    title: "Guided Mentorship",
    description: "Guiding you through practical frameworks and emotional healing journeys.",
    image: "/assests/course_2.jpg"
  },
  {
    id: 3,
    title: "Community Leaders",
    description: "Building supportive communities and deep human connections.",
    image: "/assests/course_3.jpg"
  }
];

export function Faculties() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Custom cursor tracking
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const cursorX = useSpring(mX, { damping: 25, stiffness: 150 });
  const cursorY = useSpring(mY, { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mX.set(e.clientX - rect.left);
    mY.set(e.clientY - rect.top);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.children[0].clientWidth + 24; // Card width + gap
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < FACULTIES.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const newIndex = Math.min(activeIndex + 1, FACULTIES.length - 1);
      const cardWidth = scrollRef.current.children[0].clientWidth + 24;
      scrollRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(activeIndex - 1, 0);
      const cardWidth = scrollRef.current.children[0].clientWidth + 24;
      scrollRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-black z-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <h2 className="text-4xl md:text-[3.5rem] font-medium tracking-tight text-white max-w-xl leading-[1.1]">
            Built for learners<br />in the modern era
          </h2>
          <p className="text-gray-400 max-w-md text-sm md:text-[15px] leading-relaxed lg:mt-4">
            HG Healing is built for user trust, whether you're a professional seeking continuous education, a hobbyist learning in your spare time, or anyone in between.
          </p>
        </div>
      </div>

      {/* ── Carousel Container ── */}
      <div
        ref={containerRef}
        className="w-full relative cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        data-cursor="hide"
      >
        <motion.div
          className="pointer-events-none z-50 flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-2xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.5,
          }}
          style={{
            x: "-50%",
            y: "-50%",
            position: "absolute",
            left: cursorX,
            top: cursorY,
          }}
        >
          {isPlaying ? (
            <>
              <div className="flex gap-1">
                <div className="w-[3px] h-3 bg-black" />
                <div className="w-[3px] h-3 bg-black" />
              </div>
              <span className="text-black font-medium text-sm tracking-tight whitespace-nowrap">
                Pause video
              </span>
            </>
          ) : (
            <>
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1" />
              <span className="text-black font-medium text-sm tracking-tight whitespace-nowrap">
                Watch case
              </span>
            </>
          )}
        </motion.div>

        {/* CSS Grid hack to align the left side of the carousel perfectly with the header padding, while letting the right side overflow to the screen edge. */}
        <div className="grid" style={{ gridTemplateColumns: 'minmax(1.5rem, 1fr) minmax(auto, 80rem) minmax(1.5rem, 1fr)' }}>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="col-start-2 col-end-4 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden pr-[10vw]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {FACULTIES.map((faculty, idx) => (
              <div
                key={idx}
                className="relative w-[85vw] md:w-[65vw] lg:w-[45vw] xl:w-[40vw] h-[400px]  shrink-0 snap-start rounded-[2rem] overflow-hidden group bg-[#111]"
              >
                <Image
                  src={faculty.image}
                  alt={faculty.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Footer of Carousel ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-white font-medium text-lg">{FACULTIES[activeIndex].title}</h4>
            <p className="text-gray-400 text-sm mt-1">{FACULTIES[activeIndex].description}</p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center px-1.5 py-1 bg-white/10 rounded-full gap-3">
            <button
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={activeIndex === FACULTIES.length - 1}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
