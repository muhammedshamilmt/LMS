"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CourseCard } from "@/components/course-card";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CoursePage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const { data: courses, error, isLoading } = useSWR('/api/courses', fetcher);

  const toggleFilter = (label: string, checked: boolean) => {
    if (checked) {
      setSelectedFilters((prev) => [...prev, label]);
    } else {
      setSelectedFilters((prev) => prev.filter((f) => f !== label));
    }
  };

  const removeFilter = (label: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== label));
  };

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((course: any) => {
      // Text Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title?.toLowerCase().includes(q);
        const matchesCategory = course.category?.toLowerCase().includes(q);
        const matchesAuthor = course.authorName?.toLowerCase().includes(q);
        const matchesTags = course.tags?.some((t: string) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCategory && !matchesAuthor && !matchesTags) return false;
      }
      
      // Facet Filtering (OR logic across selected filters)
      if (selectedFilters.length > 0) {
        const matchesFilter = selectedFilters.some(f => 
            course.category?.toLowerCase() === f.toLowerCase() ||
            course.tags?.some((t: string) => t.toLowerCase() === f.toLowerCase())
        );
        if (!matchesFilter) return false;
      }
      
      return true;
    });
  }, [courses, searchQuery, selectedFilters]);

  return (
    <div className="flex gap-10">
      {/* Main Column */}
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${isFiltersOpen ? 'pr-0' : 'pr-10'}`}>
        {/* Header section */}
        <div className="flex flex-col items-center text-center mt-6 mb-12">
          <h2 className="text-[42px] font-bold dark:text-white text-gray-900 mb-4 tracking-tight">Level up your skills</h2>
          <p className="text-gray-500 max-w-lg mb-8 text-[15px]">
            Explore top courses, learn from industry experts, and build job-ready skills for your future!
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-4 bg-transparent">
            <div className="relative flex items-center w-[400px]">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by course, people, theme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-[15px]"
              />
            </div>

            <div
              className={`relative bg-[#F3F4F6] p-3.5 rounded-full cursor-pointer hover:bg-gray-200 transition ${!isFiltersOpen ? 'bg-black text-white hover:bg-black/80' : ''}`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className={`w-5 h-5 ${!isFiltersOpen ? 'text-white' : 'text-gray-700'}`} />
              {selectedFilters.length > 0 && (
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7956ED] text-[10px] font-bold text-white border-2 border-[#F3F4F6] dark:border-zinc-900">
                  {selectedFilters.length}
                </span>
              )}
            </div>

            <Button className="rounded-full px-8 py-6 font-semibold dark:bg-white bg-black hover:bg-black/90 dark:text-black text-[15px]">
              Search
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="p-6 md:p-8 dark:bg-black rounded-[40px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading && (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="h-[200px] w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </>
          )}

          {!isLoading && filteredCourses.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}

          {!isLoading && filteredCourses.map((course: any, idx: number) => {
            const bgColors = ["bg-[#FFE4D6] dark:bg-orange-900/20", "bg-[#D1F2D6] dark:bg-green-900/20", "bg-[#E2D9F3] dark:bg-purple-900/20", "bg-[#D6EFFF] dark:bg-blue-900/20", "bg-[#FDE2ED] dark:bg-pink-900/20", "bg-[#F3F4F6] dark:bg-zinc-800/50"];
            const bgColor = bgColors[idx % bgColors.length];
            return (
              <CourseCard
                key={course.id}
                id={course.id}
                topBadge={course.isDraft ? "Draft" : "Published"}
                category={course.category || "General"}
                title={course.title}
                tags={course.tags && course.tags.length > 0 ? course.tags : ["Online"]}
                price={course.price || "Free"}
                instructor={course.authorName ? `By ${course.authorName}` : "Platform Instructor"}
                bgColor={bgColor}
                logoUrl={course.thumbnailUrl}
                logoFallback={course.category ? course.category[0] : "C"}
              />
            );
          })}
        </div>
      </div>

      {/* Right Sidebar Filters */}
      {isFiltersOpen && (
        <div className="w-[320px] flex flex-col flex-shrink-0 pt-6 p-8 border-l border-gray-100 animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Filters</h3>
            <div className="p-1.5 bg-black rounded-full">
              <X
                className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white transition"
                onClick={() => setIsFiltersOpen(false)}
              />
            </div>
          </div>

          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedFilters.map(filter => (
                <Badge key={filter} variant="secondary" className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium flex gap-2 items-center shadow-sm">
                  {filter} <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-black" onClick={() => removeFilter(filter)} />
                </Badge>
              ))}
            </div>
          )}

          {/* Filter Sections */}
          <div className="space-y-8">
            <FilterSection title="Difficulty Level">
              {['Beginner', 'Intermediate', 'Advanced'].map(f => (
                <FilterItem key={f} label={f} checked={selectedFilters.includes(f)} onChange={(c) => toggleFilter(f, c)} />
              ))}
            </FilterSection>

            <FilterSection title="Course Duration">
              {['Less than 1 month', '1-3 months', '3+ months', '6+ months'].map(f => (
                <FilterItem key={f} label={f} checked={selectedFilters.includes(f)} onChange={(c) => toggleFilter(f, c)} />
              ))}
            </FilterSection>

            <FilterSection title="Popularity">
              {['Most Enrolled', 'Highest Rated', 'Trending'].map(f => (
                <FilterItem key={f} label={f} checked={selectedFilters.includes(f)} onChange={(c) => toggleFilter(f, c)} />
              ))}
            </FilterSection>

            <FilterSection title="Language">
              {['English', 'Spanish', 'German'].map(f => (
                <FilterItem key={f} label={f} checked={selectedFilters.includes(f)} onChange={(c) => toggleFilter(f, c)} />
              ))}
            </FilterSection>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers for the filters
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[13px] font-medium text-gray-400 uppercase tracking-wide">{title}</h4>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

function FilterItem({ label, checked = false, onChange }: { label: string; checked?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox 
        id={label} 
        checked={checked} 
        onCheckedChange={(c) => onChange && onChange(c === true)}
        className="w-5 h-5 rounded-[4px] border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white" 
      />
      <label
        htmlFor={label}
        className="text-[15px] font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
