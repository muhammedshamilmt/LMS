"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlayCircle,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Menu,
  Bell,
  Award,
  Settings
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StreakDropdown } from "@/components/StreakDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", icon: Home, href: "/students/home" },
  { name: "Courses", icon: PlayCircle, href: "/students/courses" },
  { name: "Learning", icon: BookOpen, href: "/students/learning" },
  { name: "Messages", icon: MessageSquare, href: "/students/messages" },
  { name: "Certificates", icon: Award, href: "/students/certificates" },
  { name: "Settings", icon: Settings, href: "/students/settings" },
];

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-black flex text-gray-900 dark:text-gray-100 transition-colors">
      {/* Left Sidebar */}
      <aside className="w-24 flex flex-col items-center py-6 bg-white dark:bg-zinc-950 border-r border-gray-100 dark:border-zinc-800 flex-shrink-0 transition-colors">
        <div className="mb-10">
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </div>

        <nav className="flex-1 flex flex-col items-center gap-6 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl w-[72px] h-[72px] transition-colors ${isActive
                  ? "bg-[#F3F4F6] dark:bg-zinc-800 text-black dark:text-white font-medium"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-500"}`} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-[88px] bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between px-10 flex-shrink-0 transition-colors">
          <h1 className="text-2xl font-semibold">
            {pathname.includes("/courses") ? "Courses" : "Home"}
          </h1>

          <div className="flex items-center gap-6">
            <StreakDropdown />

            <ThemeToggle />

            <div className="relative cursor-pointer text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[9px] font-bold text-white dark:text-black border-2 border-white dark:border-zinc-950">
                6
              </span>
            </div>

            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
