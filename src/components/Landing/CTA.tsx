"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { TextReveal } from "./TextReveal";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function CTASection() {
  return (
    <section className="relative flex min-h-[900px] w-full flex-col items-center justify-center bg-black px-6 py-32 text-center z-40 overflow-hidden">

      {/* ── Background Elements ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assests/map.png"
          alt="World Map Background"
          fill
          className="object-contain pointer-events-none "
          priority
          sizes="100vw"
        />
        {/* Soft blue glow for the theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">

        {/* ── Content ── */}
        <TextReveal
          text="Ready to Scale\nYour Courses?"
          className="mb-10 text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-white text-center"
        />

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <AnimatedButton 
              text="Get started"
              className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 active:scale-95"
            />
            <AnimatedButton 
              text="See how it works"
              className="group flex items-center gap-3 text-sm font-medium outline-1 rounded-full pr-3 px-1 py-1 outline-white/20 text-white/70 transition-colors hover:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                <Play className="h-4 w-4 fill-current" />
              </div>
            </AnimatedButton>
          </div>
        </ScrollReveal>

        {/* ── Empty Spacer (Keeps Top Elements Pushed Up) ── */}
        <div className="relative mt-20 w-full perspective-1000 hidden md:block">
          <motion.div
            initial={{ opacity: 0, rotateX: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, rotateX: 45, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative h-[400px] w-full origin-center"
          >
          </motion.div>
        </div>

        {/* ── Footer Info ── */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 flex items-center justify-center gap-2 text-[1rem] text-white/40 font-medium">
            <span>Join thousands who are</span>
            <span className="text-white/90">already scaling with HG HEALING</span>
          </div>
        </ScrollReveal>

      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
