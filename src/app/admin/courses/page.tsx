"use client";
import React, { useState } from 'react';
import { CourseCard } from '@/components/course-card';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CourseSkeleton = () => (
  <div className="flex flex-col gap-4 p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
    <div className="w-2/3 h-6 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
    <div className="w-1/2 h-4 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
    <div className="flex gap-2 mt-2">
      <div className="w-16 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
      <div className="w-16 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between">
      <div className="w-1/3 h-5 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
      <div className="w-1/4 h-5 bg-gray-200 dark:bg-zinc-800 rounded-md"></div>
    </div>
  </div>
);

export default function AdminCoursesPage() {
  const { data: courses, error, isLoading } = useSWR('/api/courses', fetcher);


  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Courses</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">Manage and create courses for your platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 bg-white dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-500 transition-colors"
            />
          </div>
          <Button variant="outline" className="gap-2 rounded-full border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10 hover:bg-gray-50 py-5 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Link href="/admin/courses/new">
            <Button className="gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:text-white border-0 py-5 transition-colors">
              <Plus className="w-5 h-5" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading && (
          <>
            <CourseSkeleton />
            <CourseSkeleton />
            <CourseSkeleton />
          </>
        )}
        {error && <p className="text-red-500">Failed to load courses</p>}
        {!isLoading && !error && courses?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
            <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-1">No courses found</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">You haven't created any courses yet.</p>
            <Link href="/admin/courses/new">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create your first course
              </Button>
            </Link>
          </div>
        )}
        {!isLoading && !error && courses?.map((course: any, idx: number) => {
          const bgColors = ["bg-[#FFE4D6]", "bg-[#D1F2D6]", "bg-[#E2D9F3]", "bg-[#D6EFFF]", "bg-[#FDE2ED]", "bg-[#F3F4F6]"];
          const bgColor = bgColors[idx % bgColors.length];
          return (
            <CourseCard
              key={course.id}
              adminView={true}
              id={course.id}
              topBadge={course.category || "General"}
              category={course.category || "Uncategorized"}
              title={course.title}
              tags={course.tags || []}
              price={course.price || "Free"}
              instructor={course.authorName || "Unknown"}
              bgColor={bgColor}
              logoUrl={course.thumbnailUrl}
              logoFallback={course.title?.charAt(0) || "C"}
            />
          );
        })}
      </div>
    </div>
  );
}