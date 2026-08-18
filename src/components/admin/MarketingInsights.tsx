'use client'

import React, { useState } from "react";
import { GraduationCap, Users, Globe2, BookOpen, Award, Briefcase, Search, Megaphone, Share2, MapPin, X, Activity, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MarketingInsights() {
  const [selectedItem, setSelectedItem] = useState<{ title: string; type: string } | null>(null);

  const educationData = [
    { label: "Bachelor's Degree", value: 45, icon: GraduationCap, color: "bg-blue-500" },
    { label: "Master's Degree", value: 30, icon: Award, color: "bg-purple-500" },
    { label: "High School", value: 20, icon: BookOpen, color: "bg-orange-500" },
    { label: "PhD / Doctorate", value: 5, icon: Briefcase, color: "bg-cyan-500" },
  ];

  const sourceData = [
    { label: "Social Media", value: 50, icon: Users, color: "bg-blue-500" },
    { label: "Search Engine", value: 25, icon: Search, color: "bg-purple-500" },
    { label: "Friend / Colleague", value: 15, icon: Share2, color: "bg-orange-500" },
    { label: "Advertisement", value: 10, icon: Megaphone, color: "bg-cyan-500" },
  ];

  const regionData = [
    { label: "United States", value: 40, flag: "🇺🇸", color: "bg-blue-500" },
    { label: "India", value: 25, flag: "🇮🇳", color: "bg-orange-500" },
    { label: "United Kingdom", value: 20, flag: "🇬🇧", color: "bg-purple-500" },
    { label: "Germany", value: 15, flag: "🇩🇪", color: "bg-cyan-500" },
  ];

  // Mock users for the sidebar
  const mockUsers = [
    { name: "Alex Johnson", email: "alex.j@example.com", active: true, avatar: "AJ" },
    { name: "Sarah Smith", email: "sarah.s@example.com", active: true, avatar: "SS" },
    { name: "Michael Brown", email: "mike.b@example.com", active: false, avatar: "MB" },
    { name: "Emily Davis", email: "emily.d@example.com", active: true, avatar: "ED" },
    { name: "James Wilson", email: "james.w@example.com", active: false, avatar: "JW" },
  ];

  return (
    <>
      <div className="flex flex-col w-full mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Marketing & Demographics Insights</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">Understand your user base to optimize marketing campaigns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education Level */}
          <div className="flex flex-col p-6 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-zinc-100">Highest Education</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400">User academic background</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {educationData.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedItem({ title: item.label, type: "Education" })}
                    className="w-full flex items-center gap-3 text-left group hover:bg-gray-50 dark:hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:bg-white dark:group-hover:bg-[#0a0a0a] transition-colors shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-gray-700 dark:text-zinc-300">{item.label}</span>
                        <span className="text-gray-900 dark:text-zinc-100">{item.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Acquisition Source */}
          <div className="flex flex-col p-6 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-zinc-100">Acquisition Platform</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400">How users found us</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {sourceData.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedItem({ title: item.label, type: "Platform" })}
                    className="w-full flex items-center gap-3 text-left group hover:bg-gray-50 dark:hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-zinc-400 group-hover:bg-white dark:group-hover:bg-[#0a0a0a] transition-colors shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-gray-700 dark:text-zinc-300">{item.label}</span>
                        <span className="text-gray-900 dark:text-zinc-100">{item.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Top Regions */}
          <div className="flex flex-col p-6 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-zinc-100">Top Regions</h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400">User geographical distribution</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {regionData.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedItem({ title: item.label, type: "Region" })}
                  className="w-full flex items-center gap-3 text-left group hover:bg-gray-50 dark:hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-lg filter drop-shadow-sm group-hover:bg-white dark:group-hover:bg-[#0a0a0a] transition-colors shadow-sm">
                    {item.flag}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-gray-700 dark:text-zinc-300">{item.label}</span>
                      <span className="text-gray-900 dark:text-zinc-100">{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedItem.title}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Users by {selectedItem.type.toLowerCase()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-zinc-400">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Total Users</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">1,248</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                      <Activity className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Active Users</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">892</div>
                  </div>
                </div>

                {/* User List */}
                <div className="mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-gray-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">Recent Users</h3>
                </div>

                <div className="space-y-3">
                  {mockUsers.map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900/50 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-zinc-300 shadow-inner">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-xs text-gray-500 dark:text-zinc-400">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${user.active ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                          {user.active ? 'Active' : 'Offline'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-zinc-800 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                  View All Users
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
