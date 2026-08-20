"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";
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

const tools = [
  {
    id: "guided-meditations",
    title: "Guided Meditations",
    description: "Access a library of soothing meditations to help you find peace and balance in your daily life.",
    image: "/assests/img.png",
  },
  {
    id: "mood-tracking",
    title: "Mood Tracking",
    description: "Log your daily emotions and track your healing progress over time with intuitive visual insights.",
    image: "/assests/feature_tasks.jpg",
  },
  {
    id: "community-support",
    title: "Community Support",
    description: "Connect with a safe, moderated community of individuals on the same healing journey as you.",
    image: "/assests/feature_analytics.jpg",
  }
];

export function KeyTools() {
  const [activeTab, setActiveTab] = useState(tools[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    tools.forEach((tool) => {
      const el = document.getElementById(tool.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full px-6 lg:px-0 pt-32 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative items-start z-40">
      {/* Left Side: Sticky */}
      <div className="w-full lg:col-span-5 xl:col-span-4 sticky top-48 flex flex-col gap-12">
        <motion.div
          className="pl-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium text-gray-300">Core Resources</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
            Tools that move<br />healing deeper
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col relative mt-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {/* Left border track (hidden on desktop since it overlaps the container line) */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 lg:hidden" />

          {tools.map((tool) => (
            <div key={tool.id} className="relative py-3 pl-8">
              {/* Active border */}
              {activeTab === tool.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <RollingText
                text={tool.title}
                isHovered={activeTab === tool.id}
                className={`text-xl font-medium transition-colors duration-300 ${activeTab === tool.id ? 'text-blue-500' : 'text-gray-500'}`}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Side: Scrollable */}
      <div className="w-full lg:col-span-7 xl:col-span-7 xl:col-start-6 flex flex-col gap-24 pt-12 pb-10">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            id={tool.id}
            className="flex flex-col gap-8 scroll-mt-48"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <h3 className="text-3xl font-semibold text-white mb-4">{tool.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{tool.description}</p>
            </div>

            <div className="w-full aspect-[4/3] rounded-[32px] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-full h-full bg-[#050505]/90 rounded-[31px] relative overflow-hidden flex items-center justify-center">
                {/* Subtle top glow */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-20" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[150px] bg-blue-500/10 blur-[60px] pointer-events-none z-20" />

                <div className="w-full h-full relative z-10 p-3">
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    className="object-contain rounded-[24px]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
