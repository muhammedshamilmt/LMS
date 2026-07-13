"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Globe,
  Subtitles,
  FileBox,
  Clock,
  MessageCircle,
  Award,
  PlaySquare,
  Gift,
  Plus,
  Minus,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const courseModules = [
  {
    title: "01: Intro",
    duration: "22min",
    lessons: [
      { title: "Introduction", duration: "2 min" },
      { title: "What is Figma?", duration: "5 min" },
      { title: "Understanding Figma", duration: "12 min" },
      { title: "UI tour", duration: "3 min" },
    ]
  },
  {
    title: "02: Intermediate Level Stuff",
    duration: "1h 20min",
    lessons: [
      { title: "Frames & Groups", duration: "10 min" },
      { title: "Auto Layout Basics", duration: "25 min" },
      { title: "Constraints", duration: "15 min" },
    ]
  },
  {
    title: "03: Advanced Stuff",
    duration: "36min",
    lessons: [
      { title: "Prototyping", duration: "20 min" },
      { title: "Smart Animate", duration: "16 min" },
    ]
  },
  {
    title: "04: Imports & Graphics",
    duration: "40min",
    lessons: []
  },
  {
    title: "05: Component in Figma",
    duration: "1h 12min",
    lessons: []
  },
  {
    title: "06: Styles in Figma",
    duration: "41min",
    lessons: []
  },
  {
    title: "07: Summary",
    duration: "8min",
    lessons: []
  }
];

