"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function DashboardPlaceholder() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 20%"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <div ref={containerRef} className="w-full h-full max-w-6xl mx-auto px-6 flex items-start justify-center pt-10">
      <motion.div
        style={{ scale, opacity }}
        className="w-full aspect-[16/10] rounded-3xl p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent relative shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        <div className="w-full h-full bg-[#050505]/80 rounded-[23px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle top glow inside dashboard */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[150px] bg-blue-500/20 blur-[60px] pointer-events-none z-20" />

          {/* Dashboard Image */}
          <div className="w-full h-full relative z-10">
            <Image
              src="/assests/img.png"
              alt="Dashboard"
              fill
              className="object-cover rounded-[23px]"
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
