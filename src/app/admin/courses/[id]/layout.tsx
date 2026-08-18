"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LineChart, Settings, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function CourseDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();
  const { id } = React.use(params);
  
  const baseUrl = `/admin/courses/${id}`;
  
  const { data: courseData } = useSWR(`/api/courses/${id}`, fetcher);

  const navItems = [
    {
      name: 'Overview',
      href: baseUrl,
      icon: LayoutDashboard,
      exact: true
    },
    {
      name: 'Enrolls',
      href: `${baseUrl}/enrolls`,
      icon: Users,
    },
    {
      name: 'Analytics',
      href: `${baseUrl}/analytics`,
      icon: LineChart,
    },
    {
      name: 'Preview',
      href: `${baseUrl}/preview`,
      icon: BookOpen,
    },
    {
      name: 'Settings',
      href: `${baseUrl}/settings`,
      icon: Settings,
    }
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* Breadcrumbs / Header area */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500 dark:text-zinc-400">
          <Link href="/admin/courses" className="hover:text-gray-900 dark:hover:text-zinc-100 transition-colors">
            Courses
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-zinc-100 font-medium">Course Details</span>
        </div>
        
        <Link href={`/students/courses/${id}/enroll`} target="_blank">
          <Button variant="outline" size="sm" className="gap-2 h-9 border-gray-200 dark:border-white/10 dark:hover:bg-white/5">
            <ExternalLink className="w-4 h-4" />
            Preview Course
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start h-full">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 bg-white dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-white/5 p-4 sticky top-6">
          <div className="flex items-center gap-3 mb-6 p-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-zinc-100 line-clamp-1">{courseData?.title || 'Loading...'}</h2>
              <p className="text-xs text-gray-500 dark:text-zinc-400">ID: {id}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? pathname === item.href
                : pathname.startsWith(item.href);

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      : "text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-zinc-200"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-zinc-500")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full bg-white dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-white/5 p-6 min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
}
