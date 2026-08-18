"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
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
import { CustomVideoPlayer } from "@/components/ui/custom-video-player";
import { PlaySquare } from "lucide-react";

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;

  let videoId = '';
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com') && !url.includes('embed/')) {
    return 'invalid';
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const isDirectVideo = (url: string) => {
  if (!url) return false;
  if (url.startsWith('temp:')) return true;
  if (url.startsWith('blob:')) return true;
  if (url.includes('supabase.co') && url.includes('/storage/')) return true;
  if (url.includes('imagekit.io')) return true;
  if (url.match(/\.(mp4|webm|ogg)$/i)) return true;
  return false;
};

const getFullSrc = (url: string) => {
  if (!url) return '';
  if (url.startsWith('temp:')) {
    const path = url.replace('temp:', '');
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lms_temp_uploads/${path}`;
  }
  return url;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

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


export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { data: courseData, error, isLoading } = useSWR(`/api/courses/${id}`, fetcher);
  const { data: enrollmentData, mutate: mutateEnrollment } = useSWR(`/api/enrollments?courseId=${id}`, fetcher);
  const { data: progressData, mutate: mutateProgress } = useSWR(`/api/progress?courseId=${id}`, fetcher);

  const isEnrolled = enrollmentData?.enrolled || false;
  const completedModules = progressData?.completedModules || [];

  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleEnroll = async () => {
    mutateEnrollment({ enrolled: true }, false);
    await fetch('/api/enrollments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: id })
    });
    mutateEnrollment();
    handleContinue();
  };

  const handleContinue = () => {
    setIsStarted(true);
    setShowVideo(true);
    let firstVideoUrl = null;
    const modules = courseData?.modules || courseModules;
    for (const mod of modules) {
      if (mod.mediaUrl) {
        firstVideoUrl = mod.mediaUrl;
        break;
      }
    }
    setActiveVideoUrl(firstVideoUrl);
  };

  const handleCompleteModule = async () => {
    if (isCompleting || !activeVideoUrl) return;
    const modules = courseData?.modules || courseModules;
    const activeModule = modules.find((m: any) => m.mediaUrl === activeVideoUrl || (m.lessons && m.lessons.some((l: any) => l.mediaUrl === activeVideoUrl)));
    if (!activeModule) return;
    
    setIsCompleting(true);
    mutateProgress({ completedModules: [...completedModules, activeModule.id] }, false);

    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: id, moduleId: activeModule.id })
    });
    
    mutateProgress();
    setIsCompleting(false);
  };

  const currentModule = (courseData?.modules || courseModules).find((m: any) => m.mediaUrl === activeVideoUrl || (m.lessons && m.lessons.some((l: any) => l.mediaUrl === activeVideoUrl)));
  const isCurrentModuleCompleted = currentModule ? completedModules.includes(currentModule.id) : false;
  const totalModules = (courseData?.modules || courseModules).length || 1;
  const progressPercentage = isEnrolled ? Math.round((completedModules.length / totalModules) * 100) : 0;


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
        <span className="hover:text-black dark:hover:text-white transition cursor-pointer">{courseData?.category || "General"}</span>
        <ChevronRight className="w-3.5 h-3.5 mx-2" />
        <span className="text-black dark:text-white">{courseData?.title || "Course"}</span>
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{courseData?.title || "Course"}</h1>
                <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-[11px] font-bold uppercase tracking-wider rounded-full border border-gray-200 dark:border-zinc-700">
                  {courseData?.category || "General"}
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
              {!isEnrolled ? (
                <Button onClick={handleEnroll} className="bg-[#7956ED] hover:bg-[#6842df] text-white rounded-full px-8 h-11 font-bold shadow-lg shadow-[#7956ED]/20 border-none transition-transform active:scale-95">
                  Enroll Now
                </Button>
              ) : !isStarted ? (
                <Button onClick={handleContinue} className="bg-[#7956ED] hover:bg-[#6842df] text-white rounded-full px-8 h-11 font-bold shadow-lg shadow-[#7956ED]/20 border-none transition-transform active:scale-95">
                  Continue Course
                </Button>
              ) : (
                <Button onClick={handleCompleteModule} disabled={isCompleting || isCurrentModuleCompleted} className={`${isCurrentModuleCompleted ? 'bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-default' : 'bg-[#20d5a5] hover:bg-[#20d5a5] shadow-[#20d5a5]/20 text-white'} rounded-full px-8 h-11 font-bold flex items-center shadow-lg border-none transition-transform active:scale-95`}>
                  <Check className="w-5 h-5 mr-1.5" strokeWidth={3} />
                  {isCurrentModuleCompleted ? 'Completed' : 'Complete'}
                </Button>
              )}
            </div>
          </div>

          {/* Video Player */}
          <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-[32px] overflow-hidden mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            {showVideo ? (
              isDirectVideo(activeVideoUrl || courseData?.videoUrl) ? (
                <CustomVideoPlayer src={activeVideoUrl || courseData?.videoUrl} />
              ) : getEmbedUrl(activeVideoUrl || courseData?.videoUrl) === 'invalid' ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                  <PlaySquare className="w-12 h-12 mb-2 opacity-50 text-red-400" />
                  <span>Invalid Video URL</span>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(activeVideoUrl || courseData?.videoUrl)}
                  title="Course Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )
            ) : (
              <div
                className="relative w-full h-full group cursor-pointer"
                onClick={() => (activeVideoUrl || courseData?.videoUrl) && setShowVideo(true)}
              >
                {/* The main thumbnail image */}
                <img
                  src={courseData?.thumbnailUrl ? getFullSrc(courseData.thumbnailUrl) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_idILmOBQ7fSJVY1j7Kncw8M5LiQi5Uk-C5CSSyi0A&s=10"}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover rounded-[32px]"
                />

                {(activeVideoUrl || courseData?.videoUrl) && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVideo(true);
                      }}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 dark:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110 active:!scale-95 pointer-events-auto"
                    >
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black ml-1.5" fill="currentColor" />
                    </button>
                  </div>
                )}

                {/* Gradient Overlay for bottom elements */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-0 rounded-b-[32px]"></div>
              </div>
            )}
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
          </div>

          {/* Tab Content Container */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[28px] p-6 md:p-8 lg:p-10 shadow-[0_2px_10px_rgb(0,0,0,0.02)] min-h-[400px]">

            {/* Overview */}
            {activeTab === "Overview" && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About this course</h3>
                <div className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 mb-8">
                  <p>{courseData?.aboutText1 || "No description provided."}</p>
                  {courseData?.aboutText2 && <p>{courseData.aboutText2}</p>}
                </div>

                {courseData?.whatYouLearn?.length > 0 && (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      {courseData.whatYouLearn.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E5F5EC] dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" strokeWidth={3} />
                          </div>
                          <span className="text-[14px] text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Author */}
            {activeTab === "Author" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex flex-col items-center text-center p-8 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border border-gray-100 dark:border-zinc-800">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-zinc-800 shadow-md mb-6">
                    <AvatarImage src={courseData?.authorAvatarUrl || "https://i.pravatar.cc/150?img=11"} />
                    <AvatarFallback>{courseData?.authorName?.[0] || "I"}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{courseData?.authorName || "Platform Instructor"}</h3>
                  <p className="text-[#7956ED] font-semibold mb-6">{courseData?.authorRole || "Expert Instructor"}</p>
                  <p className="text-[15px] text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                    {courseData?.authorBio || "Passionate educator focused on delivering high-quality learning experiences."}
                  </p>
                </div>
              </div>
            )}

            {/* FAQ */}
            {activeTab === "FAQ" && (
              <div className="animate-in fade-in duration-300 space-y-4">
                {(courseData?.faqs || faqs).map((faq: any, idx: number) => (
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
            )}

            {/* Announcements */}
            {activeTab === "Announcements" && (
              <div className="animate-in fade-in duration-300 space-y-6">
                {courseData?.announcements?.length > 0 ? courseData.announcements.map((ann: any, idx: number) => (
                  <div key={idx} className="p-6 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group hover:border-[#7956ED]/30 transition-colors">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7956ED]"></div>
                    <div className="flex justify-between items-start mb-3 pl-3">
                      <h4 className="font-bold text-[17px] text-gray-900 dark:text-white">{ann.title}</h4>
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 dark:bg-zinc-900 px-3 py-1 rounded-full">{ann.date}</span>
                    </div>
                    <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed pl-3">{ann.content}</p>
                  </div>
                )) : (
                  <div className="text-center py-10 text-gray-500">No announcements yet.</div>
                )}
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
                  {courseData?.resources?.length > 0 ? courseData.resources.map((resource: any, idx: number) => (
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
                      <a href={getFullSrc(resource.url)} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7956ED] hover:bg-white dark:hover:bg-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  )) : (
                    <div className="text-gray-500 py-4 col-span-2 text-center">No materials provided for this course.</div>
                  )}
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
                <span className="text-[#7956ED]">{progressPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#7956ED] rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Course content</h2>
            <div className="flex flex-col gap-2">
              {isLoading && (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              )}
              {!isLoading && (courseData?.modules || courseModules).map((module: any, idx: number) => {
                const isExpanded = expandedModules.includes(idx);
                return (
                  <div key={idx} className="border-b border-gray-50 dark:border-zinc-800/50 last:border-0 pb-3 mb-2 last:mb-0 last:pb-0">
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between text-start py-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#7956ED] rounded-lg transition-all"
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
                    {isExpanded && module.lessons && module.lessons.length > 0 && (
                      <div className="flex flex-col gap-1 pt-2 pb-3 animate-in fade-in slide-in-from-top-1 duration-200">
                        {module.lessons.map((lesson: any, lIdx: number) => (
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
                  <AvatarImage src={courseData?.authorAvatarUrl || "https://i.pravatar.cc/150?img=11"} />
                  <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-gray-900 dark:text-white">{courseData?.authorName}</span>
                    <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </div>
                  </div>
                  <div className="text-[12px] text-gray-500 font-medium mt-0.5">{courseData?.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-gray-900 dark:text-white">
                <Star className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
                (4.8)
              </div>
            </div>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-5">
              {courseData?.authorBio}
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
