"use client";

import Image from "next/image";
import { Shield, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { TextReveal } from "./TextReveal";

const courses = [
  {
    id: 1,
    tier: "UNCOMMON",
    duration: "4 Weeks",
    title: "Mobile Photography",
    subtitle: "HERALD PRIME",
    impactScore: "9.2/10",
    distribution: "80",
    price: "$199",
    image: "/assests/course_1.jpg",
  },
  {
    id: 2,
    tier: "RARE",
    duration: "6 Weeks",
    title: "Cinematic Editing",
    subtitle: "HERALD PRIME",
    impactScore: "9.8/10",
    distribution: "45",
    price: "$299",
    image: "/assests/course_2.jpg",
  },
  {
    id: 3,
    tier: "LEGENDARY",
    duration: "8 Weeks",
    title: "Missions Strategy",
    subtitle: "HERALD PRIME",
    impactScore: "9.5/10",
    distribution: "120",
    price: "$399",
    image: "/assests/course_3.jpg",
  }
];

export function Courses() {
  return (
    <section className="w-full px-6 py-32 relative flex flex-col items-center z-40">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <TextReveal
            text="Transformative Programs"
            className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6"
          />
          <TextReveal
            text="Level up your skills with our curated, high-impact course selection."
            className="text-gray-400 text-lg max-w-2xl"
            delay={0.1}
          />
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
          }}
        >
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              className="w-full bg-[#080808] border border-white/[0.08] rounded-[36px] p-2 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:border-white/[0.15] transition-colors"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              {/* Top Image Section */}
              <div className="w-full aspect-[4/3.5] relative rounded-[28px] overflow-hidden bg-[#111]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Notch (Tier) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#080808] px-6 py-1.5 rounded-b-[16px] z-10 border-b border-x border-white/[0.08]">
                  <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                    {course.tier}
                  </span>
                </div>

                {/* Top Right Shield */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#080808]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/[0.08] z-10 text-gray-400">
                  <Shield className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Notch (Duration) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#080808] px-8 py-2 rounded-t-[20px] z-10 border-t border-x border-white/[0.08]">
                  <span className="text-xs font-semibold text-white">
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col px-4 pt-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[22px] font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] font-bold text-white">{course.price}</span>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-8">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[9px] font-bold text-gray-400 border border-white/10">
                    H
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                    {course.subtitle}
                  </span>
                </div>

                {/* Stats Box */}
                <div className="w-full bg-[#111111] border border-white/[0.06] rounded-[20px] p-4 flex items-center justify-between">

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                      Impact Score
                    </span>
                    <span className="text-base font-bold text-white">
                      {course.impactScore}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                      Distribution %
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      <span className="text-base font-bold text-white">
                        {course.distribution}
                      </span>
                    </div>
                  </div>

                  <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
