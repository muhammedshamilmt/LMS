"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const childVars: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200
      }
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#050505] flex items-center justify-center overflow-hidden font-sans">

      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 opacity-[0.07] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500 opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto w-full"
      >
        <motion.div variants={childVars} className="flex items-center justify-center gap-2 mb-6 text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Compass className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Off the Path</span>
        </motion.div>

        {/* Big 404 */}
        <motion.div variants={childVars} className="relative mb-8">
          <motion.h1
            initial="initial"
            whileHover="hover"
            className="flex justify-center text-[180px] sm:text-[250px] md:text-[300px] lg:text-[400px] leading-none text-white tracking-[10px] drop-shadow-2xl mix-blend-overlay opacity-90 select-none cursor-default font-black"
          >
            {"404".split("").map((char, i) => (
              <span key={i} className="relative overflow-hidden inline-flex">
                <motion.span
                  className="inline-block"
                  variants={{ initial: { y: 0 }, hover: { y: "-100%" } }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char}
                </motion.span>
                <motion.span
                  className="absolute inset-0 inline-block"
                  variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
        </motion.div>

        <motion.div variants={childVars} className="relative z-20 -mt-12 sm:-mt-16 md:-mt-24 mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Page Not Found
          </h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-lg mx-auto font-medium leading-relaxed">
            The page you are looking for has been moved, removed, or never existed in the first place.
          </p>
        </motion.div>

        <motion.div variants={childVars} className="flex flex-col sm:flex-row items-center gap-4 relative z-20 w-full sm:w-auto">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full group relative flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold overflow-hidden hover:scale-[1.02] transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="absolute inset-0 bg-gradient-to-r from-white via-[#f0f0f0] to-white" />
              <Home className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Return to Home</span>
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-white/[0.03] text-white hover:bg-white/[0.08] px-8 py-4 rounded-2xl font-bold border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}
