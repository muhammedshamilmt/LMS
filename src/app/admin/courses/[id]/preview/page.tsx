"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from 'swr';
import { createClient } from "@/lib/supabase/client";
import {
  ChevronRight,
  ChevronLeft,
  Share2,
  Play,
  Check,
  Clock,
  Star,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  PlusCircle,
  FileText,
  Download,
  File,
  Edit,
  Save,
  Trash2,
  Upload,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomVideoPlayer } from "@/components/ui/custom-video-player";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialCourseModules = [
  {
    title: "01: Intro",
    duration: "22min",
    lessons: [
      { title: "Introduction", duration: "2 min" },
      { title: "What is Figma?", duration: "5 min" },
      { title: "Understanding Figma", duration: "12 min" },
      { title: "UI tour", duration: "3 min" },
    ]
  },
  {
    title: "02: Intermediate Level Stuff",
    duration: "1h 20min",
    lessons: [
      { title: "Frames & Groups", duration: "10 min" },
      { title: "Auto Layout Basics", duration: "25 min" },
      { title: "Constraints", duration: "15 min" },
    ]
  },
  {
    title: "03: Advanced Stuff",
    duration: "36min",
    lessons: [
      { title: "Prototyping", duration: "20 min" },
      { title: "Smart Animate", duration: "16 min" },
    ]
  },
  {
    title: "04: Imports & Graphics",
    duration: "40min",
    lessons: []
  },
  {
    title: "05: Component in Figma",
    duration: "1h 12min",
    lessons: []
  },
  {
    title: "06: Styles in Figma",
    duration: "41min",
    lessons: []
  },
  {
    title: "07: Summary",
    duration: "8min",
    lessons: []
  }
];

const initialFaqs = [
  { q: "Is this course for beginners?", a: "Absolutely! We start from the very basics and gradually move to advanced concepts." },
  { q: "Do I need a paid Figma account?", a: "No, a free Figma account is sufficient for all the exercises in this course." },
  { q: "Will I get a certificate?", a: "Yes, upon completing all modules you will receive a verifiable digital certificate." }
];

const initialAnnouncements = [
  { date: "Oct 12, 2026", title: "New Module Added!", content: "We just added a new bonus module on advanced Auto Layout features introduced in the latest Figma update." },
  { date: "Sep 28, 2026", title: "Live Q&A Session", content: "Join me this Friday for a live Q&A session where we'll go over your design assignments." }
];

