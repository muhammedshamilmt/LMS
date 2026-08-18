"use client";

import React, { useState, useEffect, use, useRef } from 'react';
import { Save, AlertTriangle, Trash2, UploadCloud, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CourseSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data: course, error, isLoading, mutate } = useSWR(`/api/courses/${id}`, fetcher);
  
  const [isDraft, setIsDraft] = useState(true);
  const [category, setCategory] = useState('');
  
  const [thumbnailType, setThumbnailType] = useState<'upload' | 'url'>('upload');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (course) {
      setIsDraft(course.isDraft ?? true);
      setCategory(course.category || '');
      setThumbnailUrl(course.thumbnailUrl || '');
    }
  }, [course]);

  useEffect(() => {
    if (thumbnailFile) {
      const objectUrl = URL.createObjectURL(thumbnailFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [thumbnailFile]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Failed to load course</div>;

  const getFullSrc = (url: string) => {
    if (!url) return '';
    if (url.startsWith('temp:')) {
      const path = url.replace('temp:', '');
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/lms_temp_uploads/${path}`;
    }
    return url;
  };

  const currentImageUrl = preview || getFullSrc(thumbnailUrl);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let finalThumbnailUrl = thumbnailUrl;
      
      if (thumbnailType === 'upload' && thumbnailFile) {
        const supabase = createClient();
        const ext = thumbnailFile.name.split('.').pop();
        const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const { data, error } = await supabase.storage.from('lms_temp_uploads').upload(path, thumbnailFile);
        if (error) throw error;
        finalThumbnailUrl = `temp:${data.path}`;
      } else if (thumbnailType === 'url' && thumbnailUrl !== course?.thumbnailUrl) {
        finalThumbnailUrl = thumbnailUrl;
      }

      const res = await fetch(`/api/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isDraft,
          category,
          thumbnailUrl: finalThumbnailUrl
        })
      });

      if (!res.ok) throw new Error("Failed to update settings");
      
      alert("Settings updated successfully!");
      mutate();
      setThumbnailFile(null);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error("Failed to delete course");
      router.push('/admin/courses');
    } catch (err: any) {
      alert(err.message || "Failed to delete course");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl relative">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Course Settings</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400">Manage the configuration and visibility of your course.</p>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-xl border border-gray-200 dark:border-white/10 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">General Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
              Course Status
            </label>
            <select 
              className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-zinc-800 dark:text-zinc-100"
              value={isDraft ? "draft" : "published"}
              onChange={(e) => setIsDraft(e.target.value === "draft")}
            >
              <option value="draft">Draft (Hidden from students)</option>
              <option value="published">Published (Visible to students)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Publishing makes the course visible to all users on the platform.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
              Course Category
            </label>
            <select 
              className="w-full max-w-md px-3 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-zinc-800 dark:text-zinc-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="design">UI/UX Design</option>
              <option value="programming">Programming</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="data-science">Data Science</option>
            </select>
          </div>
        </div>
      </div>

      {/* Thumbnail Upload */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-xl border border-gray-200 dark:border-white/10 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Course Thumbnail</h3>
        
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={thumbnailType === "upload"} onChange={() => setThumbnailType("upload")} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
            <span className="text-sm font-medium dark:text-zinc-200 text-gray-900">Upload File</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={thumbnailType === "url"} onChange={() => setThumbnailType("url")} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
            <span className="text-sm font-medium dark:text-zinc-200 text-gray-900">Provide URL</span>
          </label>
        </div>

        {thumbnailType === "upload" ? (
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-zinc-700 p-10 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-zinc-800/20 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer rounded-2xl relative max-w-xl"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) setThumbnailFile(e.target.files[0]);
              }}
            />
            {currentImageUrl ? (
              <div className="relative w-full max-w-sm overflow-hidden border border-gray-200 dark:border-zinc-700 bg-black rounded-xl aspect-video">
                <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setThumbnailFile(null); 
                    setThumbnailUrl(''); 
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black text-white rounded-md transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4 w-16 h-16">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-1">Click to upload new thumbnail</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2 max-w-xl">
            <label className="text-sm font-semibold text-gray-900 dark:text-zinc-200">External URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                placeholder="https://example.com/cover.jpg"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
            </div>
            {thumbnailUrl && (
              <div className="mt-4 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/30 flex items-center justify-center overflow-hidden bg-black aspect-video max-w-sm">
                <img src={getFullSrc(thumbnailUrl)} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-zinc-900/50 rounded-xl border border-red-200 dark:border-red-900/30 p-6">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
          Irreversible actions for this course. Please proceed with caution.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-t border-gray-100 dark:border-white/5">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-zinc-100">Delete Course</h4>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
              Permanently delete this course, all its content, and student enrollments.
            </p>
          </div>
          <Button onClick={() => setShowDeleteConfirm(true)} variant="destructive" className="gap-2 shrink-0">
            <Trash2 className="w-4 h-4" />
            Delete Course
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-zinc-800"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Delete Course?</h3>
                <p className="text-gray-500 dark:text-zinc-400 text-sm">
                  Are you absolutely sure you want to delete <span className="font-semibold text-gray-700 dark:text-gray-300">"{course?.title}"</span>? This action cannot be undone and will permanently remove all associated content, modules, and enrollments.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-zinc-800">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Yes, Delete Course"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
