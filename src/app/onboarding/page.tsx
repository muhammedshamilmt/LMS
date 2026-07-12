"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  Search,
  Users,
  Globe2,
  Megaphone,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Star,
  FileText,
  Share2,
  Compass,
  BarChart3,
  TrendingUp,
  Clock,
  Cloud,
  Loader2,
  Settings,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = ["graduation", "source", "nationality", "success"];

export default function OnboardingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  // Form State
  const [formData, setFormData] = useState({
    graduation: "",
    source: "",
    nationality: "",
  });

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const setField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-[#0a0a0a] flex overflow-hidden">
      {/* Left Column: Form Section */}
      <motion.div
        initial={false}
        animate={{ width: currentStep === "success" ? "100%" : "45%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.8 }}
        className="w-full flex flex-col justify-between px-8 sm:px-16 md:px-24 py-12 relative z-10"
      >

        {/* Header / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-none">Relay App</h1>
            <p className="text-xs text-gray-500 font-medium">Setup your profile</p>
          </div>
        </div>

        {/* Form Content area */}
        <div className="flex-1 flex flex-col justify-center my-12 relative">
          <AnimatePresence mode="wait">
            {currentStep === "graduation" && (
              <StepGraduation key="graduation" value={formData.graduation} onChange={(val) => setField("graduation", val)} />
            )}
            {currentStep === "source" && (
              <StepSource key="source" value={formData.source} onChange={(val) => setField("source", val)} />
            )}
            {currentStep === "nationality" && (
              <StepNationality key="nationality" value={formData.nationality} onChange={(val) => setField("nationality", val)} />
            )}
            {currentStep === "success" && (
              <StepSuccess key="success" />
            )}
          </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <div className="h-16 flex items-center justify-between">
          {currentStep !== "success" ? (
            <>
              {currentStepIndex > 0 ? (
                <button
                  onClick={handlePrev}
                  className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
              ) : (
                <div /> // Spacer
              )}

              <div className="flex items-center gap-4">
                <button
                  onClick={handleSkip}
                  className="text-sm font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  Skip
                </button>
                <Button
                  onClick={handleNext}
                  className="rounded-full px-6 py-5 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={
                    (currentStep === "graduation" && !formData.graduation) ||
                    (currentStep === "source" && !formData.source) ||
                    (currentStep === "nationality" && !formData.nationality)
                  }
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </>
          ) : (
            <div /> // Hide footer on success since button is inline
          )}
        </div>
      </motion.div>

      {/* Right Column: Dynamic Hero Section */}
      <AnimatePresence>
        {currentStep !== "success" && (
          <motion.div
            initial={false}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className="hidden lg:flex w-[55%] bg-[#254ee8] relative items-center justify-center p-12 overflow-hidden"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#254ee8] via-[#254ee8]/50 to-transparent" />

            <div className="relative z-10 w-full max-w-xl flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {currentStep === "graduation" && <HeroGraduation key="hero-grad" />}
                {currentStep === "source" && <HeroSource key="hero-source" />}
                {currentStep === "nationality" && <HeroNationality key="hero-nat" />}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// FORM STEPS (Left Column)
// ==========================================

const slideVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

function StepGraduation({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const options = [
    { id: "highschool", title: "High School", desc: "Secondary education or equivalent", icon: BookOpen },
    { id: "bachelors", title: "Bachelor's Degree", desc: "Undergraduate education", icon: GraduationCap },
    { id: "masters", title: "Master's Degree", desc: "Postgraduate education", icon: Award },
    { id: "phd", title: "PhD / Doctorate", desc: "Highest academic degree", icon: Briefcase },
  ];

  return (
    <motion.div variants={slideVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Step 1 of 3</p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">What's your highest education?</h2>
      <p className="text-gray-500 dark:text-zinc-400 mb-8 text-sm max-w-md">This helps us tailor your learning path and recommend the most suitable courses for your current level.</p>

      <div className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all text-left group ${isSelected
                ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm shadow-blue-500/10"
                : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-gray-200 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors ${isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : "bg-gray-100 dark:bg-zinc-800 text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-zinc-700"
                }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className={`text-sm font-bold mb-0.5 ${isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"}`}>
                  {opt.title}
                </div>
                <div className={`text-xs ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-500 dark:text-zinc-400"}`}>
                  {opt.desc}
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected ? "bg-blue-600 text-white scale-100 opacity-100" : "scale-50 opacity-0"
                }`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function StepSource({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const options = [
    { id: "social", title: "Social Media", desc: "Twitter, LinkedIn, Facebook", icon: Users, popular: true },
    { id: "search", title: "Search Engine", desc: "Google, Bing, Yahoo", icon: Search },
    { id: "ad", title: "Advertisement", desc: "Online or print ads", icon: Megaphone },
    { id: "friend", title: "Friend / Colleague", desc: "Word of mouth referral", icon: Share2 },
  ];

  return (
    <motion.div variants={slideVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Step 2 of 3</p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">How did you hear about us?</h2>
      <p className="text-gray-500 dark:text-zinc-400 mb-8 text-sm max-w-md">We'd love to know how you discovered our platform so we can continue reaching great students like you.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`relative flex flex-col p-5 rounded-2xl border-2 transition-all text-left ${isSelected
                ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm shadow-blue-500/10"
                : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-gray-200 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                }`}
            >
              {opt.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-lg">
                  Popular
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" : "bg-gray-100 dark:bg-zinc-800 text-gray-500"
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-blue-600" : "border-gray-300 dark:border-zinc-600"
                  }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </div>
              </div>
              <span className={`text-sm font-bold mb-1 ${isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"}`}>
                {opt.title}
              </span>
              <span className={`text-[11px] font-medium leading-relaxed ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-500 dark:text-zinc-400"}`}>
                {opt.desc}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function StepNationality({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const quickCountries = [
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "India", flag: "🇮🇳" },
    { name: "Germany", flag: "🇩🇪" },
  ];

  const allCountries = ["France", "Japan", "Brazil", "Spain", "Italy", "Mexico", "South Korea"];

  return (
    <motion.div variants={slideVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Step 3 of 3</p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Where are you from?</h2>
      <p className="text-gray-500 dark:text-zinc-400 mb-8 text-sm max-w-md">Select your nationality to help us customize your local experience, billing currency, and timezone settings.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {quickCountries.map((country) => {
          const isSelected = value === country.name;
          return (
            <button
              key={country.name}
              onClick={() => onChange(country.name)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${isSelected
                ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm shadow-blue-500/10"
                : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-gray-200 dark:hover:border-zinc-700"
                }`}
            >
              <span className="text-3xl mb-2 filter drop-shadow-sm">{country.flag}</span>
              <span className={`text-xs font-bold text-center ${isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-700 dark:text-zinc-300"}`}>
                {country.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-12 pr-4 py-4 appearance-none rounded-xl border-2 outline-none transition-all font-medium ${!quickCountries.some(c => c.name === value) && value !== ""
            ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 shadow-sm shadow-blue-500/10"
            : "border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            }`}
        >
          <option value="" disabled>Search other countries...</option>
          {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
        </div>
      </div>
    </motion.div>
  );
}

function StepSuccess() {
  return (
    <motion.div variants={slideVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="text-center absolute inset-0 flex flex-col items-center justify-center pt-10">

      {/* Background Grid (from the image) */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-3xl h-[400px]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }} />
      </div>

      <div className="flex items-center justify-center gap-3 mb-6">
        <Loader2 className="w-8 h-8 text-gray-900 dark:text-white animate-spin" />
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Your workspace is getting ready...</h2>
      </div>

      <p className="text-gray-600 dark:text-zinc-400 text-lg max-w-lg mx-auto mb-10">
        We're customizing your learning path and configuring your preferences to ensure the best possible experience.
      </p>

      {/* Animated Checklist */}
      <div className="w-full max-w-md mx-auto space-y-3 mb-10 flex flex-col items-center">
        {[
          { text: "Verifying educational history.", icon: ShieldCheck },
          { text: "Customizing learning recommendations.", icon: Settings },
          { text: "Setting up local timezones.", icon: Globe2 },
          { text: "Finalizing dashboard layout.", icon: CheckCircle2 }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 + (i * 0.4), type: "spring", bounce: 0.4 }}
              className="flex items-center justify-between px-5 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800  w-full max-w-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-purple-500" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-zinc-300">{item.text}</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <Link href="/students">
          <Button className="rounded-xl px-10 py-6 text-sm font-medium bg-[#254ee8] hover:bg-blue-700 text-white ">
            Jump to your Dashboard <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// HERO SECTIONS (Right Column)
// ==========================================

const heroVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
  exit: { opacity: 0, scale: 1.05, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } }
};

function HeroGraduation() {
  return (
    <motion.div variants={heroVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full h-[400px] flex items-center justify-center">
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full blur-[80px] opacity-30" />

      {/* Main Profile Card */}
      <motion.div variants={itemVariants} className="absolute z-20 w-80 bg-white dark:bg-zinc-900 rounded-2xl p-1 shadow-2xl shadow-blue-900/20 border border-white/20">
        <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-xl p-5 border border-gray-100 dark:border-zinc-800">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">Academic Profile</div>
                <div className="text-xs text-gray-500 font-medium">Verified Student</div>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Level 4</div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-gray-600 dark:text-zinc-400">Course Progress</span>
                <span className="text-blue-600">78%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-blue-600 rounded-full" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <div className="flex-1 bg-white dark:bg-zinc-800 rounded-lg p-2.5 border border-gray-100 dark:border-zinc-700 flex flex-col items-center">
                <Star className="w-4 h-4 text-yellow-400 mb-1" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">4.9 GPA</span>
              </div>
              <div className="flex-1 bg-white dark:bg-zinc-800 rounded-lg p-2.5 border border-gray-100 dark:border-zinc-700 flex flex-col items-center">
                <Award className="w-4 h-4 text-purple-500 mb-1" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">12 Badges</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div variants={itemVariants} className="absolute z-10 -top-6 -right-6 w-40 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-white text-[10px] font-bold">New Module</div>
          <div className="text-blue-200 text-[9px]">Advanced UI/UX</div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="absolute z-30 -bottom-4 -left-10 bg-white dark:bg-zinc-800 rounded-xl p-3 border border-gray-100 dark:border-zinc-700 shadow-xl flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div>
          <div className="text-gray-900 dark:text-white text-xs font-bold">Assignment Graded</div>
          <div className="text-gray-500 text-[10px]">A+ Perfect Score</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroSource() {
  return (
    <motion.div variants={heroVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full h-[400px] flex items-center justify-center">
      <div className="absolute w-80 h-80 bg-purple-500 rounded-full blur-[80px] opacity-20" />

      {/* Analytics Card */}
      <motion.div variants={itemVariants} className="absolute z-20 w-72 bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-2xl shadow-purple-900/20 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">Discovery Channels</span>
          </div>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>

        {/* Fake Bar Chart */}
        <div className="space-y-3">
          {[
            { label: "Social", val: 85, color: "bg-blue-500" },
            { label: "Search", val: 60, color: "bg-purple-500" },
            { label: "Friends", val: 40, color: "bg-orange-500" }
          ].map((bar, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-12 text-[10px] font-bold text-gray-500 text-right">{bar.label}</span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.val}%` }}
                  transition={{ delay: 0.5 + (i * 0.2), duration: 0.8, type: "spring" }}
                  className={`h-full rounded-full ${bar.color}`}
                />
              </div>
              <span className="w-6 text-[10px] font-bold text-gray-900 dark:text-white">{bar.val}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Network Nodes */}
      <motion.div variants={itemVariants} className="absolute z-10 top-10 left-4 w-40 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <Share2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-white text-xs font-bold">New Referral</div>
          <div className="text-blue-200 text-[10px]">Via Twitter Link</div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="absolute z-30 bottom-10 right-4 bg-white dark:bg-zinc-800 rounded-xl p-3 border border-gray-100 dark:border-zinc-700 shadow-xl flex items-center gap-3">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold text-indigo-700">JS</div>
          <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-white dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold text-pink-700">AK</div>
          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold text-gray-600">+3</div>
        </div>
        <div className="pl-2">
          <div className="text-gray-900 dark:text-white text-xs font-bold">Friends Joined</div>
          <div className="text-gray-500 text-[10px]">From your invite</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroNationality() {
  return (
    <motion.div variants={heroVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full h-[400px] flex items-center justify-center">
      <div className="absolute w-80 h-80 bg-cyan-500 rounded-full blur-[80px] opacity-20" />

      {/* Flight Ticket / Location Card */}
      <motion.div variants={itemVariants} className="absolute z-20 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl shadow-cyan-900/20 border border-white/20 overflow-hidden">
        {/* Map Header */}
        <div className="h-24 bg-cyan-50 dark:bg-cyan-900/20 relative overflow-hidden flex items-center justify-center">
          <Globe2 className="absolute w-40 h-40 text-cyan-500/10 -right-10 -bottom-10" />
          <div className="absolute w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
          <div className="z-10 flex items-center gap-6 w-full px-6">
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-600">LHR</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">London</div>
            </div>
            <div className="flex-1 flex flex-col items-center relative">
              <div className="w-full border-t-2 border-dashed border-cyan-200 dark:border-cyan-800 absolute top-1/2 -translate-y-1/2" />
              <Compass className="w-5 h-5 text-cyan-500 z-10 bg-cyan-50 dark:bg-transparent rounded-full" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600">JFK</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">New York</div>
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="p-5 flex justify-between items-center bg-white dark:bg-zinc-900 border-t border-dashed border-gray-200 dark:border-zinc-800 relative">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#254ee8] rounded-full" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#254ee8] rounded-full" />

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Local Time</div>
            <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-bold text-sm">
              <Clock className="w-4 h-4 text-blue-500" /> 09:41 AM
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Weather</div>
            <div className="flex items-center justify-end gap-1.5 text-gray-900 dark:text-white font-bold text-sm">
              72°F <Cloud className="w-4 h-4 text-cyan-500" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Location Tags */}
      <motion.div variants={itemVariants} className="absolute z-30 -top-2 right-12 bg-white dark:bg-zinc-800 px-3 py-2 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-700 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold text-gray-900 dark:text-white">Region Detected</span>
      </motion.div>

      <motion.div variants={itemVariants} className="absolute z-10 bottom-8 -left-4 w-32 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl flex items-center gap-3">
        <MapPin className="w-5 h-5 text-white" />
        <div>
          <div className="text-white text-xs font-bold">Language</div>
          <div className="text-cyan-200 text-[10px]">English (US)</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Removed HeroSuccess since the left side now takes over on success
