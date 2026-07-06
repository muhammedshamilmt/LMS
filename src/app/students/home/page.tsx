"use client";

import React from "react";
import { ChevronRight, MoreVertical, Heart, ChevronLeft, ArrowRight, PenTool, MonitorSmartphone, TrendingUp, UserPlus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProgressCard } from "@/components/progress-card";

export default function HomePage() {
  return (
    <div className="flex flex-col xl:flex-row w-full min-h-full bg-[#ffffff] dark:bg-zinc-950 p-6 lg:p-8 gap-8">
      {/* Main Column */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">



        {/* Banner */}
        <div className="bg-[#7956ED] rounded-[24px] p-8 lg:p-12 text-white relative overflow-hidden ">
          {/* Decorative Stars */}
          <svg className="absolute top-8 right-12 w-24 h-24 opacity-30 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-8 right-40 w-12 h-12 opacity-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
          </svg>

          <div className="relative z-10 flex flex-col items-start">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-white/80">Online Course</span>
            <h1 className="text-3xl lg:text-4xl xl:text-[42px] font-bold max-w-[500px] leading-[1.2] mb-8">
              Sharpen Your Skills with Professional Online Courses
            </h1>
            <Button className="bg-black hover:bg-black/80 text-white rounded-full px-6 py-6 text-[15px] font-semibold flex items-center gap-3 group border-none shadow-xl shadow-black/10">
              Join Now
              <span className="bg-white text-black rounded-full p-1.5 group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>

        {/* Watched Tags */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
          <div className="flex items-center justify-between gap-6 bg-white dark:bg-zinc-900 p-3 pr-4 rounded-[20px]  min-w-[240px] border border-gray-100 dark:border-zinc-800 h transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0EAFC] dark:bg-[#7956ED]/10 text-[#7956ED] flex items-center justify-center">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-400 font-medium mb-0.5">2/8 watched</div>
                <div className="font-bold text-[14px]">UI/UX Design</div>
              </div>
            </div>
            <MoreVertical className="w-5 h-5 text-gray-300 hover:text-gray-500 transition" />
          </div>

          <div className="flex items-center justify-between gap-6 bg-white dark:bg-zinc-900 p-3 pr-4 rounded-[20px]  min-w-[240px] border border-gray-100 dark:border-zinc-800 h transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FCE8F3] dark:bg-[#E85D9E]/10 text-[#E85D9E] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-400 font-medium mb-0.5">3/8 watched</div>
                <div className="font-bold text-[14px]">Branding</div>
              </div>
            </div>
            <MoreVertical className="w-5 h-5 text-gray-300 hover:text-gray-500 transition" />
          </div>

          <div className="flex items-center justify-between gap-6 bg-white dark:bg-zinc-900 p-3 pr-4 rounded-[20px]  min-w-[240px] border border-gray-100 dark:border-zinc-800 h transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F3F8] dark:bg-[#3BA6D4]/10 text-[#3BA6D4] flex items-center justify-center">
                <MonitorSmartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-400 font-medium mb-0.5">6/12 watched</div>
                <div className="font-bold text-[14px]">Front End</div>
              </div>
            </div>
            <MoreVertical className="w-5 h-5 text-gray-300 hover:text-gray-500 transition" />
          </div>
        </div>



        {/* Continue Watching (Using ProgressCard) */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Watching</h2>
            <button className="text-[13px] text-[#7956ED] font-semibold hover:underline">See all</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProgressCard
              title="UI/UX designer"
              description="Master the principles of user interface and user experience design."
              tasks={350}
              projects={3}
              progress={72}
              tag="Student"
              bgColor="bg-[#FDE2ED]"
              emojiSrc="https://api.dicebear.com/7.x/shapes/svg?seed=UI"
              actionText="Continue"
              id="1"
            />
            <ProgressCard
              title="QA engineer"
              description="Learn the fundamentals of quality assurance and software testing."
              tasks={622}
              projects={4}
              progress={0}
              startDate="20 July"
              tag="Recommended"
              bgColor="bg-[#E1F2FB]"
              emojiSrc="https://api.dicebear.com/7.x/shapes/svg?seed=QA"
              actionText="Continue"
              id="1"
            />
            <ProgressCard
              title="Front-end developer"
              description="Build stunning and responsive websites using modern web technologies."
              tasks={480}
              projects={5}
              progress={40}
              startDate="15 August"
              tag="Student"
              bgColor="bg-[#D1F2D6]"
              emojiSrc="https://api.dicebear.com/7.x/shapes/svg?seed=Frontend"
              actionText="Continue"
              id="1"
            />
          </div>
        </div>

        {/* Your Lesson Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Lesson</h2>
            <button className="text-[13px] text-[#7956ED] font-semibold hover:underline">See all</button>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-[24px] p-2 md:p-6  border border-gray-100 dark:border-zinc-800 overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="text-[11px] text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-zinc-800">
                  <th className="pb-4 px-4 font-semibold">Mentor</th>
                  <th className="pb-4 px-4 font-semibold">Type</th>
                  <th className="pb-4 px-4 font-semibold">Desc</th>
                  <th className="pb-4 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 dark:border-zinc-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10 border border-gray-100 dark:border-zinc-800">
                        <AvatarImage src="https://i.pravatar.cc/150?img=14" />
                      </Avatar>
                      <div>
                        <div className="text-[14px] font-semibold text-gray-900 dark:text-white">Padhang Satrio</div>
                        <div className="text-[11px] text-gray-400 font-medium mt-0.5">2/16/2004</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#F0EAFC] dark:bg-[#7956ED]/10 text-[#7956ED] text-[10px] font-bold tracking-wider uppercase">
                      UI/UX Design
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] font-semibold text-gray-700 dark:text-gray-300">
                    Understand Of UI/UX Design
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-zinc-700 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7956ED] hover:border-[#7956ED] transition ml-auto">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-50 dark:border-zinc-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10 border border-gray-100 dark:border-zinc-800">
                        <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                      </Avatar>
                      <div>
                        <div className="text-[14px] font-semibold text-gray-900 dark:text-white">Leonardo samsul</div>
                        <div className="text-[11px] text-gray-400 font-medium mt-0.5">5/21/2004</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#E6F3F8] dark:bg-[#3BA6D4]/10 text-[#3BA6D4] text-[10px] font-bold tracking-wider uppercase">
                      Front End
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[14px] font-semibold text-gray-700 dark:text-gray-300">
                    Beginner's Guide to Becoming a...
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-zinc-700 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7956ED] hover:border-[#7956ED] transition ml-auto">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  );
}