export default function CourseEnrollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]); // Default open first section

  const toggleModule = (idx: number) => {
    setExpandedModules(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-[#0a0a0a] p-6 lg:p-8 xl:px-12 max-w-[1400px] mx-auto">

      {/* Breadcrumbs */}
      <div className="flex items-center text-[13px] text-gray-500 dark:text-gray-400 mb-8 font-medium">
        <Link href="/students/home" className="hover:text-black dark:hover:text-white transition">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/students/courses" className="hover:text-black dark:hover:text-white transition">Courses</Link>
        <span className="mx-2">/</span>
        <span className="hover:text-black dark:hover:text-white transition cursor-pointer">Blender courses</span>
        <span className="mx-2">/</span>
        <span className="text-gray-300 dark:text-gray-600">Advanced 3D Modelling in Blender</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

        {/* Left Column - Course Presentation */}
        <div className="flex-1 w-full max-w-3xl">

          {/* Hero Thumbnail Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-[32px] overflow-visible mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            {/* The main thumbnail image */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_idILmOBQ7fSJVY1j7Kncw8M5LiQi5Uk-C5CSSyi0A&s=10"
              alt="Course Thumbnail"
              className="w-full h-full object-cover rounded-[32px]"
            />

            {/* Avatar Overlay */}
            <div className="absolute -bottom-8 left-6 md:left-10 bg-white dark:bg-[#0a0a0a] p-1 rounded-[20px]  border border-gray-100/50 dark:border-zinc-800/50">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[16px] overflow-hidden bg-gray-200 dark:bg-zinc-800">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_idILmOBQ7fSJVY1j7Kncw8M5LiQi5Uk-C5CSSyi0A&s=10"
                  alt="Instructor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rating Overlay */}
            <div className="absolute bottom-4 right-6 bg-black/60 backdrop-blur-md rounded-2xl px-4 py-2.5  border border-white/10 flex flex-col items-end">
              <span className="text-white text-[12px] font-bold mb-1 opacity-90">1,421 reviews</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-2">
            <p className="text-[14px] text-gray-500 font-medium mb-2">
              A course by <span className="font-bold text-gray-900 dark:text-white">Blend Smith</span>
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-[54px] font-bold text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
              Advanced 3D Modelling<br />in Blender
            </h1>

            <div className="text-[16px] text-gray-600 dark:text-gray-300 leading-[1.8] space-y-6 font-medium mb-16">
              <p>
                Embark on a creative journey and master the art of crafting your unique 3D character using Blender. Dive into the fascinating process of bringing your imaginative ideas to life as you explore the intricate features of Blender.
              </p>
              <p>
                Unleash your creativity as you learn to meticulously model, enhance details, and skillfully manipulate light and color. With each step, you'll unveil the captivating characters residing in your mind and unleash them upon the world, all while enjoying an exhilarating and enjoyable experience.
              </p>
            </div>

            {/* Course Table of Contents */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">Course Table of Contents</p>
              <div className="flex flex-col gap-2">
                {courseModules.map((module, idx) => {
                  const isExpanded = expandedModules.includes(idx);
                  return (
                    <div key={idx} className="border-b border-gray-50 dark:border-zinc-800/50 last:border-0 pb-3 mb-2 last:mb-0 last:pb-0">
                      <button
                        onClick={() => toggleModule(idx)}
                        className="w-full flex items-center justify-between py-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#7956ED] rounded-lg transition-all"
                      >
                        <span className="text-[14px] font-semibold text-gray-900 dark:text-white group-hover:text-[#7956ED] transition-colors">
                          {module.title}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-[12px] text-gray-500 font-semibold">{module.duration}</span>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#7956ED] text-white' : 'bg-gray-50 dark:bg-zinc-800 text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-zinc-700'}`}>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </button>

                      {/* Lessons */}
                      {isExpanded && module.lessons.length > 0 && (
                        <div className="flex flex-col gap-1 pt-2 pb-2 animate-in fade-in slide-in-from-top-1 duration-200">
                          {module.lessons.map((lesson, lIdx) => (
                            <div key={lIdx} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#F0EAFC] dark:hover:bg-[#7956ED]/10 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <Play className="w-3 h-3 text-gray-400 group-hover:text-[#7956ED] transition-colors" fill="currentColor" />
                                <span className="text-[13px] text-gray-600 dark:text-gray-300 font-medium group-hover:text-[#7956ED] dark:group-hover:text-[#7956ED] transition-colors">
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-[12px] text-gray-400 font-medium group-hover:text-[#7956ED] transition-colors">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Purchase Details */}
        <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col pt-2 lg:pt-0">

          <div className="mb-8">
            <div className="flex items-baseline gap-2 text-gray-900 dark:text-white mb-6">
              <span className="text-5xl font-bold tracking-tight">49.99</span>
              <span className="text-xl font-bold">USD</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30">
                <PlaySquare className="w-5 h-5 text-gray-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lessons</span>
                  <span className="font-bold text-gray-900 dark:text-white text-[14px]">12</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30">
                <div className="w-5 h-5 flex flex-col justify-end gap-[2px]">
                  <div className="w-1.5 h-2 bg-gray-500 rounded-sm"></div>
                  <div className="w-1.5 h-3 bg-gray-500 rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-gray-200 dark:bg-zinc-700 rounded-sm"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Difficulty</span>
                  <span className="font-bold text-gray-900 dark:text-white text-[14px]">Moderate</span>
                </div>
              </div>
            </div>

            {/* Details List */}
            <div className="flex flex-col gap-4 mb-10 text-[14px]">
              <div className="flex items-start gap-4">
                <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div><span className="text-gray-500">Students:</span> <span className="font-bold text-gray-900 dark:text-white">3,215</span></div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div><span className="text-gray-500">Language:</span> <span className="font-bold text-gray-900 dark:text-white">English</span></div>
              </div>
              <div className="flex items-start gap-4">
                <Subtitles className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="leading-relaxed"><span className="text-gray-500">Subtitles:</span> <span className="font-bold text-gray-900 dark:text-white">English, Spanish, French, Italian, Russian, Polish, Dutch, German</span></div>
              </div>
              <div className="flex items-start gap-4">
                <FileBox className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div><span className="text-gray-500">Additional resources:</span> <span className="font-bold text-gray-900 dark:text-white">12 files</span></div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div><span className="text-gray-500">Duration:</span> <span className="font-bold text-gray-900 dark:text-white">8h 23m</span></div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div><span className="text-gray-500">Critique session:</span> <span className="font-bold text-gray-900 dark:text-white">Individual recordings</span></div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div><span className="text-gray-500">Certificate:</span> <span className="font-bold text-gray-900 dark:text-white">Upon completion of the course</span></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href={`/students/courses/${id}`} className="flex-1 h-14 bg-[#111] hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-2xl font-sbold text-[15px] shadow-md transition-transform active:scale-95 flex items-center justify-center">
                <PlaySquare className="w-5 h-5 mr-2" /> Enroll a course
              </Link>
              <Button variant="outline" className="flex-1 h-14 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded-2xl font-bold text-[15px] hover:bg-gray-50 dark:hover:bg-zinc-800 transition-transform active:scale-95">
                <Gift className="w-5 h-5 mr-2" /> Buy as a gift
              </Button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
