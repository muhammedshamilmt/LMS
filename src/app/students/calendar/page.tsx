"use client";

import React, { useState, useMemo } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Circle,
  PlaySquare,
  BookOpen,
  FileEdit,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Helper to deterministically generate mock tasks for a date
const generateTasksForDate = (year: number, month: number, date: number) => {
  const seed = year + month + date;
  if (seed % 4 === 0) return []; // 25% of days have no tasks

  const taskTemplates = [
    { title: "UI/UX Masterclass: Module 3", duration: "45 min", icon: PlaySquare, type: "Video", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Submit Wireframe Assignment", duration: "1 hr", icon: FileEdit, type: "Assignment", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Read Chapter 4: Typography", duration: "20 min", icon: BookOpen, type: "Reading", color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Peer Review: Project Alpha", duration: "30 min", icon: Award, type: "Review", color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const numTasks = (seed % 3) + 1; // 1 to 3 tasks
  const tasks = [];
  for (let i = 0; i < numTasks; i++) {
    const template = taskTemplates[(seed + i) % taskTemplates.length];
    tasks.push({
      ...template,
      id: `${year}-${month}-${date}-task-${i}`
    });
  }
  return tasks;
};

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Calendar calculations
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  // Determine tasks for the selected day
  const selectedYear = selectedDate.getFullYear();
  const selectedMonthIndex = selectedDate.getMonth();
  const selectedDateNum = selectedDate.getDate();
  const dailyTasks = useMemo(() => generateTasksForDate(selectedYear, selectedMonthIndex, selectedDateNum), [selectedYear, selectedMonthIndex, selectedDateNum]);
  
  const completedCount = dailyTasks.filter(t => completedTasks.has(t.id)).length;
  const progressPercent = dailyTasks.length > 0 ? Math.round((completedCount / dailyTasks.length) * 100) : 0;

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  // Generate calendar grid array
  const gridDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    gridDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    gridDays.push(i);
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-88px)] bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-medium overflow-hidden">
      
      {/* Left Area - Full Calendar */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {MONTHS[month]} <span className="text-gray-400 font-medium">{year}</span>
            </h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                  setSelectedDate(today);
                }}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors text-sm font-semibold"
              >
                Today
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {DAYS.map(day => (
              <div key={day} className="text-right text-xs font-bold uppercase tracking-wider text-gray-400 pr-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {gridDays.map((dayNum, idx) => {
              if (dayNum === null) {
                return <div key={`empty-${idx}`} className="h-28 rounded-2xl bg-transparent" />;
              }

              const isToday = dayNum === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = dayNum === selectedDateNum && month === selectedMonthIndex && year === selectedYear;
              
              // Get tasks for this specific day to show indicators
              const dayTasks = generateTasksForDate(year, month, dayNum);
              const dayCompletedCount = dayTasks.filter(t => completedTasks.has(t.id)).length;
              const allDone = dayTasks.length > 0 && dayCompletedCount === dayTasks.length;

              return (
                <div 
                  key={dayNum} 
                  onClick={() => setSelectedDate(new Date(year, month, dayNum))}
                  className={`
                    relative h-28 p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-end
                    ${isSelected 
                      ? 'border-[#7956ED] bg-[#7956ED]/5 dark:bg-[#7956ED]/10 shadow-[0_0_0_1px_#7956ED]' 
                      : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111] hover:border-gray-300 dark:hover:border-zinc-700'
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-auto
                    ${isToday ? 'bg-[#7956ED] text-white' : (isSelected ? 'text-[#7956ED]' : 'text-gray-700 dark:text-gray-300')}
                  `}>
                    {dayNum}
                  </div>

                  {/* Task Indicators */}
                  {dayTasks.length > 0 && (
                    <div className="w-full mt-2">
                      <div className="flex gap-1 mb-1.5 justify-end">
                        {dayTasks.map((t, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full ${completedTasks.has(t.id) ? 'bg-[#7956ED]' : 'bg-gray-300 dark:bg-zinc-700'}`} 
                          />
                        ))}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium text-right">
                        {dayCompletedCount}/{dayTasks.length} tasks
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Area - Sidebar / Screening */}
      <div className="w-[380px] bg-white dark:bg-[#111] border-l border-gray-200 dark:border-zinc-800 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-10 flex-shrink-0">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-8"
          >
            {/* Sidebar Header */}
            <div className="mb-10">
              <p className="text-sm font-bold text-[#7956ED] uppercase tracking-wider mb-2">Schedule</p>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h2>
            </div>

            {/* Progress of the Day */}
            <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 mb-8">
              <div className="flex justify-between items-end mb-4">
                <span className="font-bold text-gray-900 dark:text-white">Daily Progress</span>
                <span className="text-2xl font-bold text-[#7956ED]">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#7956ED] rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 font-medium">
                {completedCount} of {dailyTasks.length} tasks completed today.
              </p>
            </div>

            {/* Task Checklist */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tasks</h3>
              
              {dailyTasks.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center text-gray-400">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-6 h-6 text-gray-300 dark:text-zinc-700" />
                  </div>
                  <p className="font-medium">No tasks scheduled for this day.</p>
                  <p className="text-sm mt-1 opacity-70">Take a break or review past courses!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {dailyTasks.map(task => {
                    const isCompleted = completedTasks.has(task.id);
                    
                    return (
                      <div 
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`
                          flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer group
                          ${isCompleted 
                            ? 'bg-gray-50 dark:bg-zinc-900/40 border-gray-100 dark:border-zinc-800/50' 
                            : 'bg-white dark:bg-[#1a1a1c] border-gray-200 dark:border-zinc-800 hover:border-[#7956ED]/30 dark:hover:border-[#7956ED]/30 shadow-sm'
                          }
                        `}
                      >
                        <button className="mt-0.5 flex-shrink-0 transition-colors">
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-[#7956ED]" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-300 dark:text-zinc-700 group-hover:text-[#7956ED]/50" />
                          )}
                        </button>
                        
                        <div className={`flex-1 flex flex-col ${isCompleted ? 'opacity-50' : 'opacity-100'}`}>
                          <p className={`font-bold text-sm mb-1 ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {task.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <task.icon className="w-3.5 h-3.5" /> {task.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
