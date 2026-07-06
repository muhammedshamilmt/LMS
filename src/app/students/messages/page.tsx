"use client";

import React from "react";
import { MessageSquare, Users, Video, Send, Bell, Sparkles } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="min-h-[calc(100vh-88px)] bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white p-6 font-sans font-medium flex items-center justify-center">
      
      <div className="max-w-2xl w-full text-center">
        
        {/* Icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-20 h-20 bg-[#7956ED] rounded-3xl flex items-center justify-center shadow-lg shadow-[#7956ED]/30 rotate-3">
            <MessageSquare className="w-10 h-10 text-white -rotate-3" fill="currentColor" />
          </div>
          
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-white/10">
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white mb-6">
          Next-Gen Comms
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-lg mx-auto mb-10 font-medium">
          We're putting the finishing touches on a beautifully seamless messaging experience. Connect with instructors, join study groups, and collaborate in real-time.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium shadow-sm">
            <Users className="w-4 h-4 text-[#7956ED]" /> Group Chats
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium shadow-sm">
            <Video className="w-4 h-4 text-emerald-500" /> Video Calls
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium shadow-sm">
            <Send className="w-4 h-4 text-blue-500" /> File Sharing
          </div>
        </div>

        {/* Button */}
        <div className="inline-block">
          <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-medium rounded-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg">
            <Bell className="w-5 h-5" />
            Notify me when it's live
          </button>
        </div>

      </div>
    </div>
  );
}
