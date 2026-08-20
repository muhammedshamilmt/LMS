"use client";

import { motion } from "framer-motion";
import { Badge } from "lucide-react";
import { TextReveal } from "./TextReveal";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function Hero() {
  return (
    <div className="relative w-full flex flex-col items-center">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 mt-10 py-2 rounded-full border border-white/10 bg-[#080808]/50 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
      >
        <Badge className="h-5 w-5 fill-amber-200" />
        <span className="text-sm font-medium text-gray-300">Early Access Opens September 2025</span>
      </motion.div>

      {/* Hero Title */}
      <TextReveal
        text="Your Courses. Your Tools.\nOne Seamless Hub."
        className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-6 text-center max-w-4xl"
        delay={0.1}
      />

      {/* Hero Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-lg md:textmd font-light text-gray-400 mb-10 max-w-2xl text-center"
      >
        HG HEALING brings premium courses, tasks, and sales workflows together so you can stop juggling apps and start scaling your growth faster.
      </motion.p>

      {/* Email CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex items-center w-full max-w-md p-1.5 pl-6 rounded-full border border-white/10 bg-black backdrop-blur-md mb-10 focus-within:border-white/20 focus-within:bg-black transition-colors"
      >
        <input
          type="email"
          placeholder="Enter your best email..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-sm"
        />
        <AnimatedButton 
          text="Join Waitlist"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        />
      </motion.div>

      {/* Social Proof */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <div className="flex -space-x-3">
          <div className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-blue-500 to-purple-500" />
          <div className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-green-500 to-emerald-500" />
          <div className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-orange-500 to-red-500" />
          <div className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-pink-500 to-rose-500" />
        </div>
        <p className="text-sm text-gray-400">
          Already 700+ early signups from startups and creators.
        </p>
      </motion.div> */}
    </div>
  );
}
