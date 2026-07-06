"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Palette, Camera, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

type TabType = "profile" | "appearance" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User, desc: "Update your personal details and public profile." },
    { id: "appearance", label: "Appearance", icon: Palette, desc: "Customize the look and feel of your workspace." },
    { id: "notifications", label: "Notifications", icon: Bell, desc: "Manage how you receive updates and alerts." },
    { id: "security", label: "Security & Privacy", icon: Shield, desc: "Keep your account secure with passwords and 2FA." },
  ];

  return (
    <div className="min-h-[calc(100vh-88px)] bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white p-4 md:p-8 font-sans font-medium">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 border ${isActive
                  ? "bg-white dark:bg-[#111] border-gray-200 dark:border-white/10 "
                  : "bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive
                  ? "bg-[#7956ED]/10 text-[#7956ED]"
                  : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold mb-1 ${isActive ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-400"}`}>
                    {tab.label}
                  </h3>
                  <p className="text-[10px] text-gray-500 leading-snug font-medium">
                    {tab.desc}
                  </p>
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 xl:col-span-9">

          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-6 md:p-10  min-h-[500px]">

            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

                {/* Avatar Upload */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-white/10">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-100 to-[#7956ED] flex items-center justify-center overflow-hidden border-4 border-white dark:border-[#111] ">
                      <span className="text-3xl text-white font-semibold">SS</span>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center  hover:scale-105 transition-transform border-2 border-white dark:border-[#111]">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Profile Photo</h3>
                    <p className="text-xs text-gray-500 mb-3 font-medium">We recommend a 1:1 image, at least 256x256px.</p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl text-xs font-semibold transition-colors">
                        Upload Image
                      </button>
                      <button className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-xs font-semibold transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">First Name</label>
                    <input type="text" defaultValue="Shaz" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#7956ED]/50 text-sm font-medium transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Last Name</label>
                    <input type="text" defaultValue="Shamil" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#7956ED]/50 text-sm font-medium transition-all" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" defaultValue="shaz@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#7956ED]/50 text-sm font-medium transition-all" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea rows={3} defaultValue="Software Engineer & UI/UX Designer passionate about crafting beautiful digital experiences." className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#7956ED]/50 text-sm font-medium resize-none transition-all" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-[#7956ED] hover:bg-[#6847d1] text-white rounded-xl text-sm font-semibold transition-all  flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-xl font-semibold mb-6">Appearance</h2>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-100 dark:border-white/10 rounded-2xl flex justify-between items-center bg-gray-50 dark:bg-white/5">
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Theme Preference</h3>
                      <p className="text-xs text-gray-500 font-medium">Choose how the LMS looks to you.</p>
                    </div>
                    <div className="flex bg-gray-200 dark:bg-[#1a1a1a] p-1 rounded-xl">
                      <button className="px-4 py-1.5 rounded-lg bg-white dark:bg-transparent text-gray-900 dark:text-gray-400 text-xs font-semibold  dark:shadow-none">Light</button>
                      <button className="px-4 py-1.5 rounded-lg bg-transparent dark:bg-[#333] text-gray-500 dark:text-white text-xs font-semibold shadow-none dark:">Dark</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-xl font-semibold mb-6">Notifications</h2>
                <div className="space-y-4">
                  {[
                    { title: "Course Updates", desc: "Receive notifications about new materials and announcements." },
                    { title: "Messages", desc: "Get alerted when someone sends you a direct message." },
                    { title: "Reminders", desc: "Weekly reminders about incomplete tasks and upcoming deadlines." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 dark:border-white/10 rounded-2xl flex justify-between items-center bg-gray-50 dark:bg-white/5">
                      <div>
                        <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                      </div>
                      <div className="w-11 h-6 bg-[#7956ED] rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-xl font-semibold mb-6">Security & Privacy</h2>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-100 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 dark:bg-white/5">
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Change Password</h3>
                      <p className="text-xs text-gray-500 font-medium">Update your password to keep your account secure.</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap">
                      Update Password
                    </button>
                  </div>
                  <div className="p-4 border border-red-100 dark:border-red-900/30 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-red-50 dark:bg-red-900/10">
                    <div>
                      <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">Delete Account</h3>
                      <p className="text-xs text-red-500/80 font-medium">Permanently delete your account and all data.</p>
                    </div>
                    <button className="px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
