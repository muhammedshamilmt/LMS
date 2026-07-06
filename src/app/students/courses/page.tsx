"use client";

import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CourseCard } from "@/components/course-card";

export default function CoursePage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
                className="pl-12 pr-4 py-6 rounded-full border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-[15px]"
              />
            </div>

            <div
              className={`relative bg-[#F3F4F6] p-3.5 rounded-full cursor-pointer hover:bg-gray-200 transition ${!isFiltersOpen ? 'bg-black text-white hover:bg-black/80' : ''}`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className={`w-5 h-5 ${!isFiltersOpen ? 'text-white' : 'text-gray-700'}`} />
              {isFiltersOpen && (
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white border-2 border-[#F3F4F6]">
                  3
                </span>
              )}
            </div>

            <Button className="rounded-full px-8 py-6 font-semibold dark:bg-white bg-black hover:bg-black/90 dark:text-black text-[15px]">
              Search
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="p-6 md:p-8 dark:bg-black rounded-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1800px] mx-auto w-full">
          <CourseCard id="1"
            topBadge="Start: 20 May"
            category="Design"
            title="Advanced UI/UX Masterclass"
            tags={["12 Weeks", "Senior level", "Online", "Certificate"]}
            price="$250"
            instructor="By Amazon Academy"
            bgColor="bg-[#FFE4D6]"
            logoFallback="a"
          />
          <CourseCard id="1"
            topBadge="Start: 4 Feb"
            category="Design"
            title="Junior UI/UX Bootcamp"
            tags={["8 Weeks", "Junior level", "Online", "Mentorship"]}
            price="$150"
            instructor="By Google Developers"
            bgColor="bg-[#D1F2D6]"
            logoFallback="G"
          />
          <CourseCard id="1"
            topBadge="Start: 29 Jan"
            category="Animation"
            title="Senior Motion Design"
            tags={["10 Weeks", "Senior level", "Live Classes"]}
            price="$260"
            instructor="By Dribbble Studio"
            bgColor="bg-[#E2D9F3]"
            logoFallback="D"
          />
          <CourseCard id="1"
            topBadge="Start: 11 Apr"
            category="Research"
            title="UX Research Methods"
            tags={["6 Weeks", "Middle level", "Online", "Certificate"]}
            price="$120"
            instructor="By Twitter Design"
            bgColor="bg-[#D6EFFF]"
            logoFallback="T"
          />
          <CourseCard id="1"
            topBadge="Start: 2 Apr"
            category="Design"
            title="Graphic Design Principles"
            tags={["8 Weeks", "Senior level"]}
            price="$300"
            instructor="By Airbnb Creative"
            bgColor="bg-[#FDE2ED]"
            logoFallback="A"
          />
          <CourseCard id="1"
            topBadge="Start: 18 Jan"
            category="Design"
            title="Apple Design Language"
            tags={["12 Weeks", "Online"]}
            price="$140"
            instructor="By Apple Design"
            bgColor="bg-[#F3F4F6]"
            logoFallback="A"
          />
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
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="secondary" className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium flex gap-2 items-center shadow-sm">
              Intermediate <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-black" />
            </Badge>
            <Badge variant="secondary" className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium flex gap-2 items-center shadow-sm">
              English <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-black" />
            </Badge>
            <Badge variant="secondary" className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium flex gap-2 items-center shadow-sm">
              6+ months <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-black" />
            </Badge>
          </div>

          {/* Filter Sections */}
          <div className="space-y-8">
            <FilterSection title="Difficulty Level">
              <FilterItem label="Beginner" />
              <FilterItem label="Intermediate" checked />
              <FilterItem label="Advanced" />
            </FilterSection>

            <FilterSection title="Course Duration">
              <FilterItem label="Less than 1 month" />
              <FilterItem label="1-3 months" />
              <FilterItem label="3+ months" />
              <FilterItem label="6+ months" checked />
            </FilterSection>

            <FilterSection title="Popularity">
              <FilterItem label="Most Enrolled" />
              <FilterItem label="Highest Rated" />
              <FilterItem label="Trending" />
            </FilterSection>

            <FilterSection title="Language">
              <FilterItem label="English" checked />
              <FilterItem label="Spanish" />
              <FilterItem label="German" />
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

function FilterItem({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox id={label} defaultChecked={checked} className="w-5 h-5 rounded-[4px] border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white" />
      <label
        htmlFor={label}
        className="text-[15px] font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
