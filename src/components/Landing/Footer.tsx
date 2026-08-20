"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion } from "framer-motion";

const RollingText = ({ text, isHovered, className = "" }: { text: string; isHovered: boolean; className?: string }) => {
  return (
    <div className={`relative overflow-hidden flex ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.01
          }}
          className="relative block whitespace-pre"
        >
          {char}
          <span className="absolute top-full left-0">{char}</span>
        </motion.span>
      ))}
    </div>
  );
};

const AnimatedButton = ({ text, className }: { text: string; className: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RollingText text={text} isHovered={isHovered} />
    </button>
  );
};

export function Footer() {
  return (
    <footer className="relative w-full min-h-[600px] flex items-end justify-center overflow-hidden bg-black pb-8 pt-40 z-40">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assests/herobg.png"
          alt="Abstract Footer Background"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        {/* Top gradient to blend with the page above */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent" />
        {/* Bottom gradient to fade into pure black at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* ── Footer Content ── */}
      <div className="relative z-10 w-full px-8 md:px-16 xl:px-16 flex flex-col justify-between h-full pt-20 mx-auto">

        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">

          {/* Left Side: Brand & Buttons */}
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl font-medium text-white tracking-tight">
                  Scale, Teach, Thrive
                </h2>
              </ScrollReveal>
            </div>

            <div className="flex items-center gap-4">
              <AnimatedButton 
                text="Get started" 
                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
              />
              <AnimatedButton 
                text="Our features" 
                className="rounded-full border border-white/20 bg-white/[0.03] px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 active:scale-95"
              />
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="flex flex-wrap gap-16 md:gap-24">

            <div className="flex flex-col gap-5">
              <h4 className="text-white font-semibold text-[15px]">Product</h4>
              <nav className="flex flex-col gap-3">
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Course Builder</Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Sales Automation</Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Integrations</Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
              </nav>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="text-white font-semibold text-[15px]">Legal</h4>
              <nav className="flex flex-col gap-3">
                <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/cookie-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
                <Link href="/return-policy" className="text-sm text-gray-400 hover:text-white transition-colors">Return Policy</Link>
              </nav>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="text-white font-semibold text-[15px]">Connect</h4>
              <nav className="flex flex-col gap-3">
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter</Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">LinkedIn</Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">YouTube</Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Instagram</Link>
              </nav>
            </div>

          </div>
        </div>

        {/* ── Footer Bottom Copyright ── */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium mb-12">
          <p>© HG Healing 2026</p>
          <p className="hidden md:block">© HG HEALING 2026</p>
        </div>

        {/* ── Bottom Giant Text ── */}
        <div className="w-full flex justify-center items-end mt-auto overflow-hidden pointer-events-none -mb-12">
          <ScrollReveal delay={0.2} yOffset={40}>
            <h1 className="text-[clamp(4rem,15vw,18rem)] pb-6 pr-4 font-semibold text-transparent bg-clip-text bg-gradient-to-t from-blue-950 via-blue-800 to-blue-200 leading-none tracking-[-15px] select-none whitespace-nowrap">
              Inner Healing
            </h1>
          </ScrollReveal>
        </div>

      </div>
    </footer>
  );
}
