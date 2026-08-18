"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UploadJobStatus = 'Queued' | 'Uploading' | 'Processing' | 'Ready' | 'Error';

export interface UploadJob {
  id: string;
  courseId: string;
  file: File;
  fileName: string;
  progress: number;
  status: UploadJobStatus;
  type: 'Video' | 'Resource';
  error?: string;
  timeAdded: Date;
}

interface UploadQueueContextType {
  jobs: UploadJob[];
  addJob: (job: Omit<UploadJob, 'id' | 'progress' | 'status' | 'timeAdded'>) => void;
  removeJob: (id: string) => void;
  clearCompleted: () => void;
}

const UploadQueueContext = createContext<UploadQueueContextType | undefined>(undefined);

export function UploadQueueProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<UploadJob[]>([]);

  const addJob = useCallback((jobInput: Omit<UploadJob, 'id' | 'progress' | 'status' | 'timeAdded'>) => {
    const newJob: UploadJob = {
      ...jobInput,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      status: 'Queued',
      timeAdded: new Date(),
    };
    
    setJobs((prev) => [...prev, newJob]);

    // Start upload process
    processUpload(newJob);
  }, []);

  const processUpload = async (job: UploadJob) => {
    try {
      setJobs((prev) => prev.map(j => j.id === job.id ? { ...j, status: 'Uploading' as UploadJobStatus } : j));
      
      const fileExt = job.fileName.split('.').pop();
      const filePath = `${job.courseId}/${job.id}_${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('course_assets')
        .upload(filePath, job.file, {
          cacheControl: '3600',
          upsert: false,
          // note: supabase standard client doesn't support progress well natively without TUS
          // we mock progress here for the UI, or just show uploading state
        });

      if (error) throw error;

      // Now trigger Inngest to process the upload (e.g. save to DB)
      setJobs((prev) => prev.map(j => j.id === job.id ? { ...j, status: 'Processing' as UploadJobStatus, progress: 100 } : j));
      
      await fetch('/api/upload-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          courseId: job.courseId,
          filePath: filePath,
          fileName: job.fileName,
          type: job.type
        })
      });

      setJobs((prev) => prev.map(j => j.id === job.id ? { ...j, status: 'Ready' as UploadJobStatus } : j));

    } catch (err: any) {
      setJobs((prev) => prev.map(j => j.id === job.id ? { ...j, status: 'Error' as UploadJobStatus, error: err.message } : j));
    }
  };

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setJobs((prev) => prev.filter((j) => j.status !== 'Ready' && j.status !== 'Error'));
  }, []);

  return (
    <UploadQueueContext.Provider value={{ jobs, addJob, removeJob, clearCompleted }}>
      {children}
    </UploadQueueContext.Provider>
  );
}

export function useUploadQueue() {
  const context = useContext(UploadQueueContext);
  if (context === undefined) {
    throw new Error('useUploadQueue must be used within an UploadQueueProvider');
  }
  return context;
}
