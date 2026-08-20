"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, BookOpen, Users, BarChart3, ChevronRight } from "lucide-react";
import { RollingText } from "@/components/ui/AnimatedButton";

const services = [
  {
    id: "course-management",
    title: "Course Management",
    icon: BookOpen,
  },
  {
    id: "knowledge-transfer",
    title: "Knowledge Transfer",
    icon: Users,
  },
  {
    id: "performance-analytics",
    title: "Performance Analytics",
    icon: BarChart3,
  }
];

export function Services() {
  const [activeService, setActiveService] = useState(services[1].id);

  return (
    <section className="w-full px-6 py-24 relative flex flex-col items-center z-40 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none translate-x-1/4" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

        {/* Left Side */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium text-blue-400">
              The LMS first platform
            </span>
            <h2 className="text-4xl md:text-[52px] font-medium tracking-tight text-white leading-[1.1] max-w-lg">
              Simplify your workflow with our services
            </h2>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-2">
            HG HEALING brings all your educational tools and analytics into one seamless, automated ecosystem designed for growth.
          </p>

          <div className="flex flex-col gap-4">
            {services.map((service) => {
              const isActive = activeService === service.id;
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`flex items-center justify-between w-full max-w-md px-6 py-4 rounded-full border transition-all duration-300 ${isActive
                    ? "bg-[#111] border-white/20 text-white shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                    : "bg-[#050505]/50 border-white/5 text-gray-500 hover:bg-[#0a0a0a] hover:border-white/10 hover:text-gray-300"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-5 h-5 opacity-80" />
                    <RollingText text={service.title} isHovered={isActive} className="font-medium text-base" />
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-gray-400" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

          {/* 3D Glowing Diamond */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-[45px] rotate-45 bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700 flex items-center justify-center"
            style={{
              boxShadow: "inset 10px 10px 30px rgba(255,255,255,0.8), inset -10px -10px 30px rgba(0,0,0,0.3), 0 40px 80px rgba(0,0,0,0.8), 0 0 80px rgba(59,130,246,0.5)"
            }}
          >
            <div className="-rotate-45 text-black drop-shadow-md">
              <RefreshCw className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
