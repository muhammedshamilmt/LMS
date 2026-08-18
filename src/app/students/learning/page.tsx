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
  ArrowDownRight,
  ArrowRightLeft,
  MoreHorizontal,
  Link as LinkIcon,
  Edit2,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  CheckCircle2,
  Activity,
  Target,
  Trophy,
  Flame,
  Search
} from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { useRouter } from "next/navigation";


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

export default function LearningPage() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const router = useRouter();

  const { data, error, isLoading } = useSWR(`/api/student/dashboard`, fetcher, {
    refreshInterval: 10000 // auto-refresh every 10 seconds
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center bg-white dark:bg-black p-4 rounded-[40px]">
          <Skeleton className="h-10 w-2/3 md:w-[400px] rounded-2xl" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Skeleton className="h-[400px] rounded-[40px]" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[200px] rounded-[40px]" />
            <Skeleton className="h-[200px] rounded-[40px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500 font-bold text-center w-full mt-20">Failed to load learning data. Ensure the database tables exist.</div>;
  }

  const enrolledCourses = data?.enrolledCourses || [];

  // Calculate stats
  const totalEnrolled = enrolledCourses.length;
  const totalCompleted = enrolledCourses.filter((c: any) => c.progress.completed === c.progress.total && c.progress.total > 0).length;
  const pending = totalEnrolled > 0 ? totalEnrolled - totalCompleted : 0;
  const successRate = totalEnrolled > 0 ? ((totalCompleted / totalEnrolled) * 100).toFixed(1) : "0";

  // Calculate points
  const totalCompletedModules = enrolledCourses.reduce((sum: number, c: any) => sum + (c.progress.completed || 0), 0);
  const ptsPerModule = 15.35;
  const totalPoints = totalCompletedModules * ptsPerModule;
  const pointsGoal = 25000;
  const pointsRemaining = Math.max(0, pointsGoal - totalPoints);
  const goalProgressPercentage = Math.min(100, Math.round((totalPoints / pointsGoal) * 100));

  // Use dynamic chart data from the API, fallback to empty array
  const chartData = data?.activityChartData || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white p-6 font-sans pb-24 font-medium">
      {/* Breadcrumb */}
      <div className="text-gray-500 dark:text-white/40 text-sm font-medium flex items-center gap-2 mb-6">
        <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/students/home')}>Overview</span>
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
          { label: "Total Enrolled", value: totalEnrolled.toString(), icon: Wallet, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Total Completed", value: totalCompleted.toString(), icon: ArrowUpRight, color: "text-blue-600 dark:text-blue-400" },
          { label: "Pending", value: pending.toString(), icon: Clock, color: "text-amber-600 dark:text-amber-400" },
          { label: "Success Rate", value: `${successRate}%`, icon: CheckCircle2, color: "text-purple-600 dark:text-purple-400" },
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
              <div className="text-4xl font-medium text-gray-900 dark:text-white tracking-tight">{totalPoints > 0 ? (totalPoints / 1000).toFixed(3) : 0} <span className="text-gray-500 dark:text-white/60">K PTS</span></div>
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
              <span className="text-sm font-medium text-gray-900 dark:text-white">Goals ({pointsGoal / 1000}K PTS)</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 dark:text-white/40 font-medium">{pointsRemaining.toFixed(0)} PTS remaining</span>
                <button className="text-[#3b82f6] text-xs font-medium flex items-center gap-1 hover:text-[#3b82f6]/80">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden border border-gray-200 dark:border-transparent">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${goalProgressPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* Right Card: Spending Chart */}
        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-3xl p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed mb-6">
              Looks like you are earning around {(totalPoints / 1000).toFixed(1)}K PTS on your recent courses.
            </h3>

            <div className="space-y-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-white/40 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Achieved
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white">{(totalPoints / 1000).toFixed(3)} <span className="text-gray-500 dark:text-white/40 text-sm">K PTS</span></div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-white/40 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20"></div> Expected
                </div>
                <div className="text-xl font-medium text-gray-900 dark:text-white">25.000 <span className="text-gray-500 dark:text-white/40 text-sm">K PTS</span></div>
              </div>
            </div>

            <p className="text-xs font-medium text-gray-500 dark:text-white/40 mt-auto leading-relaxed">
              Complete your pending modules so that you can earn about <span className="text-gray-900 dark:text-white font-medium">3.890 PTS</span> more.
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
          <Button variant="outline" className="rounded-full font-medium bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222]" onClick={() => router.push('/students/courses')}>View All</Button>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course: any, i: number) => {
              const bgColors = ["bg-purple-50 dark:bg-purple-900/10", "bg-blue-50 dark:bg-blue-900/10", "bg-emerald-50 dark:bg-emerald-900/10", "bg-amber-50 dark:bg-amber-900/10"];
              const bgColor = bgColors[i % bgColors.length];
              const progressPercentage = course.progress.total > 0 ? Math.round((course.progress.completed / course.progress.total) * 100) : 0;
              return (
                <div key={course.id} onClick={() => router.push(`/students/courses/${course.id}`)} className="cursor-pointer">
                  <ProgressCard
                    id={course.id}
                    title={course.title}
                    description={course.short_description || course.category || "Learn more about this course."}
                    tasks={course.progress.total}
                    projects={course.progress.completed}
                    progress={progressPercentage}
                    tag="Enrolled"
                    bgColor={bgColor}
                    emojiSrc={course.thumbnailUrl ? course.thumbnailUrl : `https://api.dicebear.com/7.x/shapes/svg?seed=${course.id}`}
                    actionText="Continue"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-12 bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-3xl mt-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No active courses</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't enrolled in any courses yet. Start your learning journey today by exploring our catalog.</p>
            <Button onClick={() => router.push('/students/courses')} className="bg-[#7956ED] hover:bg-[#6b4cda] text-white rounded-full">
              Explore Courses
            </Button>
          </div>
        )}
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
