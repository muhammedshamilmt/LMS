"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Smartphone, Mail, MoreHorizontal, User, AlignLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex">
      {/* Left Column: Auth Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-none">Relay App</h1>
              <p className="text-xs text-gray-500 font-medium">Workflow Manager</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-500 mb-1">
              {isLogin ? "Welcome back" : "Welcome to Relay"}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLogin ? "Log in to your account" : "Create new account"}
            </h2>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button className="flex items-center justify-center py-2.5 border border-gray-200 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-200 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
              <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.4-.82 4.02-.79 1.76.04 2.83.83 3.61 1.94-3.19 1.83-2.64 5.92.51 7.03-.78 1.55-1.87 2.87-3.22 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.22-1.92 4.31-3.74 4.25z" />
              </svg>
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-200 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-800" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-800" />
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="James Brown"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">
                  {authMethod === "email" ? "Email Address" : "Phone Number"}
                </label>
                <button
                  type="button"
                  onClick={() => setAuthMethod(prev => prev === "email" ? "phone" : "email")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  {authMethod === "email" ? <Smartphone className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                  Use {authMethod === "email" ? "Phone" : "Email"} instead
                </button>
              </div>

              <div className="relative">
                {authMethod === "email" ? (
                  <>
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                    />
                  </>
                ) : (
                  <>
                    <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-gray-900 dark:text-zinc-300 font-medium">
                      +1
                    </div>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="w-full pl-16 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot password?</button>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-zinc-600">
                  <div className="w-2 h-2 bg-gray-300 dark:bg-zinc-600 rounded-[1px] relative top-[2px]" />
                  <div className="w-1.5 h-1.5 border border-gray-300 dark:border-zinc-600 rounded-full absolute -top-1" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white font-mono text-sm tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-[11px] text-green-600 font-medium flex items-center gap-1 mt-1.5">
                  <CheckCircle2 className="w-3 h-3" /> Must contain 1 uppercase letter, 1 number, min. 8 characters.
                </p>
              )}
            </div>

            {!isLogin && (
              <label className="flex items-start gap-2.5 mt-6 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-hover:border-blue-500 transition-colors">
                  <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                  <div className="hidden peer-checked:block text-blue-600">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium leading-relaxed">
                  I agree to the <a href="#" className="text-gray-900 dark:text-white font-semibold underline decoration-gray-300 underline-offset-2">Terms & Conditions</a> and <a href="#" className="text-gray-900 dark:text-white font-semibold underline decoration-gray-300 underline-offset-2">Privacy Policy</a>.
                </span>
              </label>
            )}

            <button className="w-full py-3.5 mt-8 bg-[#254ee8] hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]">
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </form>

          <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm font-medium">
            <span className="text-gray-500">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className=" rounded-full  dark:border-zinc-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Showcase */}
      <div className="hidden lg:flex w-[55%] bg-[#254ee8] relative overflow-hidden items-center justify-center p-12">
        {/* Background Grid/Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#254ee8] via-transparent to-transparent opacity-50" />

        <div className="relative z-10 w-full max-w-xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Stop losing tasks inside<br />conversations
            </h2>
            <p className="text-blue-100/80 text-lg leading-relaxed max-w-md mx-auto">
              Automatically detect action items, follow-ups, and assignments from Slack, email, meetings, and team threads — without manually creating tasks.
            </p>
            {/* 3 dots */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Floating UI Cluster Animation */}
          <div className="relative w-full aspect-[4/3] max-w-lg mx-auto">
            {/* Main Email Window */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl shadow-blue-900/50 overflow-hidden border border-white/20 flex flex-col"
            >
              {/* Fake Window Header */}
              <div className="h-10 border-b border-gray-100 dark:border-zinc-800 flex items-center px-4 gap-2 bg-gray-50/50 dark:bg-black/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-zinc-700" />
                </div>
                <div className="flex-1" />
                <div className="flex gap-2 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  #onboarding
                </div>
              </div>
              {/* Fake Email Body */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100">Marcus Johnson</h4>
                    <p className="text-[11px] text-gray-500">Yesterday, 3:00 PM</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-800 dark:text-zinc-300 leading-relaxed font-medium">Hey Tailor,</p>
                  <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">After reviewing the onboarding analytics from last week, I noticed that nearly 38% of users are dropping off during the workspace setup step.</p>
                  <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">A few things we should prioritize this week:</p>
                </div>

                {/* Highlighted text that becomes a task */}
                <motion.div
                  initial={{ backgroundColor: "rgba(37, 78, 232, 0)" }}
                  animate={{ backgroundColor: "rgba(37, 78, 232, 0.1)" }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="p-2 rounded-lg -mx-2 border border-transparent"
                >
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full" />
                    Update the onboarding copy to make the setup instructions clearer
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Task Card */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", bounce: 0.4 }}
              className="absolute -bottom-8 -right-8 w-72 bg-white dark:bg-zinc-800 rounded-xl shadow-xl shadow-blue-900/30 border border-gray-100 dark:border-zinc-700 p-4 z-20"
            >
              <div className="flex justify-between items-start mb-3">
                <h5 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">Update onboarding copy</h5>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <AlignLeft className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">25-May-2026</span>
                <div className="flex-1" />
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 border-2 border-white dark:border-zinc-800 z-10" />
                  <div className="w-5 h-5 rounded-full bg-purple-100 border-2 border-white dark:border-zinc-800" />
                </div>
              </div>
              <div className="border-t border-dashed border-gray-200 dark:border-zinc-700 pt-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700">SaaS</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">Onboarding</span>
                </div>
                <div className="flex items-center gap-1 text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span className="text-[10px] font-bold">Urgent</span>
                </div>
              </div>
            </motion.div>

            {/* Floating App Icons */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-12 -left-6 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center z-20"
            >
              {/* Slack Logo SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124-1.271a2.528 2.528 0 0 1 2.522-2.52A2.528 2.528 0 0 1 24 5.042a2.528 2.528 0 0 1-2.522 2.522h-2.52v-2.522zm-1.271 0a2.528 2.528 0 0 1-2.522 2.52 2.528 2.528 0 0 1-2.521-2.52V-1.27A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm0 10.124a2.528 2.528 0 0 1 2.521 2.522 2.528 2.528 0 0 1-2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.521zm0-1.27a2.528 2.528 0 0 1-2.521-2.522 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.312z" fill="#E01E5A" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -top-6 right-16 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center z-20"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Send className="w-4 h-4 text-white -ml-0.5 mt-0.5" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
