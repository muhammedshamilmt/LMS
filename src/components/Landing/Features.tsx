"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";

export function Features() {
  const features = [
    {
      title: "Expert-Led Curriculum",
      description: "Learn from certified therapists and spiritual guides with decades of experience in emotional healing.",
      image: "/assests/feature_expert.jpg",
    },
    {
      title: "Self-Paced Learning",
      description: "Access high-quality video modules, workbooks, and meditations anytime, anywhere, at your own pace.",
      image: "/assests/feature_paced.jpg",
    },
    {
      title: "Supportive Community",
      description: "You are never alone. Join our private community to share your journey and grow alongside fellow students.",
      image: "/assests/feature_community.jpg",
    }
  ];

  return (
    <section className="w-full py-32 relative flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-xs font-medium text-gray-300">Core Benefits</span>
      </div>

      {/* Header */}
      <TextReveal 
        text="Everything you need to transform your life from the inside out."
        className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-16 text-center max-w-4xl leading-tight"
        delay={0.1}
      />

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
        }}
      >
        {features.map((feature, i) => (
          <motion.div 
            key={i} 
            className="flex flex-col gap-6 group cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
          >
            <div className="w-full aspect-[4/3.7] rounded-3xl bg-[#080808] border border-white/10 overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none mix-blend-overlay" />
            </div>
            <div className="px-2">
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
