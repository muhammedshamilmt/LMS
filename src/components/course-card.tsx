import React from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export interface CourseCardProps {
  topBadge: string;
  category: string;
  title: string;
  tags: string[];
  price: string;
  instructor: string;
  bgColor: string;
  logoUrl?: string;
  logoFallback?: string;
  id?: string;
}

export function CourseCard({
  topBadge,
  category,
  title,
  tags,
  price,
  instructor,
  bgColor,
  logoUrl,
  logoFallback,
  id,
}: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[28px] p-2  border border-gray-100 dark:border-zinc-800 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.01),_0_4px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.02),_0_8px_16px_rgba(0,0,0,0.03)] transition-shadow duration-300">
      {/* Top Colored Section */}
      <div className={`rounded-[24px] p-5 pb-6 relative flex flex-col flex-1 ${bgColor}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-gray-800">
            {topBadge}
          </div>
          <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white hover:text-black transition ">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="text-[13px] font-medium text-gray-700 mb-1">{category}</div>
            <h3 className="text-[22px] font-bold text-gray-900 leading-[1.2] max-w-[160px]">
              {title}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-white  flex items-center justify-center flex-shrink-0 ml-4 overflow-hidden ">
            {logoUrl ? (
              <img src={logoUrl} alt={category} className="w-7 h-7 object-contain" />
            ) : (
              <span className="font-bold text-xl">{logoFallback || category[0]}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-full border border-black/10 text-gray-700 text-[12px] font-medium"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-5 flex items-end justify-between">
        <div>
          <div className="text-[16px] font-bold text-gray-900 dark:text-white mb-0.5">{price}</div>
          <div className="text-[13px] text-gray-400 font-medium">{instructor}</div>
        </div>
        <Link href={id ? `/students/courses/${id}/enroll` : '#'} className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-[14px] font-semibold hover:bg-black/90 dark:hover:bg-gray-200 transition ">
          View Course
        </Link>
      </div>
    </div>
  );
}
