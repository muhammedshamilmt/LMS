"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  highlight?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Course Creator",
    text: "Since migrating our courses to HG HEALING, we've seen a 40% increase in student engagement and completion rates.",
    avatar: "https://i.pravatar.cc/150?img=32", 
  },
  {
    name: "David Patel",
    role: "Sales Director",
    text: "The integrated CRM and sales automation tools are unmatched. We closed 3x more deals in our first quarter using the platform.",
    avatar: "https://i.pravatar.cc/150?img=11",
    highlight: true,
  },
  {
    name: "Emily Carter",
    role: "LMS Administrator",
    text: "Managing thousands of students used to be a nightmare. Now, performance analytics and automated workflows do the heavy lifting for us.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

export function Testimonials() {
  return (
    <section className="relative w-full py-32 z-40">

      {/* ── Background Micro-components ── */}
      <div className="absolute inset-0 z-0 flex flex-col items-center pointer-events-none">
        
        {/* Top Grid Pattern with highlights */}
        <div className="relative mt-[-100px] flex h-[800px] w-full max-w-[100vw] justify-center [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]">
          <div className="grid grid-cols-10 gap-0 opacity-40">
            {Array.from({ length: 80 }).map((_, i) => {
              const isLit = [14, 25, 34, 45].includes(i);
              return (
                <motion.div
                  key={i}
                  initial={isLit ? { opacity: 0.1 } : {}}
                  animate={isLit ? { opacity: [0.1, 0.4, 0.1] } : {}}
                  transition={isLit ? { duration: 6, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" } : {}}
                  className={`h-28 w-28 border-[0.5px] border-white/5 ${isLit ? "bg-blue-500/20 border-blue-500/20" : ""
                    }`}
                />
              );
            })}
          </div>
          {/* Main Radial Glow (Blue) */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[400px] w-[600px] bg-blue-600/20 blur-[140px] pointer-events-none" />
          <div className="absolute top-[0%] left-1/2 -translate-x-1/2 h-[300px] w-[400px] bg-blue-400/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-[100px] w-[200px] bg-white/10 blur-[80px] pointer-events-none opacity-50" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[3.5rem] md:text-[4.5rem] font-medium tracking-tight text-white mb-6"
          >
            What people say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-xl mx-auto font-light leading-relaxed"
          >
            Discover what our satisfied customers have to say about scaling their sales and courses with HG HEALING.
          </motion.p>
        </div>

        {/* ── Testimonial Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className={`relative group p-8 rounded-[2rem] border transition-all duration-500 ${t.highlight
                ? "bg-[#0a0a0a] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
            >
              {/* Highlight Glow for the middle card */}
              {t.highlight && (
                <>
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-blue-500/20 via-blue-500/5 to-transparent rounded-b-[2rem] pointer-events-none" />
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
                </>
              )}

              {/* Avatar */}
              <div className="mb-8 h-16 w-16 overflow-hidden rounded-full border border-white/20 p-0.5">
                <div className="h-full w-full overflow-hidden rounded-full bg-white/5">
                  <img src={t.avatar} alt={t.name} width={64} height={64} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>

              {/* Name & Role */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-1">{t.name}</h3>
                <p className="text-sm text-blue-400/80 font-medium">{t.role}</p>
              </div>

              {/* Text */}
              <p className="text-[1.05rem] leading-[1.6] text-gray-300 font-light relative z-10">
                "{t.text}"
              </p>

              {/* Cursor indicator for the middle card (matching the reference micro-component) */}
              {t.highlight && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-50">
                  <motion.div
                    animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                      <path
                        d="M4 4L11.07 20.97L13.58 13.58L20.97 11.07L4 4Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
