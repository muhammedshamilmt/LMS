"use client";

import React, { useState } from "react";
import { ProgressCard } from "@/components/progress-card";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import { 
  ChevronDown, 
  Settings, 
  Wallet, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Calendar,
  ArrowDownRight,
  ArrowRightLeft,
  MoreHorizontal,
  Link as LinkIcon,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const chartData = [
  { day: '14 Jul', achieved: 2500, expected: -1200 },
  { day: '', achieved: 3200, expected: -1500 },
  { day: '', achieved: 2800, expected: -1800 },
  { day: '', achieved: 3800, expected: -2500 },
  { day: '', achieved: 2100, expected: -1100 },
  { day: '', achieved: 2900, expected: -2100 },
  { day: '', achieved: 4000, expected: -3000 },
  { day: '21 Aug', achieved: 3500, expected: -2200 },
  { day: '', achieved: 2800, expected: -1900 },
  { day: '', achieved: 3100, expected: -2800 },
  { day: '', achieved: 2500, expected: -1500 },
  { day: '', achieved: 3600, expected: -2600 },
  { day: '', achieved: 2900, expected: -2000 },
  { day: '', achieved: 3200, expected: -2400 },
  { day: '28 Sep', achieved: 2700, expected: -1800 },
  { day: '', achieved: 3400, expected: -2700 },
  { day: '', achieved: 2200, expected: -1200 },
  { day: '', achieved: 2900, expected: -2100 },
];

export default function LearningPage() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white p-6 font-sans pb-24 font-medium">
      {/* Breadcrumb */}
      <div className="text-gray-500 dark:text-white/40 text-sm font-medium flex items-center gap-2 mb-6">
        <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">Overview</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">Learning Details</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-white tracking-tight">Learning Details</h1>
          <div className="hidden md:flex items-center gap-2">
            <button className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-white/80 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all">
              Last 3 weeks <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </button>
            <button className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-white/80 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all">
              <Calendar className="w-3.5 h-3.5 opacity-50" />
              15 Mar - 22 Mar <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </button>
          </div>
        </div>
        <button className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
          <Settings className="w-4 h-4 opacity-70" /> Manage Learning
        </button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Enrolled", value: "124", icon: Wallet, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Total Completed", value: "82", icon: ArrowUpRight, color: "text-blue-600 dark:text-blue-400" },
          { label: "Pending", value: "12", icon: Clock, color: "text-amber-600 dark:text-amber-400" },
          { label: "Success Rate", value: "98.5%", icon: CheckCircle2, color: "text-purple-600 dark:text-purple-400" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-3xl p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-gray-500 dark:text-white/40 mb-1">{stat.label}</p>
              <p className="text-2xl font-medium text-gray-900 dark:text-white tracking-tight">{stat.value}</p>
            </div>
            <div className={`h-10 w-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={18} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

        {/* Left Card: Balances */}
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-3xl p-8 flex flex-col">
          <div className="flex items-start gap-4 mb-8">
            <img src="https://flagcdn.com/w80/us.png" alt="US" className="w-10 h-7 rounded-sm object-cover border border-gray-200 dark:border-transparent" />
            <div>
              <div className="text-gray-500 dark:text-white/40 text-sm font-medium mb-1">Total points</div>
              <div className="text-4xl font-medium text-gray-900 dark:text-white tracking-tight">3.908 <span className="text-gray-500 dark:text-white/60">PTS</span></div>
              <div className="text-gray-500 dark:text-white/40 text-xs mt-2 font-medium">1 Module = 15.35 PTS, As of today</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-10 relative">
            <button className="flex-1 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-900 dark:text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-gray-200 dark:border-transparent">
              <ArrowUpRight className="w-4 h-4" /> Submit
            </button>
            <button className="flex-1 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5 text-gray-900 dark:text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowDownRight className="w-4 h-4" /> Request
            </button>
            <button className="flex-1 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5 text-gray-900 dark:text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowRightLeft className="w-4 h-4" /> Convert
            </button>
            <button
              className="w-12 h-12 shrink-0 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5 rounded-xl flex items-center justify-center transition-colors"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            >
              <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-white/60" />
            </button>

            {/* Popover Menu */}
            <AnimatePresence>
              {showMoreMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-14 bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-2xl p-2 w-56 z-20 shadow-lg"
                >
                  <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-sm text-gray-700 dark:text-white/80 font-medium flex items-center gap-3 transition-colors">
                    <Wallet className="w-4 h-4 opacity-50" /> Set Goal
                  </button>
                  <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-sm text-gray-700 dark:text-white/80 font-medium flex items-center gap-3 transition-colors">
                    <Calendar className="w-4 h-4 opacity-50" /> Scheduled reviews
                  </button>
                  <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-sm text-gray-700 dark:text-white/80 font-medium flex items-center gap-3 transition-colors">
                    <ArrowDownRight className="w-4 h-4 opacity-50" /> Auto Payout
                  </button>
                  <button className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-sm text-gray-700 dark:text-white/80 font-medium flex items-center gap-3 transition-colors">
                    <LinkIcon className="w-4 h-4 opacity-50" /> Share link
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Goals</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 dark:text-white/40 font-medium">1092 PTS remaining</span>
                <button className="text-[#3b82f6] text-xs font-medium flex items-center gap-1 hover:text-[#3b82f6]/80">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden border border-gray-200 dark:border-transparent">
              <div className="h-full bg-emerald-500 w-[65%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Card: Spending Chart */}
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-3xl p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed mb-6">
              Looks like you are earning more than 25K PTS on last 3 weeks.
            </h3>

            <div className="space-y-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-white/40 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Achieved
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white">35.898 <span className="text-gray-500 dark:text-white/40 text-sm">PTS</span></div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-white/40 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20"></div> Expected
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white">25.093 <span className="text-gray-500 dark:text-white/40 text-sm">PTS</span></div>
              </div>
            </div>

            <p className="text-xs font-medium text-gray-500 dark:text-white/40 mt-auto leading-relaxed">
              Set your schedule so that you can earn about <span className="text-gray-900 dark:text-white font-medium">3.890 PTS</span> on next time period.
            </p>
          </div>

          <div className="w-full md:w-[280px] h-[200px] flex flex-col pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} stackOffset="sign" margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={4} barGap={0}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 500 }} dy={10} className="text-gray-400 dark:text-white/30" />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 500 }} tickFormatter={(val) => val === 0 ? '0 PTS' : val > 0 ? `${val / 1000}K PTS` : `${Math.abs(val) / 1000}K PTS`} className="text-gray-400 dark:text-white/30" />
                <ReferenceLine y={0} stroke="currentColor" className="text-gray-200 dark:text-white/10" />
                <RechartsTooltip
                  cursor={{ fill: 'currentColor', opacity: 0.05 }}
                  contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)', borderRadius: '12px', color: 'var(--tooltip-text)' }}
                  itemStyle={{ color: 'var(--tooltip-text)', fontWeight: 500 }}
                  labelStyle={{ fontWeight: 500 }}
                />
                <Bar dataKey="achieved" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="expected" fill="var(--outcome-fill)" radius={[0, 0, 2, 2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Progress Cards Section */}
      <div>
        <div className="flex justify-between items-center mb-6 mt-8">
          <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">Active Courses</h2>
          <Button variant="outline" className="rounded-full font-medium bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222]">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProgressCard
            title="UI/UX Masterclass"
            description="Learn the principles of UI/UX design and create stunning interfaces."
            tasks={24}
            projects={3}
            progress={72}
            tag="Design"
            bgColor="bg-purple-50 dark:bg-purple-900/10"
            emojiSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png"
            actionText="Continue"
            id="1"
          />
          <ProgressCard
            title="Advanced React"
            description="Master React hooks, context, and performance optimization."
            tasks={18}
            projects={2}
            progress={45}
            tag="Development"
            bgColor="bg-blue-50 dark:bg-blue-900/10"
            emojiSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Rocket.png"
            actionText="Continue"
            id="2"
          />
          <ProgressCard
            title="Data Science 101"
            description="Introduction to data analysis, visualization, and machine learning."
            tasks={32}
            projects={4}
            progress={15}
            tag="Data"
            bgColor="bg-emerald-50 dark:bg-emerald-900/10"
            emojiSrc="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png"
            actionText="Continue"
            id="3"
          />
        </div>
      </div>

      <style jsx global>{`
        :root {
          --tooltip-bg: rgba(255, 255, 255, 0.95);
          --tooltip-border: rgba(0, 0, 0, 0.1);
          --tooltip-text: rgba(0, 0, 0, 0.9);
          --outcome-fill: #d1d5db; /* gray-300 for white theme */
        }
        .dark {
          --tooltip-bg: rgba(17, 17, 17, 0.95);
          --tooltip-border: rgba(255, 255, 255, 0.1);
          --tooltip-text: rgba(255, 255, 255, 0.9);
          --outcome-fill: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
