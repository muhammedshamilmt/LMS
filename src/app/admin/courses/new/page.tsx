"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  UploadCloud,
  Link as LinkIcon,
  Plus,
  Trash2,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  { id: "basic", title: "Basic Information" },
  { id: "media", title: "Media & Branding" },
  { id: "curriculum", title: "Curriculum" },
  { id: "additional", title: "Additional Details" },
  { id: "pricing", title: "Pricing & Publish" },
];

export default function NewCourseWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "",
    tags: "",

    thumbnailType: "upload", // 'upload' | 'url'
    thumbnailUrl: "",
    thumbnailFile: null as File | null,

    videoType: "upload", // 'upload' | 'url'
    videoUrl: "",
    videoFile: null as File | null,

    modules: [
      {
        id: "m1",
        title: "01: Intro",
        duration: "22min",
        mediaType: "upload", // 'upload' | 'url'
        mediaUrl: "",
        mediaFile: null as File | null,
        isExpanded: true,
        lessons: [
          { id: "l1", title: "Introduction", duration: "2 min" }
        ]
      }
    ],

    authorName: "",
    authorRole: "",
    authorBio: "",
    authorAvatarType: "upload", // 'upload' | 'url'
    authorAvatarUrl: "",
    authorAvatarFile: null as File | null,

    faqs: [] as { id: string, q: string, a: string }[],
    notes: [] as { id: string, title: string, fileType: string, resourceType: string, url: string, file: File | null }[],

    price: "",
    isDraft: true,
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleUpdate = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // In a real app, you would make an API call here.
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-4">
            {formData.isDraft ? "Course Saved as Draft" : "Course Published Successfully!"}
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 mb-10 max-w-md mx-auto text-lg">
            {formData.isDraft
              ? "Your course has been securely saved as a draft. You can continue editing it later."
              : "Your course is now live and available for students to explore and enroll."}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/admin/courses">
              <Button variant="outline" className="rounded-full px-8 py-6 text-sm font-semibold">Return to Courses</Button>
            </Link>
            <Link href="/admin/courses">
              <Button className="rounded-full px-8 py-6 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                View in Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Create New Course</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">Fill in the details to publish a new course on your platform.</p>
        </div>
        <Link href="/admin/courses">
          <Button variant="outline" className="rounded-full">Cancel</Button>
        </Link>
      </div>

      {/* Step Indicator */}
      <div className="mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-zinc-800 -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="relative flex justify-between z-10">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isCurrent = currentStep === idx;
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 border-white dark:border-[#0a0a0a] ${isCompleted ? "bg-blue-600 text-white" :
                    isCurrent ? "bg-blue-600 text-white ring-4 ring-blue-600/20" :
                      "bg-gray-200 dark:bg-zinc-800 text-gray-500"
                    }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : (idx + 1)}
                </div>
                <span className={`absolute -bottom-6 text-xs font-semibold whitespace-nowrap ${isCurrent ? "text-blue-600" : "text-gray-400"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white dark:bg-zinc-900 rounded-[28px] border border-gray-100 dark:border-zinc-800 shadow-sm min-h-[500px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-8 lg:p-10"
          >
            {currentStep === 0 && <StepBasicInfo data={formData} update={handleUpdate} />}
            {currentStep === 1 && <StepMedia data={formData} update={handleUpdate} />}
            {currentStep === 2 && <StepCurriculum data={formData} update={handleUpdate} />}
            {currentStep === 3 && <StepAdditional data={formData} update={handleUpdate} />}
            {currentStep === 4 && <StepPricing data={formData} update={handleUpdate} />}
          </motion.div>
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-full px-5 py-5"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} className="rounded-full px-5 py-5 bg-blue-600 hover:bg-blue-700 text-white">
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white">
              {formData.isDraft ? "Save Draft" : "Publish Course"}
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Steps Components ---

function StepBasicInfo({ data, update }: { data: any, update: any }) {
  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-zinc-100">Basic Information</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the primary details for your new course.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Course Title</label>
        <input
          type="text"
          placeholder="e.g. Advanced UI/UX Design with Figma"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Category</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
            value={data.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="design">UI/UX Design</option>
            <option value="programming">Programming</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Tags (comma separated)</label>
          <input
            type="text"
            placeholder="e.g. figma, design, ui"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
            value={data.tags}
            onChange={(e) => update("tags", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Short Description</label>
        <textarea
          placeholder="A brief summary of what students will learn..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white resize-none"
          value={data.shortDescription}
          onChange={(e) => update("shortDescription", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Detailed Description</label>
        <textarea
          placeholder="Full course description..."
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white resize-none"
          value={data.detailedDescription}
          onChange={(e) => update("detailedDescription", e.target.value)}
        />
      </div>
    </div>
  );
}

function StepMedia({ data, update }: { data: any, update: any }) {
  const [activeTab, setActiveTab] = useState<"thumbnail" | "video">("thumbnail");

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-zinc-100">Course Cover & Intro</h2>
        <p className="text-sm text-gray-500 mb-6">Upload or link your main course cover image and intro promo video.</p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("thumbnail")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "thumbnail" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
        >
          <ImageIcon className="w-4 h-4" /> Thumbnail
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "video" ? "bg-white dark:bg-zinc-700 shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
        >
          <Video className="w-4 h-4" /> Promo Video
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "thumbnail" && (
          <MediaUploadBlock
            type="image"
            mode={data.thumbnailType}
            setMode={(m: any) => update("thumbnailType", m)}
            url={data.thumbnailUrl}
            setUrl={(u: any) => update("thumbnailUrl", u)}
            file={data.thumbnailFile}
            setFile={(f: any) => update("thumbnailFile", f)}
          />
        )}
        {activeTab === "video" && (
          <MediaUploadBlock
            type="video"
            mode={data.videoType}
            setMode={(m: any) => update("videoType", m)}
            url={data.videoUrl}
            setUrl={(u: any) => update("videoUrl", u)}
            file={data.videoFile}
            setFile={(f: any) => update("videoFile", f)}
          />
        )}
      </div>
    </div>
  );
}

function MediaUploadBlock({ type, mode, setMode, url, setUrl, file, setFile, aspect = "video" }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [file]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === "upload"} onChange={() => setMode("upload")} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
          <span className="text-sm font-medium dark:text-zinc-200 text-gray-900">Upload File</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={mode === "url"} onChange={() => setMode("url")} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
          <span className="text-sm font-medium dark:text-zinc-200 text-gray-900">Provide URL</span>
        </label>
      </div>

      <AnimatePresence mode="wait">
        {mode === "upload" ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`border-2 border-dashed border-gray-300 dark:border-zinc-700 p-10 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-zinc-800/20 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer relative ${aspect === "square" ? "rounded-full w-48 h-48 mx-auto" : "rounded-2xl"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept={type === "image" ? "image/*" : "video/*"}
              onChange={(e) => {
                if (e.target.files?.[0]) setFile(e.target.files[0]);
              }}
            />
            {preview ? (
              <div className={`relative w-full overflow-hidden border border-gray-200 dark:border-zinc-700 bg-black ${aspect === "square" ? "h-full rounded-full" : "max-w-sm rounded-xl aspect-video"}`}>
                {type === "image" ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <video src={preview} className="w-full h-full object-cover" controls />
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black text-white rounded-md transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className={`rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4 ${aspect === "square" ? "w-10 h-10" : "w-16 h-16"}`}>
                  <UploadCloud className={aspect === "square" ? "w-5 h-5" : "w-8 h-8"} />
                </div>
                {aspect !== "square" && (
                  <>
                    <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">{type === "image" ? "SVG, PNG, JPG or GIF (max. 5MB)" : "MP4, WebM (max. 50MB)"}</p>
                  </>
                )}
                {aspect === "square" && (
                  <p className="text-xs font-medium text-gray-500">Upload Image</p>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="url"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">External URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                placeholder={`https://example.com/${type === "image" ? "cover.jpg" : "promo.mp4"}`}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            {url && (
              <div className={`mt-4 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/30 flex items-center justify-center overflow-hidden bg-black ${aspect === "square" ? "w-32 h-32 rounded-full mx-auto p-0 border-4" : "aspect-video max-w-sm"}`}>
                {type === "image" ? (
                  <img src={url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <video src={url} className="w-full h-full object-cover" controls />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepCurriculum({ data, update }: { data: any, update: any }) {
  const addModule = () => {
    update("modules", [
      ...data.modules,
      {
        id: Date.now().toString(),
        title: `0${data.modules.length + 1}: New Module`,
        duration: "0 min",
        mediaType: "upload",
        mediaUrl: "",
        mediaFile: null,
        isExpanded: true,
        lessons: []
      }
    ]);
  };

  const toggleModule = (moduleId: string) => {
    update("modules", data.modules.map((m: any) => m.id === moduleId ? { ...m, isExpanded: !m.isExpanded } : m));
  };

  const removeModule = (moduleId: string) => {
    update("modules", data.modules.filter((m: any) => m.id !== moduleId));
  };

  const updateModule = (moduleId: string, field: string, value: any) => {
    update("modules", data.modules.map((m: any) => m.id === moduleId ? { ...m, [field]: value } : m));
  };

  const addLesson = (moduleId: string, e: any) => {
    e.stopPropagation();
    update("modules", data.modules.map((m: any) => {
      if (m.id === moduleId) {
        return {
          ...m,
          isExpanded: true,
          lessons: [...m.lessons, { id: Date.now().toString(), title: "New Lesson", duration: "5 min" }]
        };
      }
      return m;
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: any) => {
    update("modules", data.modules.map((m: any) => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.map((l: any) => l.id === lessonId ? { ...l, [field]: value } : l)
        };
      }
      return m;
    }));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    update("modules", data.modules.map((m: any) => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.filter((l: any) => l.id !== lessonId) };
      }
      return m;
    }));
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-zinc-100">Curriculum</h2>
          <p className="text-sm text-gray-500">Modules contain the actual media content, and lessons break it down with text and duration.</p>
        </div>
        <Button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" /> Add Module
        </Button>
      </div>

      <div className="space-y-4">
        {data.modules.map((mod: any) => (
          <div key={mod.id} className="border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
            {/* Module Header (Click to collapse/expand) */}
            <div
              className="p-4 bg-gray-50 dark:bg-zinc-800/30 border-b border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800/60 transition-colors"
              onClick={() => toggleModule(mod.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 hover:bg-blue-200 transition-colors"
                  onClick={(e) => { e.stopPropagation(); toggleModule(mod.id); }}
                >
                  {mod.isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <input
                  className="bg-transparent font-bold text-gray-900 dark:text-white outline-none focus:border-b border-blue-500 px-1 py-0.5 flex-1 w-full text-[15px] cursor-text"
                  value={mod.title}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateModule(mod.id, "title", e.target.value)}
                  placeholder="e.g. 01: Intro"
                />
                <input
                  className="bg-transparent font-semibold text-gray-500 text-sm outline-none focus:border-b border-blue-500 px-1 py-0.5 w-24 text-right cursor-text"
                  value={mod.duration}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateModule(mod.id, "duration", e.target.value)}
                  placeholder="22min"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={(e) => addLesson(mod.id, e)} className="h-8 text-xs font-semibold rounded-lg bg-white dark:bg-zinc-900">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Lesson
                </Button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeModule(mod.id); }}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Module Content (Media & Lessons) */}
            <AnimatePresence>
              {mod.isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-900">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Module Video / Content</p>
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={mod.mediaType === "upload"} onChange={() => updateModule(mod.id, "mediaType", "upload")} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                          <span className="text-sm font-medium dark:text-zinc-200 text-gray-900">Upload Video/Doc</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={mod.mediaType === "url"} onChange={() => updateModule(mod.id, "mediaType", "url")} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                          <span className="text-sm font-medium dark:text-zinc-200 text-gray-900">External URL</span>
                        </label>
                      </div>

                      {mod.mediaType === "url" ? (
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="url"
                            placeholder="https://example.com/module-video.mp4"
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                            value={mod.mediaUrl}
                            onChange={(e) => updateModule(mod.id, "mediaUrl", e.target.value)}
                          />
                        </div>
                      ) : (
                        <div className="border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-4 flex items-center justify-center bg-white dark:bg-zinc-900/50">
                          <input
                            type="file"
                            className="text-xs w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={(e) => {
                              if (e.target.files?.[0]) updateModule(mod.id, "mediaFile", e.target.files[0]);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Lessons (Text Only)</p>
                    {mod.lessons.length === 0 ? (
                      <div className="text-center py-6 text-sm text-gray-400 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-xl">
                        No lessons added yet.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {mod.lessons.map((lesson: any, lIdx: number) => (
                          <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800/30 rounded-xl border border-gray-100 dark:border-zinc-800 group">
                            <span className="text-xs font-bold text-gray-400 bg-white dark:bg-zinc-900 px-2 py-1 rounded-md border border-gray-100 dark:border-zinc-800 shadow-sm">{lIdx + 1}</span>
                            <input
                              className="bg-transparent text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-b border-blue-500 flex-1 px-1"
                              value={lesson.title}
                              onChange={(e) => updateLesson(mod.id, lesson.id, "title", e.target.value)}
                              placeholder="Lesson Title (e.g. What is Figma?)"
                            />
                            <input
                              className="bg-transparent text-sm font-medium text-gray-500 outline-none focus:border-b border-blue-500 w-20 px-1 text-right"
                              value={lesson.duration}
                              onChange={(e) => updateLesson(mod.id, lesson.id, "duration", e.target.value)}
                              placeholder="5 min"
                            />
                            <button
                              onClick={() => removeLesson(mod.id, lesson.id)}
                              className="text-gray-400 hover:text-red-500 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepAdditional({ data, update }: { data: any, update: any }) {

  const addFaq = () => {
    update("faqs", [...data.faqs, { id: Date.now().toString(), q: "", a: "" }]);
  };
  const updateFaq = (id: string, field: string, value: string) => {
    update("faqs", data.faqs.map((f: any) => f.id === id ? { ...f, [field]: value } : f));
  };
  const removeFaq = (id: string) => {
    update("faqs", data.faqs.filter((f: any) => f.id !== id));
  };

  const addNote = () => {
    update("notes", [...data.notes, { id: Date.now().toString(), title: "", fileType: "PDF", resourceType: "upload", url: "", file: null }]);
  };
  const updateNote = (id: string, field: string, value: any) => {
    update("notes", data.notes.map((n: any) => n.id === id ? { ...n, [field]: value } : n));
  };
  const removeNote = (id: string) => {
    update("notes", data.notes.filter((n: any) => n.id !== id));
  };

  return (
    <div className="space-y-10 pb-16">
      <div>
        <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-zinc-100">Additional Details (Optional)</h2>
        <p className="text-sm text-gray-500">Add author info, FAQs, and downloadable resources.</p>
      </div>

      {/* Author Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Author Info</h3>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/3 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 bg-gray-50/50 dark:bg-zinc-800/30">
            <h4 className="text-xs font-semibold text-gray-500 mb-3 text-center">Author Avatar</h4>
            <MediaUploadBlock
              type="image"
              mode={data.authorAvatarType}
              setMode={(m: any) => update("authorAvatarType", m)}
              url={data.authorAvatarUrl}
              setUrl={(u: any) => update("authorAvatarUrl", u)}
              file={data.authorAvatarFile}
              setFile={(f: any) => update("authorAvatarFile", f)}
              aspect="square"
            />
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Author Name (e.g. Crystal Lucas)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none text-sm dark:text-white"
                value={data.authorName}
                onChange={(e) => update("authorName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Author Role (e.g. Senior UI/UX Designer)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none text-sm dark:text-white"
                value={data.authorRole}
                onChange={(e) => update("authorRole", e.target.value)}
              />
            </div>
            <textarea
              placeholder="Short biography about the author..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none text-sm dark:text-white resize-none"
              value={data.authorBio}
              onChange={(e) => update("authorBio", e.target.value)}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100 dark:border-zinc-800" />

      {/* FAQs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Frequently Asked Questions</h3>
          <Button variant="outline" size="sm" onClick={addFaq} className="h-8 text-xs rounded-lg">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add FAQ
          </Button>
        </div>

        {data.faqs.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No FAQs added yet.</p>
        ) : (
          <div className="space-y-3">
            {data.faqs.map((faq: any, i: number) => (
              <div key={faq.id} className="flex gap-3 bg-gray-50 dark:bg-zinc-800/30 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    placeholder="Question?"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none text-sm font-medium dark:text-white"
                    value={faq.q}
                    onChange={(e) => updateFaq(faq.id, "q", e.target.value)}
                  />
                  <textarea
                    placeholder="Answer"
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none text-sm dark:text-white resize-none"
                    value={faq.a}
                    onChange={(e) => updateFaq(faq.id, "a", e.target.value)}
                  />
                </div>
                <button onClick={() => removeFaq(faq.id)} className="text-gray-400 hover:text-red-500 self-start p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-100 dark:border-zinc-800" />

      {/* Notes / Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Notes & Resources</h3>
          <Button variant="outline" size="sm" onClick={addNote} className="h-8 text-xs rounded-lg">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Resource
          </Button>
        </div>

        {data.notes.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No additional resources added.</p>
        ) : (
          <div className="space-y-3">
            {data.notes.map((note: any) => (
              <div key={note.id} className="flex flex-col gap-3 bg-gray-50 dark:bg-zinc-800/30 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Resource Title (e.g. Cheat Sheet)"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none text-sm dark:text-white"
                    value={note.title}
                    onChange={(e) => updateNote(note.id, "title", e.target.value)}
                  />
                  <select
                    className="w-24 px-2 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none text-sm dark:text-white"
                    value={note.fileType}
                    onChange={(e) => updateNote(note.id, "fileType", e.target.value)}
                  >
                    <option value="PDF">PDF</option>
                    <option value="ZIP">ZIP</option>
                    <option value="DOC">DOC</option>
                    <option value="FIG">FIG</option>
                  </select>
                  <button onClick={() => removeNote(note.id)} className="text-gray-400 hover:text-red-500 p-2 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pl-1">
                  <div className="flex items-center gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={note.resourceType === "upload"} onChange={() => updateNote(note.id, "resourceType", "upload")} className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                      <span className="text-xs font-medium dark:text-zinc-200 text-gray-900">Upload File</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={note.resourceType === "url"} onChange={() => updateNote(note.id, "resourceType", "url")} className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                      <span className="text-xs font-medium dark:text-zinc-200 text-gray-900">Provide URL</span>
                    </label>
                  </div>

                  {note.resourceType === "url" ? (
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        placeholder="https://example.com/resource.pdf"
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                        value={note.url}
                        onChange={(e) => updateNote(note.id, "url", e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-2.5 flex items-center justify-center bg-white dark:bg-zinc-900/50">
                      <input
                        type="file"
                        className="text-xs w-full text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={(e) => {
                          if (e.target.files?.[0]) updateNote(note.id, "file", e.target.files[0]);
                        }}
                      />
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function StepPricing({ data, update }: { data: any, update: any }) {
  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-zinc-100">Pricing & Publish</h2>
        <p className="text-sm text-gray-500 mb-6">Set the course price and publish settings.</p>
      </div>

      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">$</span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white text-lg font-semibold"
              value={data.price}
              onChange={(e) => update("price", e.target.value)}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
            <input
              type="radio"
              checked={data.isDraft === false}
              onChange={() => update("isDraft", false)}
              className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div>
              <span className="block text-sm font-bold dark:text-zinc-100 text-gray-900">Publish Immediately</span>
              <span className="text-xs text-gray-500">Students can see and purchase this course right away.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
            <input
              type="radio"
              checked={data.isDraft === true}
              onChange={() => update("isDraft", true)}
              className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div>
              <span className="block text-sm font-bold dark:text-zinc-100 text-gray-900">Save as Draft</span>
              <span className="text-xs text-gray-500">Keep it hidden. You can publish it later.</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
