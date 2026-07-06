"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Share2,
  Play,
  Check,
  Clock,
  Star,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  PlusCircle,
  FileText,
  Download,
  File
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

const faqs = [
  { q: "Is this course for beginners?", a: "Absolutely! We start from the very basics and gradually move to advanced concepts." },
  { q: "Do I need a paid Figma account?", a: "No, a free Figma account is sufficient for all the exercises in this course." },
  { q: "Will I get a certificate?", a: "Yes, upon completing all modules you will receive a verifiable digital certificate." }
];

const announcements = [
  { date: "Oct 12, 2026", title: "New Module Added!", content: "We just added a new bonus module on advanced Auto Layout features introduced in the latest Figma update." },
  { date: "Sep 28, 2026", title: "Live Q&A Session", content: "Join me this Friday for a live Q&A session where we'll go over your design assignments." }
];

const reviews = [
  { name: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?img=5", rating: 5, date: "2 days ago", text: "This course completely transformed how I design. Crystal is an amazing instructor and explains everything so clearly!" },
  { name: "Mike Chen", avatar: "https://i.pravatar.cc/150?img=12", rating: 4, date: "1 week ago", text: "Great content and very well structured. I just wish there were more exercises on prototyping." },
  { name: "Elena Rodriguez", avatar: "https://i.pravatar.cc/150?img=19", rating: 5, date: "3 weeks ago", text: "The absolute best Figma course out there. The Auto Layout section alone was worth the price." }
];

const courseResources = [
  { title: "Figma Keyboard Shortcuts", type: "PDF", size: "2.4 MB" },
  { title: "UI Components Library", type: "FIG", size: "15.8 MB" },
  { title: "Design System Guidelines", type: "PDF", size: "8.1 MB" },
  { title: "Module 1 Presentation", type: "PPTX", size: "12.5 MB" },
  { title: "Color Theory Cheat Sheet", type: "PDF", size: "1.2 MB" },
  { title: "Wireframe Templates", type: "ZIP", size: "34.0 MB" },
];

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter(i => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  const tabs = ["Overview", "Author", "FAQ", "Announcements", "Reviews", "Notes"];

  return (
    <div className="flex flex-col min-h-full bg-[#fdfdfd] dark:bg-zinc-950 p-6 lg:p-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-[13px] text-gray-500 dark:text-gray-400 mb-8 font-medium">
        <Link href="/students/courses" className="hover:text-black dark:hover:text-white transition">Courses</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-2" />
        <span className="hover:text-black dark:hover:text-white transition cursor-pointer">UI UX Design</span>
        <ChevronRight className="w-3.5 h-3.5 mx-2" />
        <span className="text-black dark:text-white">Figma from A to Z</span>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 relative items-start">

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0 w-full">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Link href="/students/courses" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                  <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Figma from A to Z</h1>
                <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-[11px] font-bold uppercase tracking-wider rounded-full border border-gray-200 dark:border-zinc-700">
                  UI / UX Design
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 ml-10">
                <div className="flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4 text-[#7956ED]" />
                  <span>38 lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7956ED]" />
                  <span>4h 30min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span>4.5 <span className="text-gray-400 font-normal">(126 reviews)</span></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-10 lg:ml-0 self-start lg:self-center mt-2 lg:mt-0">
              <Button variant="ghost" className="text-[#7956ED] font-semibold hover:bg-[#7956ED]/10 rounded-full px-5 h-11">
                Share
              </Button>
              <Button className="bg-[#7956ED] hover:bg-[#6842df] text-white rounded-full px-8 h-11 font-bold shadow-lg shadow-[#7956ED]/20 border-none transition-transform active:scale-95">
                Enroll Now
              </Button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-gray-900 shadow-sm mb-8 border border-gray-100 dark:border-zinc-800">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VqYcoS_HJts"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 mb-8">
            <div className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[14px] font-bold transition-all duration-300 whitespace-nowrap ${activeTab === tab
                    ? "text-[#7956ED] border-b-[3px] border-[#7956ED]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-[3px] border-transparent"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Button className="bg-[#20d5a5] hover:bg-[#20d5a5] text-white rounded-md px-6 h-10 font-bold flex-shrink-0 mb-3  hidden md:flex items-center">
              <Check className="w-4 h-4 mr-1.5" strokeWidth={3} />
              Complete
            </Button>
          </div>

          {/* Tab Content Container */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[28px] p-6 md:p-8 lg:p-10 shadow-[0_2px_10px_rgb(0,0,0,0.02)] min-h-[400px]">

            {/* Overview */}
            {activeTab === "Overview" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Course</h2>
                <div className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 mb-10">
                  <p>
                    Unlock the power of Figma, the leading collaborative design tool, with our comprehensive online course. Whether you're a novice or looking to enhance your skills, this course will guide you through Figma's robust features and workflows.
                  </p>
                  <p>
                    Perfect for UI/UX designers, product managers, and anyone interested in modern design tools. Join us to elevate your design skills and boost your productivity with Figma!
                  </p>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Setting up the environment",
                    "Understand HTML Programming",
                    "Advanced HTML Practices",
                    "Code HTML",
                    "Build a portfolio website",
                    "Start building beautiful websites",
                    "Responsive Designs"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E5F5EC] dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" strokeWidth={3} />
                      </div>
                      <span className="text-[14px] text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            {activeTab === "Author" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center max-w-2xl mx-auto">
                <Avatar className="w-24 h-24 mb-5 border-4 border-white dark:border-zinc-800 shadow-xl">
                  <AvatarImage src="https://i.pravatar.cc/150?img=9" />
                  <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Crystal Lucas</h2>
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                </div>
                <p className="text-[#7956ED] font-bold text-[14px] tracking-widest uppercase mb-6">Senior UI/UX Designer</p>
                <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  Crystal is a seasoned UI/UX designer with over a decade of experience crafting intuitive digital products for Fortune 500 companies. She is passionate about teaching and has helped over 50,000 students master Figma and modern design workflows.
                </p>
                <Button className="bg-black hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-full px-8 py-6 font-bold shadow-lg">
                  Follow Instructor
                </Button>
              </div>
            )}

            {/* FAQ */}
            {activeTab === "FAQ" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                <div className="flex flex-col gap-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-zinc-800/30">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800/50 outline-none"
                      >
                        <span className="font-bold text-[15px] text-gray-900 dark:text-white">{faq.q}</span>
                        {expandedFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </button>
                      {expandedFaq === idx && (
                        <div className="p-5 pt-0 text-[15px] text-gray-600 dark:text-gray-400 animate-in fade-in slide-in-from-top-2 duration-300">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Announcements */}
            {activeTab === "Announcements" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Updates</h2>
                {announcements.map((ann, idx) => (
                  <div key={idx} className="flex gap-5 border-b border-gray-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0">
                    <div className="w-12 h-12 rounded-full bg-[#F0EAFC] dark:bg-[#7956ED]/10 flex items-center justify-center flex-shrink-0 text-[#7956ED]">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-[16px] text-gray-900 dark:text-white">{ann.title}</span>
                        <span className="text-[12px] text-gray-400 font-medium px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md">{ann.date}</span>
                      </div>
                      <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{ann.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "Reviews" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Reviews</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">4.5</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-yellow-500 fill-yellow-500" : "text-yellow-500/30"}`} />
                        ))}
                      </div>
                      <span className="text-[12px] text-gray-400 font-medium">Based on 126 reviews</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((rev, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-zinc-800/30 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={rev.avatar} />
                            <AvatarFallback>{rev.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-[15px] text-gray-900 dark:text-white">{rev.name}</div>
                            <div className="text-[12px] text-gray-400 font-medium">{rev.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-yellow-500/30"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes / Resources */}
            {activeTab === "Notes" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Materials</h2>
                    <p className="text-[14px] text-gray-500 mt-1">Downloadable resources provided by the instructor.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseResources.map((resource, idx) => (
                    <div key={idx} className="flex items-center p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#F0EAFC] dark:bg-[#7956ED]/10 flex items-center justify-center flex-shrink-0 text-[#7956ED] mr-4">
                        <File className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[15px] text-gray-900 dark:text-white truncate pr-4">{resource.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-bold px-2 py-0.5 bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 rounded uppercase tracking-wider">{resource.type}</span>
                          <span className="text-[12px] text-gray-400 font-medium">{resource.size}</span>
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7956ED] hover:bg-white dark:hover:bg-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Sidebar - Sticky & Scrollable */}
        <div className="w-full xl:w-[380px] flex-shrink-0 flex flex-col gap-6 xl:sticky xl:top-8 xl:h-[calc(100vh-100px)] xl:overflow-y-auto hover-scrollbar pb-8">

          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[28px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            {/* Progress Bar moved into Course Content */}
            <div className="mb-6 bg-gray-50 dark:bg-zinc-800/30 p-4 rounded-2xl border border-gray-100/50 dark:border-zinc-800/50">
              <div className="flex items-center justify-between text-[13px] font-bold text-gray-900 dark:text-white mb-2">
                <span>Your Progress</span>
                <span className="text-[#7956ED]">45%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#7956ED] rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Course content</h2>
            <div className="flex flex-col gap-2">
              {courseModules.map((module, idx) => {
                const isExpanded = expandedModules.includes(idx);
                return (
                  <div key={idx} className="border-b border-gray-50 dark:border-zinc-800/50 last:border-0 pb-3 mb-2 last:mb-0 last:pb-0">
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between py-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#7956ED] rounded-lg transition-all"
                    >
                      <span className="text-[14px] font-bold text-gray-900 dark:text-white group-hover:text-[#7956ED] transition-colors">
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

          {/* Author Card moved to right sidebar */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[28px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Instructor</h2>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://i.pravatar.cc/150?img=9" />
                  <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-gray-900 dark:text-white">Crystal Lucas</span>
                    <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </div>
                  </div>
                  <div className="text-[12px] text-gray-500 font-medium mt-0.5">UI/UX Specialist</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-gray-900 dark:text-white">
                <Star className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
                (4.8)
              </div>
            </div>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-5">
              Crystal is a seasoned UI/UX designer with over a decade of experience crafting intuitive digital products.
            </p>
            <Button variant="outline" className="w-full rounded-full border-gray-200 dark:border-zinc-700 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors py-5">
              View Profile
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}
