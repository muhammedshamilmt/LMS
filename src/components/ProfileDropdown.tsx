"use client";

import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, MessageSquare, CreditCard, Settings, HelpCircle, LogOut, Plus, Sun, Moon, Monitor } from 'lucide-react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as IKImage } from "@imagekit/next";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const { data: user } = useSWR('current-user', async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      const { data: profile } = await supabase.from('users').select('*').eq('id', authUser.id).single();
      return { ...authUser, profile };
    }
    return null;
  });

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="relative ml-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-300 p-[2px] shrink-0 hover:scale-105 transition-transform"
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-black p-[2px]">
          {user?.profile?.avatar_url ? (
            <IKImage src={user.profile.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" width={36} height={36} />
          ) : (
            <div className="w-full h-full rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {(user?.profile?.full_name || 'U').substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-14 w-[280px] bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2 z-50"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border border-gray-100 dark:border-white/5 mb-2 rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.profile?.full_name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-300 p-[2px] shrink-0">
                <div className="w-full h-full rounded-full bg-white dark:bg-black p-[2px]">
                  {user?.profile?.avatar_url ? (
                    <IKImage src={user.profile.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" width={36} height={36} />
                  ) : (
                    <div className="w-full h-full rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {(user?.profile?.full_name || 'U').substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <Link href="/students/settings" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-100 dark:bg-white/10 rounded-xl text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center bg-black dark:bg-white rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white dark:text-black" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Profile</span>
                </div>
              </Link>

              {/* <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-left transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" strokeWidth={2} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Community</span>
                </div>
                <div className="w-5 h-5 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center">
                  <Plus className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                </div>
              </button> */}

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-left transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" strokeWidth={2} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Subscription</span>
                </div>
                <span className="text-[10px] font-bold bg-green-300/40 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="text-[10px]">⚡</span> PRO
                </span>
              </button>

              <Link href="/students/settings" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-left transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" strokeWidth={2} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Settings</span>
                </div>
              </Link>


              <div className="h-px bg-gray-100 dark:bg-white/5  mx-2" />


              <div className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-default">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 ">Theme</span>
                <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-white/10 p-1 rounded-full">
                  <button
                    onClick={(e) => { e.stopPropagation(); setTheme("light"); }}
                    className={`p-1.5 rounded-full transition-colors ${mounted && theme === "light" ? "bg-white dark:bg-zinc-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setTheme("dark"); }}
                    className={`p-1.5 rounded-full transition-colors ${mounted && theme === "dark" ? "bg-white dark:bg-zinc-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setTheme("system"); }}
                    className={`p-1.5 rounded-full transition-colors ${mounted && theme === "system" ? "bg-white dark:bg-zinc-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-white/5 my-1 mx-2" />

            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-left transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" strokeWidth={2} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Help center</span>
                </div>
              </button>

              <button onClick={handleSignOut} className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-left transition-colors group">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" strokeWidth={2} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-red-500 transition-colors">Sign out</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
