"use client";

import React from "react";
import { UploadCloud, ExternalLink, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QueuePage() {
  return (
    <div className="flex flex-col min-h-full w-full animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Queue</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage background processing and media uploads</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-10 md:p-14 text-center shadow-sm">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Activity className="w-10 h-10 text-emerald-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Background Processing is Active</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
          The LMS platform has been upgraded! Media uploads, file compression, and cloud storage transfers are now managed entirely in the background by our highly reliable <b>Inngest</b> engine. 
          <br /><br />
          You no longer need to keep the browser open while large videos are processing.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="http://localhost:8288" target="_blank">
            <Button className="bg-[#7956ED] hover:bg-[#6842df] text-white rounded-full px-8 h-12 font-bold shadow-lg shadow-[#7956ED]/20 transition-all">
              Open Inngest Dashboard <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button variant="outline" className="rounded-full px-8 h-12 font-bold border-gray-200 dark:border-zinc-700">
              Back to Courses
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800">
            <ShieldCheck className="w-6 h-6 text-[#7956ED] mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Reliable Uploads</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Files are uploaded directly to temp storage and safely processed even if you close the tab.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800">
            <UploadCloud className="w-6 h-6 text-emerald-500 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Auto Cloud Transfer</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Videos are moved to Supabase Storage and Images to ImageKit automatically.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800">
            <Activity className="w-6 h-6 text-blue-500 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Real-time Dashboard</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Monitor progress, view logs, and handle automatic retries directly from the Inngest Dev Server.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
