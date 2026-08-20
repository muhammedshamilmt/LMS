"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Lightbulb, LineChart, Wrench } from 'lucide-react';

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Today");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Your AI Just Got Smarter",
      description: (
        <>
          Adaptive learning speed increased by <span className="font-semibold text-gray-900 dark:text-gray-200">27%</span>. New feature: AI-driven trend forecasting
        </>
      ),
      time: "1h ago",
      icon: <Lightbulb className="w-5 h-5 text-gray-600 dark:text-gray-400" strokeWidth={1.5} />,
      unread: true,
    },
    {
      id: 2,
      title: "Data Analysis Completed",
      description: (
        <>
          Your AI has processed <span className="font-semibold text-gray-900 dark:text-gray-200">10,000+</span> records and identified key trends.
        </>
      ),
      time: "3h ago",
      icon: <LineChart className="w-5 h-5 text-gray-600 dark:text-gray-400" strokeWidth={1.5} />,
      unread: true,
    },
    {
      id: 3,
      title: "System Maintenance",
      description: (
        <>
          Performance tuning & security updates will be applied at <span className="font-semibold text-gray-900 dark:text-gray-200">2:00 AM UTC</span>
        </>
      ),
      time: "5h ago",
      icon: <Wrench className="w-5 h-5 text-gray-600 dark:text-gray-400" strokeWidth={1.5} />,
      unread: true,
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        <Bell className="w-6 h-6" />
        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[9px] font-bold text-white dark:text-black border-2 border-white dark:border-zinc-950">
          3
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-14 w-[380px] bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-4 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">AI Notification Center</h3>
              <button className="text-xs font-medium px-3 py-1.5 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg transition-colors text-gray-500 dark:text-gray-400">
                See All
              </button>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-50 dark:bg-white/5 rounded-xl mb-4">
              {['Today', 'This Week', 'Earlier'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === tab
                    ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
              {notifications.map((notif, idx) => (
                <React.Fragment key={notif.id}>
                  <div className="flex gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-transparent ">
                        {notif.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1 gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate flex items-center gap-2">
                          {notif.unread && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />}
                          {notif.title}
                        </p>
                        <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap pt-0.5">{notif.time}</span>
                      </div>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        {notif.description}
                      </p>
                    </div>
                  </div>
                  {idx < notifications.length - 1 && (
                    <div className="h-px bg-gray-100 dark:bg-white/5 mx-3" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
