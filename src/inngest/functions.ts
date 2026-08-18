import { inngest } from "./client";
import { createClient } from "@supabase/supabase-js";
import { imagekit } from "@/lib/imagekit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello, World!" };
  },
);

export const processCourseUploads = inngest.createFunction(
  { id: "process-course-uploads", name: "Process Course Uploads", triggers: [{ event: "course/process.uploads" }] },
  async ({ event, step }) => {
    const { courseId, formData } = event.data;

    // Step 1: Initialize Supabase Admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Helpers
    const processFile = async (filePath: string, targetBucket: string, targetFolder: string) => {
      if (!filePath || !filePath.startsWith('temp:')) return filePath; 
      
      const pathInTemp = filePath.replace('temp:', '');
      const { data, error } = await supabase.storage.from('lms_temp_uploads').download(pathInTemp);
      if (error || !data) return filePath; // Fallback or throw
      
      const finalPath = `${targetFolder}/${pathInTemp.split('/').pop()}`;
      await supabase.storage.from(targetBucket).upload(finalPath, data);
      await supabase.storage.from('lms_temp_uploads').remove([pathInTemp]);
      
      const { data: urlData } = supabase.storage.from(targetBucket).getPublicUrl(finalPath);
      return urlData.publicUrl;
    };

    const processImage = async (filePath: string, courseId: string) => {
      if (!filePath || !filePath.startsWith('temp:')) return filePath;
      
      const pathInTemp = filePath.replace('temp:', '');
      const { data, error } = await supabase.storage.from('lms_temp_uploads').download(pathInTemp);
      if (error || !data) return filePath;
      
      const arrayBuffer = await data.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const response = await imagekit.upload({
        file: buffer,
        fileName: pathInTemp.split('/').pop() || 'image.jpg',
        folder: `/LMS/${courseId}/`,
      });
      
      await supabase.storage.from('lms_temp_uploads').remove([pathInTemp]);
      return response.url;
    };

    // Step 2: Process Course Level Images & Videos
    const finalThumbnail = await step.run("process-thumbnail", () => processImage(formData.thumbnailUrl, courseId));
    const finalAvatar = await step.run("process-avatar", () => processImage(formData.authorAvatarUrl, courseId));
    const finalVideo = await step.run("process-promo-video", () => processFile(formData.videoUrl, "course_videos", courseId));

    await step.run("update-course", async () => {
      await supabase.from('courses').update({
        thumbnail_url: finalThumbnail,
        promo_video_url: finalVideo,
        author_avatar_url: finalAvatar,
      }).eq('id', courseId);
    });

    // Step 3: Process Modules & Lessons
    for (const mod of formData.modules || []) {
      const finalModMedia = await step.run(`process-module-${mod.id}`, () => processFile(mod.mediaUrl, "course_videos", `${courseId}/modules`));
      if (finalModMedia !== mod.mediaUrl) {
        await step.run(`update-module-${mod.id}`, async () => {
          await supabase.from('course_modules').update({ media_url: finalModMedia }).eq('course_id', courseId).eq('title', mod.title);
        });
      }
    }

    // Step 4: Process Notes
    for (const note of formData.notes || []) {
      const finalNote = await step.run(`process-note-${note.id}`, () => processFile(note.url, "course_notes", `${courseId}/notes`));
      if (finalNote !== note.url) {
        await step.run(`update-note-${note.id}`, async () => {
          await supabase.from('course_notes').update({ file_url: finalNote }).eq('course_id', courseId).eq('title', note.title);
        });
      }
    }

    return { success: true, courseId };
  }
);
