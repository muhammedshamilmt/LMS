"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
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
  Play,
  Maximize,
  MessageSquare,
  Lock
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomVideoPlayer } from "@/components/ui/custom-video-player";


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

export default function CourseEnrollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { data: courseData, error, isLoading } = useSWR(`/api/courses/${id}`, fetcher);
  const { data: enrollmentData } = useSWR(`/api/enrollments?courseId=${id}`, fetcher);
  const isEnrolled = enrollmentData?.enrolled || false;
  
  const [expandedModules, setExpandedModules] = useState<number[]>([0]); // Default open first section
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();

  const handleEnroll = () => {
    if (courseData) {
      const cartItem = {
        id: id,
        title: courseData.title || "Premium Course",
        author: courseData.authorName || "Platform Instructor",
        thumbnail: courseData.thumbnailUrl ? getFullSrc(courseData.thumbnailUrl) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_idILmOBQ7fSJVY1j7Kncw8M5LiQi5Uk-C5CSSyi0A&s=10",
        rating: 4.8,
        reviews: 126,
        price: courseData.price || 0,
        originalPrice: Math.round((courseData.price || 0) * 1.2),
        lectures: (courseData?.modules || []).reduce((acc: number, mod: any) => acc + (mod.lessons?.length || 0), 0) || 38,
        duration: "4h 30min",
        level: "All Levels"
      };
      localStorage.setItem('lms_cart', JSON.stringify([cartItem]));
    }
    toast.success("Course added to cart");
    setTimeout(() => {
      router.push("/students/cart");
    }, 1000);
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

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }

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
        <span className="hover:text-black dark:hover:text-white transition cursor-pointer">{courseData?.category || "General"}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-300 dark:text-gray-600">{courseData?.title || "Course Details"}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

        {/* Left Column - Course Presentation */}
        <div className="flex-1 w-full max-w-3xl">

          {/* Hero Thumbnail Wrapper */}
          <div className="relative w-full mb-12">
            
            {/* Hero Thumbnail Container (overflow-hidden) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
              {courseData?.videoUrl && showVideo ? (
                isDirectVideo(courseData.videoUrl) ? (
                  <CustomVideoPlayer src={courseData.videoUrl} />
                ) : getEmbedUrl(courseData.videoUrl) === 'invalid' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <PlaySquare className="w-12 h-12 mb-2 opacity-50 text-red-400" />
                    <span>Invalid Video URL</span>
                  </div>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={getEmbedUrl(courseData.videoUrl)}
                    title="Course Promo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )
              ) : (
                <div
                  className="relative w-full h-full group cursor-pointer"
                  onClick={() => courseData?.videoUrl && setShowVideo(true)}
                >
                  {/* The main thumbnail image */}
                  <img
                    src={courseData?.thumbnailUrl ? getFullSrc(courseData.thumbnailUrl) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_idILmOBQ7fSJVY1j7Kncw8M5LiQi5Uk-C5CSSyi0A&s=10"}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover rounded-[32px]"
                  />

                  {courseData?.videoUrl && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                      <button className="w-20 h-20 bg-white/90 dark:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 hover:!scale-110 active:!scale-95 pointer-events-auto">
                        <Play className="w-8 h-8 text-black ml-1.5" fill="currentColor" />
                      </button>
                    </div>
                  )}

                  {/* Gradient Overlay for bottom elements */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-0 rounded-b-[32px]"></div>
                </div>
              )}
            </div>

            {/* Avatar Overlay (Now outside overflow-hidden) */}
            <div className={`absolute -bottom-8 left-6 md:left-10 bg-white dark:bg-[#0a0a0a] p-1 rounded-[20px] border border-gray-100/50 dark:border-zinc-800/50 z-30 ${showVideo ? 'hidden' : 'block'}`}>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[16px] overflow-hidden bg-gray-200 dark:bg-zinc-800">
                <img
                  src={courseData?.authorAvatarUrl ? getFullSrc(courseData.authorAvatarUrl) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_idILmOBQ7fSJVY1j7Kncw8M5LiQi5Uk-C5CSSyi0A&s=10"}
                  alt="Instructor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Rating Overlay */}
            <div className="absolute bottom-4 right-6 bg-black/60 backdrop-blur-md rounded-2xl px-4 py-2.5  border border-white/10 flex flex-col items-end z-30">
              <span className="text-white text-[12px] font-bold mb-1 opacity-90">0 reviews</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-gray-500 fill-gray-500" />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-2">
            <p className="text-[14px] text-gray-500 font-medium mb-2">
              A course by <span className="font-bold text-gray-900 dark:text-white">{courseData?.authorName || "Platform Instructor"}</span>
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-[54px] font-bold text-gray-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
              {courseData?.title || "Course Title"}
            </h1>

            <div className="text-[16px] text-gray-600 dark:text-gray-300 leading-[1.8] space-y-6 font-medium mb-16">
              <p>{courseData?.aboutText1 || courseData?.detailedDescription || courseData?.shortDescription || "No description provided."}</p>
            </div>

            {/* Course Table of Contents */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">Course Table of Contents</p>
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
                      {isExpanded && module.lessons && module.lessons.length > 0 && (
                        <div className="flex flex-col gap-1 pt-2 pb-2 animate-in fade-in slide-in-from-top-1 duration-200">
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
          </div>
        </div>

        {/* Right Column - Purchase Details */}
        <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col pt-2 lg:pt-0">

          <div className="mb-8">
            <div className="flex items-baseline gap-2 text-gray-900 dark:text-white mb-6">
              <span className="text-5xl font-bold tracking-tight">{courseData?.price?.replace('$', '') || "Free"}</span>
              <span className="text-xl font-bold">{courseData?.price ? 'USD' : ''}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30">
                <PlaySquare className="w-5 h-5 text-gray-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lessons</span>
                  <span className="font-bold text-gray-900 dark:text-white text-[14px]">{courseData?.modules?.reduce((acc: number, mod: any) => acc + (mod.lessons?.length || 0), 0) || 0}</span>
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
                <div><span className="text-gray-500">Additional resources:</span> <span className="font-bold text-gray-900 dark:text-white">{courseData?.resources?.length || 0} files</span></div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div><span className="text-gray-500">Duration:</span> <span className="font-bold text-gray-900 dark:text-white">Self-paced</span></div>
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
              {isEnrolled ? (
                <button onClick={() => router.push(`/students/courses/${id}`)} className="flex-1 h-14 bg-[#7956ED] hover:bg-[#6842df] text-white rounded-2xl font-bold text-[15px] shadow-md transition-transform active:scale-95 flex items-center justify-center cursor-pointer">
                  <PlaySquare className="w-5 h-5 mr-2" /> Watch now
                </button>
              ) : (
                <>
                  <button onClick={handleEnroll} className="flex-1 h-14 bg-[#111] hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-2xl font-bold text-[15px] shadow-md transition-transform active:scale-95 flex items-center justify-center cursor-pointer">
                    <PlaySquare className="w-5 h-5 mr-2" /> Add to cart
                  </button>
                  <Button variant="outline" className="flex-1 h-14 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white rounded-2xl font-bold text-[15px] hover:bg-gray-50 dark:hover:bg-zinc-800 transition-transform active:scale-95">
                    <Gift className="w-5 h-5 mr-2" /> Buy as a gift
                  </Button>
                </>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
