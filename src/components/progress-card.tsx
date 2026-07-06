import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Briefcase } from "lucide-react";

export interface ProgressCardProps {
  title: string;
  description: string;
  tasks: number;
  projects: number;
  progress?: number;
  startDate?: string;
  tag: string;
  bgColor: string;
  emojiSrc: string;
  actionText: string;
  actionVariant?: "default" | "secondary";
  id?: string;
}

export function ProgressCard({
  title,
  description,
  tasks,
  projects,
  progress,
  startDate,
  tag,
  bgColor,
  emojiSrc,
  actionText,
  actionVariant = "default",
  id,
}: ProgressCardProps) {
  return (
    <div
      className="bg-white dark:bg-[#111] rounded-[36px] p-1 shadow-[0_1px_3px_rgba(0,0,0,0.01),_0_4px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.02),_0_8px_16px_rgba(0,0,0,0.03)] transition-shadow duration-300 flex flex-col"
    >
      {/* Inner Colored Container */}
      <div className={`rounded-[34px] p-6 pb-8 relative flex flex-col flex-1 ${bgColor}`}>
        {/* <div className="absolute right-0 top-6 -translate-y-4 translate-x-2 opacity-100 z-10">
          <img
            src={emojiSrc}
            alt={title}
            width={160}
            height={160}
            className="object-contain drop-shadow-xl pointer-events-none"
          />
        </div> */}

        <div className="relative z-10 w-[65%]">
          <Badge
            variant="secondary"
            className="bg-black/5 hover:bg-black/10 text-black border-none px-3.5 py-1 mb-5 rounded-full font-medium text-sm"
          >
            {tag}
          </Badge>

          <h3 className="text-[22px] font-bold mb-2 text-gray-900">{title}</h3>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
            {description}
          </p>

          <div className="flex items-center gap-4 text-sm font-medium text-gray-900 mb-8">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              <span>{tasks} tasks</span>
            </div>
            <span className="text-gray-400 font-bold">•</span>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{projects} projects</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-3 w-full">
          {progress !== undefined ? (
            <>
              <div className="flex justify-between items-center text-[15px] font-medium text-gray-700">
                <span>Progress</span>
                <span className="font-bold text-gray-900">{progress}%</span>
              </div>
              <div className="h-2.5 w-full bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-[15px] font-medium text-gray-700 mt-2">
                <span>Start date</span>
                <span className="font-bold text-gray-900">{startDate}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom White Section */}
      <div className="flex justify-between items-center px-5 pt-4 pb-2 mt-1">
        {progress !== undefined ? (
          <span className="text-[15px] text-gray-500 dark:text-gray-400 font-medium">
            Modules: <strong className="text-gray-900 dark:text-white ml-1">12/16</strong>
          </span>
        ) : (
          <span className="text-[15px] text-gray-500 font-medium"></span>
        )}
        <Link
          href={id ? `/students/courses/${id}` : '#'}
          className="rounded-full px-7 py-3 font-semibold bg-[#111111] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black text-[15px]"
        >
          {actionText}
        </Link>
      </div>
    </div>
  );
}
