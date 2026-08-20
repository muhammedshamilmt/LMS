"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { TextReveal } from "./TextReveal";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const ROW_1 = [
  "google-campaign-manager.svg",
  "pandas.svg",
  "numpy.svg",
  "linear.svg",
  "langchain.svg",
  "inkscape.svg",
  "gimp.svg",
  "obsidian.svg",
  "leetcode.svg",
  "photopea.svg"
];

const ROW_2 = [
  "google-antigravity.svg",
  "google-vids.svg",
  "google-search-console.svg",
  "chrome-web-store.svg",
  "google-lens.svg",
  "google-play-console.svg",
  "firebase-studio.svg",
  "google-gemma-ai.svg",
  "google-colab.svg"
];

export function Subjects() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden flex flex-col items-center justify-center z-10">

      {/* ── Header ── */}
      <div className="relative z-20 flex flex-col items-center text-center mb-16 px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 mt-10 py-2 rounded-full border border-white/10 bg-[#080808]/50 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <Badge className="h-5 w-5 fill-amber-200" />
          <span className="text-sm font-medium text-gray-300">Powerfull Subjects in the current era</span>
        </motion.div>

        <TextReveal
          text="Master Every Subject\nIn One Place"
          className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white max-w-2xl leading-tight"
          delay={0.1}
        />
      </div>

      {/* ── Giant Sphere & Icons Container ── */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[400px] mb-12">

        {/* The 3D Sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none">
          {/* Outer glow */}
          {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-orange-500 opacity-20 blur-[100px]" /> */}
          {/* Globe Image with slow rotation */}
          <div className="absolute inset-0 animate-spin-speed">
            <Image
              src="/assests/glob.png"
              alt="Global Curriculum"
              fill
              className="object-contain "
            />
          </div>
        </div>

        {/* Icons Rows */}
        <div className="relative z-20 w-full flex flex-col gap-6 items-center justify-center mt-12 md:mt-24 px-4">

          {/* Row 1 */}
          <div className="flex gap-4 md:gap-6 w-max animate-marquee-slow">
            {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((iconName, idx) => (
              <div
                key={`r1-${idx}`}
                className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-[1.5rem] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 hover:bg-white/10 cursor-pointer"
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8">
                  <Image
                    src={`/assests/icons/${iconName}`}
                    alt={iconName}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-4 md:gap-6 w-max animate-marquee-slow-reverse ml-[-100px]">
            {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((iconName, idx) => (
              <div
                key={`r2-${idx}`}
                className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-[1.5rem] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 hover:bg-white/10 cursor-pointer"
              >
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <Image
                    src={`/assests/icons/${iconName}`}
                    alt={iconName}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── CTA Button ── */}
      <div className="relative z-20 mt-8">
        <AnimatedButton 
          text="Explore All"
          className="px-8 py-3 rounded-full border border-white/20 bg-black hover:bg-white/5 text-white font-medium text-sm transition-colors shadow-xl"
        />
      </div>

      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-slow-reverse {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
        .animate-marquee-slow-reverse {
          animation: marquee-slow-reverse 40s linear infinite;
        }
        .animate-marquee-slow:hover, .animate-marquee-slow-reverse:hover {
          animation-play-state: paused;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-speed {
          animation: spin-slow 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
