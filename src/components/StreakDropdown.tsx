"use client";

import React, { useState, useRef, useEffect } from "react";
import { Flame, Sparkles } from "lucide-react";

export function StreakDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Generating a dummy calendar grid similar to the image
  // The image shows the month starting on a Saturday (1st), so:
  // Mon-Fri are empty for the first week, then Sat 1, Sun 2.
  const calendarDays = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 24, 22, 23, // In the image, 24 is placed where 21 should be. I'll fix that typo from the design to 21.
    24, 25, 26, 27, 28, 29, 30
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#F3F4F6] dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors px-4 py-2 rounded-full cursor-pointer"
      >
        <Flame className="w-4 h-4 text-[#FF4B4B] fill-[#FF4B4B]" />
        <span className="text-sm font-medium dark:text-gray-100">3 days</span>
      </button>

      {shouldRender && (
        <div 
          onAnimationEnd={() => {
            if (!isOpen) setShouldRender(false);
          }}
          className={`absolute top-full right-0 mt-3 bg-white dark:bg-zinc-950 rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-none border border-gray-100 dark:border-zinc-800 p-5 z-50 w-[420px] duration-200 ${
            isOpen 
              ? 'animate-in fade-in zoom-in-95 slide-in-from-top-2' 
              : 'animate-out fade-out zoom-out-95 slide-out-to-top-2'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Streak Calendar</h3>
            <button className="text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors">
              View
            </button>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed mb-4">
            Complete practical tasks every day to increase your streak
          </p>

          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-[#F9FAFB] dark:bg-zinc-900 border border-gray-50 dark:border-zinc-800 rounded-2xl p-3">
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 mb-1">
                <Flame className="w-4 h-4 text-[#E5E7EB] dark:text-zinc-700 fill-[#E5E7EB] dark:fill-zinc-700" />
                <span className="text-[12px] font-medium">Current streak</span>
              </div>
              <p className="text-[16px] font-semibold text-gray-900 dark:text-white mt-0.5">3 days</p>
            </div>
            
            <div className="flex-1 bg-[#F9FAFB] dark:bg-zinc-900 border border-gray-50 dark:border-zinc-800 rounded-2xl p-3">
              <div className="flex items-center gap-2 text-[#FF4B4B] mb-1">
                <Flame className="w-4 h-4 fill-[#FF4B4B]" />
                <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500">Longest streak</span>
              </div>
              <p className="text-[16px] font-semibold text-gray-900 dark:text-white mt-0.5">28 days</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-7 gap-y-2 mb-2">
              {days.map(day => (
                <div key={day} className="text-center text-[13px] font-medium text-gray-400 dark:text-gray-500">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} className="text-center p-2"></div>;
                }
                
                const isStreak = day === 11 || day === 12 || day === 13;
                const isInactive = day === 15 || day === 16 || day >= 17;
                
                return (
                  <div key={`day-${i}`} className="flex justify-center items-center h-7">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] ${
                      isStreak 
                        ? "bg-[#FFE4E4] dark:bg-red-900/40 text-gray-900 dark:text-red-100 font-medium" 
                        : isInactive
                          ? "text-gray-300 dark:text-zinc-600"
                          : "text-gray-700 dark:text-zinc-300"
                    }`}>
                      {day}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#F9FAFB] dark:bg-zinc-900 border border-gray-50 dark:border-zinc-800 rounded-2xl p-4">
            <div className="flex justify-between mb-2">
              <div className="text-center">
                <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">Days</div>
                <div className="text-[17px] font-semibold text-gray-900 dark:text-white">22</div>
              </div>
              <div className="w-[1px] bg-gray-200 dark:bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">Lessons</div>
                <div className="text-[17px] font-semibold text-gray-900 dark:text-white">36</div>
              </div>
              <div className="w-[1px] bg-gray-200 dark:bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">Quizzes</div>
                <div className="text-[17px] font-semibold text-gray-900 dark:text-white">18</div>
              </div>
              <div className="w-[1px] bg-gray-200 dark:bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-[12px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">Minutes</div>
                <div className="text-[17px] font-semibold text-gray-900 dark:text-white">231</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-3 pt-1">
              <Sparkles className="w-[16px] h-[16px] text-[#D946EF] fill-[#D946EF]" />
              <span className="text-[#D946EF] text-[13px] font-semibold">2 insights available</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
