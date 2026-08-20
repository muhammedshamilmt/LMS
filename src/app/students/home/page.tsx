"use client";

import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Calendar, Bell, ChevronRight, PlayCircle, BookOpen, Clock, Activity, Search, MoreVertical, PenTool, MonitorSmartphone, TrendingUp, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProgressCard } from "@/components/progress-card";
import { CourseCard } from "@/components/course-card";


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

const categoryIcons: Record<string, React.ReactNode> = {
  "UI/UX Design": <PenTool className="w-5 h-5" />,
  "Branding": <TrendingUp className="w-5 h-5" />,
  "Front End": <MonitorSmartphone className="w-5 h-5" />,
  "General": <BookOpen className="w-5 h-5" />
};

const categoryColors: Record<string, { bg: string, text: string }> = {
  "UI/UX Design": { bg: "bg-[#F0EAFC] dark:bg-[#7956ED]/10", text: "text-[#7956ED]" },
  "Branding": { bg: "bg-[#FCE8F3] dark:bg-[#E85D9E]/10", text: "text-[#E85D9E]" },
  "Front End": { bg: "bg-[#E6F3F8] dark:bg-[#3BA6D4]/10", text: "text-[#3BA6D4]" },
  "General": { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-500" }
};

export default function HomePage() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(`/api/student/dashboard`, fetcher);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-6 w-full items-center">
          <Skeleton className="h-10 w-2/3 md:w-[400px] rounded-2xl" />
          <Skeleton className="h-10 w-10 rounded-full ml-auto" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <Skeleton className="h-[300px] rounded-[40px]" />
          </div>
          <div className="col-span-1 space-y-4">
            <Skeleton className="h-[300px] rounded-[40px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500 font-bold text-center w-full mt-20">Failed to load dashboard. Ensure the database tables exist.</div>;
  }

  const { enrolledCourses = [], suggestedCourses = [], watchedTags = [], recentLessons = [] } = data || {};

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
            <span className="text-xs font-semibold  uppercase mb-4 text-white/80">Online Course</span>
            <h1 className="text-3xl lg:text-4xl xl:text-[42px] font-bold max-w-[500px] leading-[1.2] mb-8">
              Sharpen Your Skills with Professional Online Courses
            </h1>
            <Button onClick={() => router.push('/students/courses')} className="bg-black hover:bg-black/80 text-white rounded-full px-6 py-6 text-[15px] font-semibold flex items-center gap-3 group border-none shadow-xl shadow-black/10">
              Explore Courses
              <span className="bg-white text-black rounded-full p-1.5 group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>

        {/* Watched Tags */}
        {watchedTags.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
            {watchedTags.map((tag: any) => {
              const colors = categoryColors[tag.category] || categoryColors["General"];
              const icon = categoryIcons[tag.category] || categoryIcons["General"];
              return (
                <div key={tag.category} className="flex items-center justify-between gap-6 bg-white dark:bg-zinc-900 p-3 pr-4 rounded-[20px] min-w-[240px] border border-gray-100 dark:border-zinc-800 h transition cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
                      {icon}
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-medium mb-0.5">{tag.completed}/{tag.total} watched</div>
                      <div className="font-bold text-[14px]">{tag.category}</div>
                    </div>
                  </div>
                  <MoreVertical className="w-5 h-5 text-gray-300 hover:text-gray-500 transition" />
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Watching */}
        {enrolledCourses.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Watching</h2>
              <Button variant="link" onClick={() => router.push('/students/courses')} className="text-[13px] text-[#7956ED] font-semibold hover:underline p-0 h-auto">See all</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course: any, i: number) => {
                const bgColors = ["bg-[#FDE2ED] dark:bg-pink-900/20", "bg-[#E1F2FB] dark:bg-blue-900/20", "bg-[#D1F2D6] dark:bg-green-900/20", "bg-[#F0EAFC] dark:bg-purple-900/20"];
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
          </div>
        )}

        {/* Suggested Courses */}
        {suggestedCourses.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Suggested Courses</h2>
              <Button variant="link" onClick={() => router.push('/students/courses')} className="text-[13px] text-[#7956ED] font-semibold hover:underline p-0 h-auto">See all</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedCourses.map((course: any, i: number) => {
                const bgColors = ["bg-[#FDE2ED] dark:bg-pink-900/20", "bg-[#E1F2FB] dark:bg-blue-900/20", "bg-[#D1F2D6] dark:bg-green-900/20"];
                const bgColor = bgColors[i % bgColors.length];
                return (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    topBadge={course.category || "General"}
                    category={course.category || "General"}
                    title={course.title}
                    tags={course.tags && course.tags.length > 0 ? course.tags : ["Online"]}
                    price={course.price ? `$${course.price}` : "Free"}
                    instructor={course.author_name || "Platform Instructor"}
                    bgColor={bgColor}
                    logoUrl={course.thumbnail_url}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Your Lesson Table */}
        {recentLessons.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Lessons</h2>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[24px] p-2 md:p-6 border border-gray-100 dark:border-zinc-800 overflow-x-auto">
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
                  {recentLessons.map((lesson: any) => {
                    const dateObj = new Date(lesson.enrolledAt);
                    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
                    const colors = categoryColors[lesson.category] || categoryColors["General"];
                    return (
                      <tr key={lesson.id} onClick={() => router.push(`/students/courses/${lesson.id}`)} className="cursor-pointer border-b border-gray-50 dark:border-zinc-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition group">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10 border border-gray-100 dark:border-zinc-800">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lesson.author_name}`} />
                              <AvatarFallback>{lesson.author_name ? lesson.author_name.charAt(0) : "M"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-[14px] font-semibold text-gray-900 dark:text-white">{lesson.author_name || "Platform Instructor"}</div>
                              <div className="text-[11px] text-gray-400 font-medium mt-0.5">{formattedDate}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`inline-flex items-center px-3 py-1.5 rounded-lg ${colors.bg} ${colors.text} text-[10px] font-bold tracking-wider uppercase`}>
                            {lesson.category || "General"}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[14px] font-semibold text-gray-700 dark:text-gray-300">
                          {lesson.title}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-zinc-700 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7956ED] hover:border-[#7956ED] transition ml-auto">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
