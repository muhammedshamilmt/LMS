"use client";

import React, { useState } from "react";
import { Download, Share2, Headset, ChevronDown, Award, PlayCircle, BookOpen, User, Globe, MoreVertical, X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Mock Data
const CERTIFICATES = [
  {
    id: 1, title: "UI/UX Designer", date: "20 May 2024", signature: "Sean John",
    colors: { text: "text-purple-600 dark:text-purple-400", bgLight: "bg-purple-100 dark:bg-purple-500/20", border: "border-purple-200 dark:border-purple-500/30", gradient: "from-purple-50 dark:from-[#1a1a1a]", blob: "bg-purple-500/10", textIcon: "text-purple-500", btnHover: "hover:bg-purple-200 dark:hover:bg-purple-500/30" }
  },
  {
    id: 2, title: "Front-end Developer", date: "10 Apr 2024", signature: "Sean John",
    colors: { text: "text-blue-600 dark:text-blue-400", bgLight: "bg-blue-100 dark:bg-blue-500/20", border: "border-blue-200 dark:border-blue-500/30", gradient: "from-blue-50 dark:from-[#1a1a1a]", blob: "bg-blue-500/10", textIcon: "text-blue-500", btnHover: "hover:bg-blue-200 dark:hover:bg-blue-500/30" }
  },
  {
    id: 3, title: "QA Engineer", date: "15 Mar 2024", signature: "Sean John",
    colors: { text: "text-emerald-600 dark:text-emerald-400", bgLight: "bg-emerald-100 dark:bg-emerald-500/20", border: "border-emerald-200 dark:border-emerald-500/30", gradient: "from-emerald-50 dark:from-[#1a1a1a]", blob: "bg-emerald-500/10", textIcon: "text-emerald-500", btnHover: "hover:bg-emerald-200 dark:hover:bg-emerald-500/30" }
  },
  {
    id: 4, title: "JavaScript Basics", date: "28 Feb 2024", signature: "Sean John",
    colors: { text: "text-amber-600 dark:text-amber-400", bgLight: "bg-amber-100 dark:bg-amber-500/20", border: "border-amber-200 dark:border-amber-500/30", gradient: "from-amber-50 dark:from-[#1a1a1a]", blob: "bg-amber-500/10", textIcon: "text-amber-500", btnHover: "hover:bg-amber-200 dark:hover:bg-amber-500/30" }
  },
];

const IN_PROGRESS = [
  { id: 1, title: "Advanced React", progress: 65, icon: User },
  { id: 2, title: "Node.js & Express", progress: 40, icon: User },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadComplete(true);
          setTimeout(() => setDownloadComplete(false), 2000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#f8f9fa] dark:bg-[#0a0a0a] text-gray-900 dark:text-white p-4 md:p-8 font-sans font-medium">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">Certificates</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Celebrate your achievements and showcase your new skills.</p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN (70%) */}
        <div className="xl:col-span-8 space-y-8">

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#111] p-3 rounded-2xl border border-gray-100 dark:border-white/10 ">
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 bg-[#F3F0FF] dark:bg-[#7956ED]/20 text-[#7956ED] dark:text-[#a087ff] px-4 py-2 rounded-full text-xs font-semibold">
                All Certificates <span className="bg-white/50 dark:bg-black/20 px-1.5 py-0.5 rounded-md text-[10px]">6</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 px-4 py-2 rounded-full text-xs font-semibold transition-colors">
                Completed <span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md text-[10px]">4</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 px-4 py-2 rounded-full text-xs font-semibold transition-colors">
                In Progress <span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md text-[10px]">2</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 px-4 py-2 rounded-full text-xs font-semibold transition-colors">
                Expired <span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md text-[10px]">0</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pr-2">
              <span className="text-xs">Sort by:</span>
              <button className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                Newest <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Completed Certificates */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Completed Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-[1.5rem] p-4  group  transition-shadow">

                  {/* Visual Certificate Frame */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className={`relative w-full aspect-[4/3] rounded-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden mb-4 border ${cert.colors.border} bg-gradient-to-br ${cert.colors.gradient} to-white dark:to-[#111] cursor-pointer group-hover:scale-[1.02] transition-transform`}
                  >

                    {/* Corner accents & watermarks (visual flair) */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                    <div className={`absolute -top-10 -right-10 w-40 h-40 ${cert.colors.blob} rounded-full blur-2xl`} />
                    <div className={`absolute -bottom-10 -left-10 w-40 h-40 ${cert.colors.blob} rounded-full blur-2xl`} />

                    <div className="relative z-10 w-full">
                      <div className="flex justify-between items-start w-full mb-6">
                        <span className={`text-[10px] uppercase font-semibold tracking-wider ${cert.colors.text} ${cert.colors.bgLight} px-2 py-1 rounded-md`}>
                          Completed
                        </span>
                        <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
                      </div>

                      <div className="text-[8px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2">Certificate of Completion</div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                      <div className="text-[9px] text-gray-500 mb-1">This is to certify that</div>
                      <div className={`text-sm font-semibold ${cert.colors.text} mb-2`}>Shaz Shamil</div>
                      <div className="text-[9px] text-gray-500 max-w-[200px] mx-auto leading-relaxed">
                        has successfully completed the course <strong className="text-gray-700 dark:text-gray-300">{cert.title}</strong> and demonstrated the required skills.
                      </div>

                      <div className="flex justify-between items-end w-full mt-6">
                        <div className="text-left">
                          <div className="font-['Brush_Script_MT',cursive] text-lg text-gray-800 dark:text-gray-300 leading-none">{cert.signature}</div>
                          <div className="text-[7px] text-gray-400 uppercase tracking-wider border-t border-gray-300 dark:border-gray-700 pt-1 mt-1">Course Instructor</div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border ${cert.colors.border} flex items-center justify-center`}>
                          <Award className={`w-4 h-4 ${cert.colors.textIcon}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] text-gray-800 dark:text-gray-300 font-semibold">{cert.date}</div>
                          <div className="text-[7px] text-gray-400 uppercase tracking-wider border-t border-gray-300 dark:border-gray-700 pt-1 mt-1">Completed On</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${cert.colors.bgLight} flex items-center justify-center`}>
                        <Award className={`w-4 h-4 ${cert.colors.text}`} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">{cert.title}</div>
                        <div className="text-[10px] text-gray-500">Completed on {cert.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${cert.colors.bgLight} ${cert.colors.text} text-xs font-semibold ${cert.colors.btnHover} transition-colors`}>
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="pt-4">
            <h2 className="text-lg font-semibold mb-4">In Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {IN_PROGRESS.map((course) => (
                <div key={course.id} className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-2xl p-4  flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10 overflow-hidden relative">
                    {/* Placeholder Avatar */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-indigo-400 dark:from-indigo-900 dark:to-indigo-600 flex items-center justify-center">
                      <course.icon className="w-8 h-8 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{course.title}</h4>
                      <span className="text-xs font-semibold text-gray-500">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-full mb-3 overflow-hidden">
                      <div className="h-full bg-[#7956ED] rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-gray-500 leading-tight w-2/3">Complete all modules and assessments to earn your certificate.</p>
                      <button className="text-xs font-semibold text-[#7956ED] bg-[#F3F0FF] dark:bg-[#7956ED]/10 hover:bg-[#7956ED]/20 px-3 py-1.5 rounded-lg transition-colors">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="xl:col-span-4 space-y-6">

          {/* Achievement Card */}
          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-8 text-center  relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50 dark:from-indigo-900/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              {/* <div className="w-20 h-20 mx-auto bg-[#7956ED] rounded-2xl flex items-center justify-center  mb-4 rotate-3">
                <Award className="w-10 h-10 text-white -rotate-3" />
              </div> */}
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Your Achievement</div>
              <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">4</div>
              <div className="text-sm text-gray-500 mb-8">Certificates Earned</div>

              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Courses Completed</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">4</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">In Progress</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">2</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Total Learning Hours</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">128h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Share Achievements */}
          {/* <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-6 ">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Share your achievement</h3>
            <p className="text-xs text-gray-500 mb-4">Showcase your skills to the world</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button className="flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors group">
                <Globe className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" /> LinkedIn
              </button>
              <button className="flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors group">
                <Twitter className="w-4 h-4 text-[#1DA1F2] group-hover:scale-110 transition-transform" /> Twitter
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 text-gray-900 dark:text-white text-xs font-semibold transition-colors">
              <Download className="w-4 h-4" /> Download All
            </button>
          </div> */}

          {/* Recently Earned */}
          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-6 ">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recently Earned</h3>
              <button className="text-[10px] font-semibold text-[#7956ED] hover:underline">View all</button>
            </div>
            <div className="space-y-4">
              {CERTIFICATES.slice(0, 4).map(cert => (
                <div key={cert.id} className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-xl ${cert.colors.bgLight} flex items-center justify-center shrink-0`}>
                    <Award className={`w-5 h-5 ${cert.colors.textIcon}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-white">{cert.title}</h4>
                    <p className="text-[10px] text-gray-500">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-3xl p-6  flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Need Help?</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed mb-3">If you have any questions about your certificates, we're here to help.</p>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl text-gray-900 dark:text-white text-xs font-semibold transition-colors">
                Contact Support
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Certificate Overlay Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white dark:bg-[#111] rounded-[2rem] p-6 md:p-10 shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-semibold mb-6">Certificate Preview</h2>

              {/* High-res Certificate Preview */}
              <div className={`relative w-full  aspect-[4/3] rounded-2xl p-10 flex flex-col items-center justify-center text-center overflow-hidden mb-8 border-[3px] ${selectedCert.colors.border} bg-gradient-to-br ${selectedCert.colors.gradient} to-white dark:to-[#111] shadow-xl`}>
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                <div className={`absolute -top-20 -right-20 w-80 h-80 ${selectedCert.colors.blob} rounded-full blur-3xl`} />
                <div className={`absolute -bottom-20 -left-20 w-80 h-80 ${selectedCert.colors.blob} rounded-full blur-3xl`} />

                <div className="relative z-10 w-full">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">Certificate of Completion</div>
                  <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{selectedCert.title}</h3>
                  <div className="text-[12px] text-gray-500 mb-2">This is to certify that</div>
                  <div className={`text-2xl font-semibold ${selectedCert.colors.text} mb-4`}>Shaz Shamil</div>
                  <div className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                    has successfully completed the course <strong className="text-gray-700 dark:text-gray-300">{selectedCert.title}</strong> and demonstrated the required skills.
                  </div>

                  <div className="flex justify-between items-end w-full mt-12">
                    <div className="text-left">
                      <div className="font-['Brush_Script_MT',cursive] text-3xl text-gray-800 dark:text-gray-300 leading-none">{selectedCert.signature}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider border-t-2 border-gray-300 dark:border-gray-700 pt-2 mt-2">Course Instructor</div>
                    </div>
                    <div className={`w-16 h-16 rounded-full border-2 ${selectedCert.colors.border} flex items-center justify-center`}>
                      <Award className={`w-8 h-8 ${selectedCert.colors.textIcon}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-800 dark:text-gray-300 font-semibold">{selectedCert.date}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider border-t-2 border-gray-300 dark:border-gray-700 pt-2 mt-2">Completed On</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Download Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading || downloadComplete}
                className={`relative overflow-hidden  flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all ${downloadComplete ? 'bg-emerald-500' : 'bg-[#7956ED] hover:bg-[#6847d1]'}`}
              >
                {/* Progress bar background */}
                {isDownloading && (
                  <div
                    className="absolute top-0 left-0 h-full bg-white/20 transition-all duration-100 ease-linear"
                    style={{ width: `${downloadProgress}%` }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Downloading... {downloadProgress}%
                    </>
                  ) : downloadComplete ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Saved Successfully
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download High-Res PDF
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