const reviews = [
  { name: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?img=5", rating: 5, date: "2 days ago", text: "This course completely transformed how I design. Crystal is an amazing instructor and explains everything so clearly!" },
  { name: "Mike Chen", avatar: "https://i.pravatar.cc/150?img=12", rating: 4, date: "1 week ago", text: "Great content and very well structured. I just wish there were more exercises on prototyping." },
  { name: "Elena Rodriguez", avatar: "https://i.pravatar.cc/150?img=19", rating: 5, date: "3 weeks ago", text: "The absolute best Figma course out there. The Auto Layout section alone was worth the price." }
];

type CourseResource = {
  title: string;
  type: string;
  size: string;
  file?: File;
  url?: string;
};

const initialResources: CourseResource[] = [
  { title: "Figma Keyboard Shortcuts", type: "PDF", size: "2.4 MB" },
  { title: "UI Components Library", type: "FIG", size: "15.8 MB" },
  { title: "Design System Guidelines", type: "PDF", size: "8.1 MB" },
  { title: "Module 1 Presentation", type: "PPTX", size: "12.5 MB" },
  { title: "Color Theory Cheat Sheet", type: "PDF", size: "1.2 MB" },
  { title: "Wireframe Templates", type: "ZIP", size: "34.0 MB" },
];

const initialWhatYouLearn = [
  "Setting up the environment",
  "Understand HTML Programming",
  "Advanced HTML Practices",
  "Code HTML",
  "Build a portfolio website",
  "Start building beautiful websites",
  "Responsive Designs"
];
const fetcher = (url: string) => fetch(url).then(r => r.json());
export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { data, error, isLoading, mutate } = useSWR(`/api/courses/${courseId}`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 15000, // Poll every 15s in case background jobs are updating URLs
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setCourseDetails({
        title: data.title || '',
        category: data.category || '',
        videoUrl: data.videoUrl || '',
        isVideoLocal: false,
        aboutText1: data.aboutText1 || '',
        aboutText2: data.aboutText2 || '',
        authorName: data.authorName || '',
        authorRole: data.authorRole || '',
        authorBio: data.authorBio || '',
        thumbnailUrl: data.thumbnailUrl || '',
        authorAvatarUrl: data.authorAvatarUrl || '',
      });
      if (data.faqs) setFaqsData(data.faqs);
      if (data.announcements) setAnnouncementsData(data.announcements);
      if (data.modules) setCourseModules(data.modules);
      if (data.resources) setResources(data.resources);
      if (data.whatYouLearn) setWhatYouLearn(data.whatYouLearn);
    }
  }, [data]);

  const handleSave = async () => {
    setIsSubmitting(true);
    const supabase = createClient();
    try {
      let finalVideoUrl = courseDetails.videoUrl;
      if (videoFile) {
        const ext = videoFile.name.split('.').pop();
        const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const { data: uploadData, error } = await supabase.storage.from('lms_temp_uploads').upload(path, videoFile);
        if (error) throw error;
        finalVideoUrl = `temp:${uploadData.path}`;
      }

      let finalAvatarUrl = courseDetails.authorAvatarUrl;
      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop();
        const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const { data: uploadData, error } = await supabase.storage.from('lms_temp_uploads').upload(path, avatarFile);
        if (error) throw error;
        finalAvatarUrl = `temp:${uploadData.path}`;
      }

      const processedResources = await Promise.all(
        resources.map(async (res: any) => {
          if (res.file) {
            const ext = res.file.name.split('.').pop();
            const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
            const { data: uploadData, error } = await supabase.storage.from('lms_temp_uploads').upload(path, res.file);
            if (error) throw error;
            return { ...res, url: `temp:${uploadData.path}`, file: undefined };
          }
          return res;
        })
      );

      const updatedModules = await Promise.all(courseModules.map(async (mod, idx) => {
        let finalMediaUrl = mod.mediaUrl || null;
        if (moduleVideoFiles[idx]) {
          const ext = moduleVideoFiles[idx].name.split('.').pop();
          const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
          const { data: uploadData, error } = await supabase.storage.from('lms_temp_uploads').upload(path, moduleVideoFiles[idx]);
          if (error) throw error;
          finalMediaUrl = `temp:${uploadData.path}`;
        }
        return { ...mod, mediaUrl: finalMediaUrl };
      }));

      const payload = {
        title: courseDetails.title,
        category: courseDetails.category,
        videoUrl: finalVideoUrl,
        thumbnailUrl: courseDetails.thumbnailUrl, // FIX: Send thumbnail
        authorAvatarUrl: finalAvatarUrl, // FIX: Send avatar
        aboutText1: courseDetails.aboutText1,
        aboutText2: courseDetails.aboutText2,
        authorName: courseDetails.authorName,
        authorRole: courseDetails.authorRole,
        authorBio: courseDetails.authorBio,
        whatYouLearn: whatYouLearn,
        faqs: faqsData,
        announcements: announcementsData,
        modules: updatedModules,
        resources: processedResources,
      };

      // Optimistic UI Update
      mutate({ ...data, ...payload }, false);

      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to update course");
      setIsEditMode(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      setVideoFile(null);
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseDetails, setCourseDetails] = useState<any>({
    title: "",
    category: "",
    videoUrl: "",
    isVideoLocal: false,
    aboutText1: "",
    aboutText2: "",
    authorName: "",
    authorRole: "",
    authorBio: "",
    thumbnailUrl: "",
    authorAvatarUrl: "",
  });

  const [faqsData, setFaqsData] = useState<any[]>([]);
  const [announcementsData, setAnnouncementsData] = useState<any[]>([]);
  const [courseModules, setCourseModules] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>([]);

  const [selectedModuleIdx, setSelectedModuleIdx] = useState<number | null>(null);
  const [moduleVideoFiles, setModuleVideoFiles] = useState<{ [key: number]: File }>({});

  const parseDurationToMinutes = (dur: string) => {
    if (!dur) return 0;
    let mins = 0;
    const hMatch = dur.match(/(\d+)\s*h/);
    const mMatch = dur.match(/(\d+)\s*m/);
    if (hMatch) mins += parseInt(hMatch[1]) * 60;
    if (mMatch) mins += parseInt(mMatch[1]);
    return mins;
  };

  const formatMinutes = (totalMins: number) => {
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    if (h > 0) return `${h}h ${m > 0 ? m + 'min' : ''}`;
    return `${m}min`;
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;

    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com') && !url.includes('embed/')) {
      return 'invalid';
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const isDirectVideo = (url: string) => {
    if (!url) return false;
    if (url.startsWith('temp:')) return true;
    if (url.startsWith('blob:')) return true;
    if (url.includes('supabase.co') && url.includes('/storage/')) return true;
    if (url.includes('imagekit.io')) return true;
    if (url.match(/\.(mp4|webm|ogg)$/i)) return true;
    return false;
  };

  const getFullSrc = (url: string) => {
    if (!url) return '';
    if (url.startsWith('temp:')) {
      const path = url.replace('temp:', '');
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lms_temp_uploads/${path}`;
    }
    return url;
  };

  const totalLessonsCount = courseModules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0);
  const totalDurationMins = courseModules.reduce((acc, mod) => acc + parseDurationToMinutes(mod.duration), 0);
  const formattedTotalDuration = formatMinutes(totalDurationMins);

  const toggleModule = (index: number) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter(i => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  const addModule = () => {
    setCourseModules([...courseModules, { title: "New Module", duration: "0 min", lessons: [] }]);
    setExpandedModules([...expandedModules, courseModules.length]);
  };
  const deleteModule = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newModules = [...courseModules];
    newModules.splice(idx, 1);
    setCourseModules(newModules);
  };
  const addLesson = (moduleIdx: number) => {
    const newModules = [...courseModules];
    if (!newModules[moduleIdx].lessons) newModules[moduleIdx].lessons = [];
    newModules[moduleIdx].lessons.push({ title: "New Lesson", duration: "0 min" });
    setCourseModules(newModules);
    if (!expandedModules.includes(moduleIdx)) setExpandedModules([...expandedModules, moduleIdx]);
  };
  const deleteLesson = (moduleIdx: number, lessonIdx: number) => {
    const newModules = [...courseModules];
    newModules[moduleIdx].lessons.splice(lessonIdx, 1);
    setCourseModules(newModules);
  };

  const tabs = ["Overview", "Author", "FAQ", "Announcements", "Reviews", "Notes"];

  const handleFaqChange = (index: number, field: 'q' | 'a', value: string) => {
    const newFaqs = [...faqsData];
    newFaqs[index][field] = value;
    setFaqsData(newFaqs);
  };

  const handleAnnouncementChange = (index: number, field: 'title' | 'content' | 'date', value: string) => {
    const newAnns = [...announcementsData];
    newAnns[index][field] = value;
    setAnnouncementsData(newAnns);
  };

  const inputStyle = "bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:border-[#7956ED] focus:ring-2 focus:ring-[#7956ED]/20 transition-all px-3 py-2";

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full w-full animate-in fade-in duration-500">
        <div className="flex flex-col xl:flex-row gap-8 relative items-start">
          <div className="flex-1 flex flex-col min-w-0 w-full space-y-6">
            <div className="flex flex-col gap-4">
              <div className="h-10 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>
            <div className="w-full aspect-video bg-gray-200 dark:bg-zinc-800 rounded-[32px] animate-pulse" />
          </div>
          <div className="w-full xl:w-[380px] flex-shrink-0 flex flex-col gap-6">
            <div className="h-[400px] w-full bg-gray-200 dark:bg-zinc-800 rounded-[28px] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="flex flex-col min-h-full w-full animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row gap-8 relative items-start">

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0 w-full">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="flex-1 mr-4">
              <div className="flex items-center gap-3 mb-3">
                <Link href="/admin/courses" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                  <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                </Link>

                {isEditMode ? (
                  <input
                    type="text"
                    value={courseDetails.title}
                    onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })}
                    className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white w-full max-w-md ${inputStyle}`}
                  />
                ) : (
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{courseDetails.title}</h1>
                )}


              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 ml-10">
                <div className="flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4 text-[#7956ED]" />
                  <span>{totalLessonsCount} {totalLessonsCount === 1 ? 'lesson' : 'lessons'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7956ED]" />
                  <span>{formattedTotalDuration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span>4.5 <span className="text-gray-400 font-normal">(126 reviews)</span></span>
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={courseDetails.category}
                    onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })}
                    className={`${inputStyle} text-[11px] font-bold uppercase tracking-wider w-32`}
                  />
                ) : (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-[11px] font-bold uppercase tracking-wider rounded-full border border-gray-200 dark:border-zinc-700">
                    {courseDetails.category}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-10 lg:ml-0 self-start lg:self-center mt-2 lg:mt-0">

              <Button
                onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
                variant={isEditMode ? "default" : "outline"}
                disabled={isSubmitting}
                className={`rounded-full px-5 h-11 font-bold ${isEditMode ? 'bg-[#20d5a5] hover:bg-[#1bb88e] text-white' : 'text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-700'}`}
              >
                {isEditMode ? (
                  <>{isSubmitting ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}</>
                ) : (
                  <><Edit className="w-4 h-4 mr-2" /> Edit Preview</>
                )}
              </Button>
              {/* 
              {!isEditMode && (
                <Button className="bg-[#7956ED] hover:bg-[#6842df] text-white rounded-full px-8 h-11 font-bold shadow-lg shadow-[#7956ED]/20 border-none transition-transform active:scale-95 ml-2">
                  Enroll Now
                </Button>
              )} */}
            </div>
          </div>

          {/* Video Player */}
          {isEditMode && (
            <div className="mb-3 ml-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                {selectedModuleIdx !== null ? `Video Source (Module ${selectedModuleIdx + 1})` : "Video Source (Course Promo)"}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Paste YouTube embed URL..."
                  value={selectedModuleIdx !== null ? (courseModules[selectedModuleIdx]?.mediaUrl || "") : (courseDetails.videoUrl || "")}
                  onChange={(e) => {
                    if (selectedModuleIdx !== null) {
                      const newModules = [...courseModules];
                      newModules[selectedModuleIdx].mediaUrl = e.target.value;
                      newModules[selectedModuleIdx].isLocal = false;
                      setCourseModules(newModules);
                    } else {
                      setCourseDetails({ ...courseDetails, videoUrl: e.target.value, isVideoLocal: false });
                    }
                  }}
                  className={`flex-1 text-sm ${inputStyle}`}
                />
                <span className="text-sm font-bold text-gray-400">OR</span>
                <div className="relative">
                  <input type="file" accept="video/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const url = URL.createObjectURL(file);

                      if (selectedModuleIdx !== null) {
                        const newModules = [...courseModules];
                        newModules[selectedModuleIdx].mediaUrl = url;
                        newModules[selectedModuleIdx].isLocal = true;
                        setCourseModules(newModules);
                        setModuleVideoFiles({ ...moduleVideoFiles, [selectedModuleIdx]: file });
                      } else {
                        setCourseDetails({ ...courseDetails, videoUrl: url, isVideoLocal: true });
                        setVideoFile(file);
                      }
                    }
                  }} />
                  <Button variant="outline" className="border-gray-200 dark:border-zinc-700 pointer-events-none relative z-0">
                    <Upload className="w-4 h-4 mr-2" /> Upload Video
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(() => {
            const currentVideoUrl = selectedModuleIdx !== null ? courseModules[selectedModuleIdx]?.mediaUrl : courseDetails.videoUrl;
            const currentIsLocal = selectedModuleIdx !== null ? courseModules[selectedModuleIdx]?.isLocal : courseDetails.isVideoLocal;

            const renderVideo = () => {
              if (!currentVideoUrl) return null;

              if (currentIsLocal || isDirectVideo(currentVideoUrl)) {
                return (
                  <CustomVideoPlayer
                    src={currentIsLocal ? currentVideoUrl : getFullSrc(currentVideoUrl)}
                  />
                );
              }

              const embedUrl = getEmbedUrl(currentVideoUrl);

              if (embedUrl === 'invalid') {
                return (
                  <div className="text-gray-500 flex flex-col items-center">
                    <PlayCircle className="w-12 h-12 mb-2 opacity-50 text-red-400" />
                    <span>Invalid Video URL</span>
                  </div>
                );
              }

              return (
                <iframe
                  className="w-full h-full"
                  src={embedUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              );
            };

            return (
              <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-gray-900 shadow-sm mb-8 border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
                {currentVideoUrl ? (
                  renderVideo()
                ) : (
                  <div className="text-gray-500 flex flex-col items-center">
                    <PlayCircle className="w-12 h-12 mb-2 opacity-50" />
                    <span>No video uploaded for this {selectedModuleIdx !== null ? 'module' : 'course'}</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 mb-8">
            <div className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[14px] font-bold transition-all duration-300 whitespace-nowrap ${activeTab === tab
                    ? "text-[#7956ED] border-b-[3px] border-[#7956ED]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-[3px] border-transparent"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Container */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[28px] p-6 md:p-8 lg:p-10 shadow-[0_2px_10px_rgb(0,0,0,0.02)] min-h-[400px]">

            {/* Overview */}
            {activeTab === "Overview" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Course</h2>
                <div className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 mb-10">
                  {isEditMode ? (
                    <div className="space-y-3">
                      <textarea
                        value={courseDetails.aboutText1}
                        onChange={(e) => setCourseDetails({ ...courseDetails, aboutText1: e.target.value })}
                        className={`w-full min-h-[100px] ${inputStyle}`}
                      />
                      <textarea
                        value={courseDetails.aboutText2}
                        onChange={(e) => setCourseDetails({ ...courseDetails, aboutText2: e.target.value })}
                        className={`w-full min-h-[80px] ${inputStyle}`}
                      />
                    </div>
                  ) : (
                    <>
                      <p>{courseDetails.aboutText1}</p>
                      <p>{courseDetails.aboutText2}</p>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">What You'll Learn</h2>
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setWhatYouLearn([...whatYouLearn, "New learning objective"])}
                      className="text-[#7956ED] hover:bg-[#7956ED]/10"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Objective
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {whatYouLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E5F5EC] dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" strokeWidth={3} />
                      </div>
                      {isEditMode ? (
                        <div className="flex items-center gap-2 w-full">
                          <input
                            value={item}
                            onChange={(e) => {
                              const newW = [...whatYouLearn];
                              newW[idx] = e.target.value;
                              setWhatYouLearn(newW);
                            }}
                            className={`w-full ${inputStyle} py-1 text-[14px]`}
                          />
                          <button
                            onClick={() => {
                              const newW = [...whatYouLearn];
                              newW.splice(idx, 1);
                              setWhatYouLearn(newW);
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[14px] text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            {activeTab === "Author" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center max-w-2xl mx-auto">
                <div className="relative group mb-5">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-zinc-800 shadow-xl">
                    <AvatarImage src={avatarFile ? URL.createObjectURL(avatarFile) : getFullSrc(courseDetails.authorAvatarUrl) || "https://i.pravatar.cc/150?img=9"} />
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                  {isEditMode && (
                    <label className="absolute inset-0 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                      <span className="text-xs font-semibold">Change</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setAvatarFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                {isEditMode ? (
                  <div className="w-full flex flex-col gap-4 mb-8">
                    <input
                      type="text"
                      value={courseDetails.authorName}
                      onChange={(e) => setCourseDetails({ ...courseDetails, authorName: e.target.value })}
                      className={`text-2xl font-bold text-center w-full max-w-xs mx-auto ${inputStyle}`}
                    />
                    <input
                      type="text"
                      value={courseDetails.authorRole}
                      onChange={(e) => setCourseDetails({ ...courseDetails, authorRole: e.target.value })}
                      className={`text-[#7956ED] text-center font-bold text-[14px] tracking-widest uppercase w-full max-w-sm mx-auto ${inputStyle}`}
                    />
                    <textarea
                      value={courseDetails.authorBio}
                      onChange={(e) => setCourseDetails({ ...courseDetails, authorBio: e.target.value })}
                      className={`w-full text-center min-h-[120px] ${inputStyle}`}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{courseDetails.authorName}</h2>
                      <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                    </div>
                    <p className="text-[#7956ED] font-bold text-[14px] tracking-widest uppercase mb-6">{courseDetails.authorRole}</p>
                    <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                      {courseDetails.authorBio}
                    </p>
                  </>
                )}

                {!isEditMode && (
                  <Button className="bg-black hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-full px-8 py-6 font-bold shadow-lg">
                    Follow Instructor
                  </Button>
                )}
              </div>
            )}

            {/* FAQ */}
            {activeTab === "FAQ" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFaqsData([...faqsData, { q: "New Question", a: "Answer here" }])}
                      className="text-[#7956ED] hover:bg-[#7956ED]/10"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" /> Add FAQ
                    </Button>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {faqsData.map((faq, idx) => (
                    <div key={idx} className="border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-zinc-800/30">
                      {isEditMode ? (
                        <div className="p-5 flex flex-col gap-3 relative">
                          <button
                            onClick={() => {
                              const newFaqs = [...faqsData];
                              newFaqs.splice(idx, 1);
                              setFaqsData(newFaqs);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <input
                            type="text"
                            value={faq.q}
                            onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                            className={`w-full font-bold text-[15px] pr-8 ${inputStyle}`}
                          />
                          <textarea
                            value={faq.a}
                            onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                            className={`w-full text-[15px] min-h-[80px] ${inputStyle}`}
                          />
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800/50 outline-none"
                          >
                            <span className="font-bold text-[15px] text-gray-900 dark:text-white">{faq.q}</span>
                            {expandedFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                          </button>
                          {expandedFaq === idx && (
                            <div className="p-5 pt-0 text-[15px] text-gray-600 dark:text-gray-400 animate-in fade-in slide-in-from-top-2 duration-300">
                              {faq.a}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Announcements */}
            {activeTab === "Announcements" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Updates</h2>
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAnnouncementsData([...announcementsData, {
                        title: "New Update",
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        content: "Details..."
                      }])}
                      className="text-[#7956ED] hover:bg-[#7956ED]/10"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Announcement
                    </Button>
                  )}
                </div>

                {announcementsData.map((ann, idx) => (
                  <div key={idx} className="flex gap-5 border-b border-gray-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0 relative">
                    <div className="w-12 h-12 rounded-full bg-[#F0EAFC] dark:bg-[#7956ED]/10 flex items-center justify-center flex-shrink-0 text-[#7956ED]">
                      <MessageSquare className="w-5 h-5" />
                    </div>

                    <div className="w-full pr-8">
                      {isEditMode ? (
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              value={ann.title}
                              onChange={(e) => handleAnnouncementChange(idx, 'title', e.target.value)}
                              className={`font-bold text-[16px] flex-1 ${inputStyle}`}
                            />
                            <span className="text-[12px] text-gray-400 font-medium px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md">
                              {ann.date}
                            </span>
                          </div>
                          <textarea
                            value={ann.content}
                            onChange={(e) => handleAnnouncementChange(idx, 'content', e.target.value)}
                            className={`w-full text-[14px] min-h-[80px] ${inputStyle}`}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-[16px] text-gray-900 dark:text-white">{ann.title}</span>
                            <span className="text-[12px] text-gray-400 font-medium px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md">{ann.date}</span>
                          </div>
                          <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{ann.content}</p>
                        </>
                      )}
                    </div>

                    {isEditMode && (
                      <button
                        onClick={() => {
                          const newAnns = [...announcementsData];
                          newAnns.splice(idx, 1);
                          setAnnouncementsData(newAnns);
                        }}
                        className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "Reviews" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Reviews</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">4.5</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-yellow-500 fill-yellow-500" : "text-yellow-500/30"}`} />
                        ))}
                      </div>
                      <span className="text-[12px] text-gray-400 font-medium">Based on 126 reviews</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((rev, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-zinc-800/30 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={rev.avatar} />
                            <AvatarFallback>{rev.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-[15px] text-gray-900 dark:text-white">{rev.name}</div>
                            <div className="text-[12px] text-gray-400 font-medium">{rev.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-yellow-500/30"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes / Resources */}
            {activeTab === "Notes" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Materials</h2>
                    <p className="text-[14px] text-gray-500 mt-1">Downloadable resources provided by the instructor.</p>
                  </div>
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      onClick={() => setResources([...resources, { title: "New Document", type: "FILE", size: "-- MB" }])}
                      className="text-[#7956ED] hover:bg-[#7956ED]/10"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Material
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, idx) => (
                    <div key={idx} className="flex items-center p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#F0EAFC] dark:bg-[#7956ED]/10 flex items-center justify-center flex-shrink-0 text-[#7956ED] mr-4">
                        <File className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {isEditMode ? (
                          <div className="flex flex-col gap-2 w-full">
                            <input
                              value={resource.title}
                              onChange={(e) => {
                                const newR = [...resources];
                                newR[idx].title = e.target.value;
                                setResources(newR);
                              }}
                              className={`w-full font-bold text-[14px] py-1 ${inputStyle}`}
                            />
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-bold px-2 py-0.5 bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 rounded uppercase tracking-wider">
                                {resource.type}
                              </span>
                              <span className="text-[12px] text-gray-400 font-medium">
                                {resource.size}
                              </span>

                              <div className="relative ml-2">
                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    const newR = [...resources];
                                    newR[idx].title = file.name;
                                    newR[idx].size = (file.size / (1024 * 1024)).toFixed(1) + " MB";
                                    newR[idx].type = file.name.split('.').pop()?.toUpperCase() || "FILE";
                                    newR[idx].file = file;
                                    setResources(newR);
                                  }
                                }} />
                                <Button size="sm" variant="secondary" className="h-7 text-[11px] pointer-events-none relative z-0">
                                  <Upload className="w-3 h-3 mr-1" /> Replace File
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h4 className="font-bold text-[15px] text-gray-900 dark:text-white truncate pr-4">{resource.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-bold px-2 py-0.5 bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 rounded uppercase tracking-wider">{resource.type}</span>
                              <span className="text-[12px] text-gray-400 font-medium">{resource.size}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {isEditMode ? (
                        <button
                          onClick={() => {
                            const newR = [...resources];
                            newR.splice(idx, 1);
                            setResources(newR);
                          }}
                          className="w-10 h-10 ml-2 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      ) : (
                        <a
                          href={getFullSrc(resource.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={resource.title || 'download'}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7956ED] hover:bg-white dark:hover:bg-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Sidebar - Sticky & Scrollable */}
        <div className="w-full xl:w-[380px] flex-shrink-0 flex flex-col gap-6 xl:sticky xl:top-8 xl:h-[calc(100vh-100px)] xl:overflow-y-auto hover-scrollbar pb-8">

          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[28px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-lg font-bold text-gray-900 dark:text-white cursor-pointer hover:text-[#7956ED] transition-colors"
                onClick={() => setSelectedModuleIdx(null)}
                title="View Course Promo Video"
              >
                Course content
              </h2>
              {selectedModuleIdx !== null && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7956ED] bg-[#7956ED]/10 px-2 py-1 rounded-full">
                  Module {selectedModuleIdx + 1} Selected
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {courseModules.map((module, idx) => {
                const isExpanded = expandedModules.includes(idx);
                if (isLoading) return <div className="flex h-full items-center justify-center p-20"><span className="animate-pulse text-gray-500">Loading course details...</span></div>;

                return (
                  <div key={idx} className={`border-b border-gray-50 dark:border-zinc-800/50 last:border-0 pb-3 mb-2 last:mb-0 last:pb-0 ${selectedModuleIdx === idx ? 'bg-gray-50 dark:bg-zinc-800/50 -mx-2 px-2 rounded-xl' : ''}`}>
                    <div
                      onClick={() => { toggleModule(idx); setSelectedModuleIdx(idx); }}
                      className="w-full flex items-center justify-between py-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#7956ED] rounded-lg transition-all cursor-pointer"
                    >
                      {isEditMode ? (
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => {
                            const newModules = [...courseModules];
                            newModules[idx].title = e.target.value;
                            setCourseModules(newModules);
                          }}
                          onClick={(e) => { e.stopPropagation(); setSelectedModuleIdx(idx); }}
                          className={`text-[14px] font-bold w-full mr-2 py-1 ${inputStyle}`}
                        />
                      ) : (
                        <span className="text-[14px] font-bold text-gray-900 dark:text-white group-hover:text-[#7956ED] transition-colors">
                          {module.title}
                        </span>
                      )}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isEditMode ? (
                          <>
                            <input
                              value={module.duration}
                              onChange={(e) => {
                                const newModules = [...courseModules];
                                newModules[idx].duration = e.target.value;
                                setCourseModules(newModules);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className={`w-16 text-[11px] font-semibold py-1 text-center ${inputStyle}`}
                            />
                            <button
                              onClick={(e) => deleteModule(idx, e)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[12px] text-gray-500 font-semibold">{module.duration}</span>
                        )}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#7956ED] text-white' : 'bg-gray-50 dark:bg-zinc-800 text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-zinc-700'}`}>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>

                    {/* Lessons */}
                    {(isExpanded && module.lessons && module.lessons.length > 0) && (
                      <div className="flex flex-col gap-1 pt-2 pb-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        {module.lessons.map((lesson: any, lIdx: number) => (
                          <div key={lIdx} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#F0EAFC] dark:hover:bg-[#7956ED]/10 transition-colors group">
                            <div className="flex items-center gap-3 w-full mr-2">
                              <Play className="w-3 h-3 text-gray-400 group-hover:text-[#7956ED] transition-colors flex-shrink-0" fill="currentColor" />
                              {isEditMode ? (
                                <input
                                  type="text"
                                  value={lesson.title}
                                  onChange={(e) => {
                                    const newModules = [...courseModules];
                                    newModules[idx].lessons[lIdx].title = e.target.value;
                                    setCourseModules(newModules);
                                  }}
                                  className={`text-[13px] w-full py-1 ${inputStyle}`}
                                />
                              ) : (
                                <span className="text-[13px] text-gray-600 dark:text-gray-300 font-medium group-hover:text-[#7956ED] dark:group-hover:text-[#7956ED] transition-colors">
                                  {lesson.title}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              {isEditMode ? (
                                <>
                                  <input
                                    value={lesson.duration}
                                    onChange={(e) => {
                                      const newModules = [...courseModules];
                                      newModules[idx].lessons[lIdx].duration = e.target.value;
                                      setCourseModules(newModules);
                                    }}
                                    className={`w-14 text-[11px] py-1 text-center ${inputStyle}`}
                                  />
                                  <button
                                    onClick={() => deleteLesson(idx, lIdx)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <span className="text-[12px] text-gray-400 font-medium group-hover:text-[#7956ED] transition-colors">{lesson.duration}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {isEditMode && (
                      <div className="pt-2 pb-2 pl-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addLesson(idx)}
                          className="h-7 text-[11px] text-[#7956ED] hover:bg-[#7956ED]/10"
                        >
                          <PlusCircle className="w-3 h-3 mr-1.5" /> Add Lesson
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}

              {isEditMode && (
                <Button
                  variant="outline"
                  onClick={addModule}
                  className="w-full mt-2 border-dashed border-gray-300 dark:border-zinc-700 text-gray-500 hover:text-[#7956ED] hover:border-[#7956ED] transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Module
                </Button>
              )}
            </div>
          </div>

          {/* Author Card moved to right sidebar */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[28px] p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Instructor</h2>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={courseDetails?.authorAvatarUrl || "https://i.pravatar.cc/150?img=11"} />
                  <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-gray-900 dark:text-white">{courseDetails.authorName}</span>
                    <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </div>
                  </div>
                  <div className="text-[12px] text-gray-500 font-medium mt-0.5">{courseDetails.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[13px] font-bold text-gray-900 dark:text-white">
                <Star className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" />
                (4.8)
              </div>
            </div>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-5">
              {courseDetails.authorBio}
            </p>
            {!isEditMode && (
              <Button variant="outline" className="w-full rounded-full border-gray-200 dark:border-zinc-700 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors py-5">
                View Profile
              </Button>
            )}
          </div>

        </div>

      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-zinc-800 border border-green-200 dark:border-green-900 shadow-2xl rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-bottom-5 fade-in z-50 min-w-[300px]">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Changes Saved!</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Media uploads are processing in background.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
