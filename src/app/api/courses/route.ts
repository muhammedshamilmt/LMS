import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin'; 
import { inngest } from '@/inngest/client';

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient(); 

    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const mappedCourses = courses.map((course: any) => ({
      id: course.id,
      title: course.title,
      category: course.category,
      tags: course.tags || [],
      shortDescription: course.short_description,
      detailedDescription: course.detailed_description,
      thumbnailUrl: course.thumbnail_url,
      videoUrl: course.promo_video_url,
      price: course.price,
      isDraft: course.is_draft,
      authorName: course.author_name,
      authorRole: course.author_role,
      authorBio: course.author_bio,
      authorAvatarUrl: course.author_avatar_url,
      createdAt: course.created_at,
    }));

    return NextResponse.json(mappedCourses);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createAdminClient(); 

    const tagsArray = body.tags 
      ? body.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) 
      : [];

    // 1. Insert Course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: body.title,
        category: body.category,
        tags: tagsArray,
        short_description: body.shortDescription,
        detailed_description: body.detailedDescription,
        thumbnail_url: body.thumbnailUrl, // Could be temp or final
        promo_video_url: body.videoUrl, // Could be temp or final
        price: body.price,
        is_draft: body.isDraft,
        author_name: body.authorName,
        author_role: body.authorRole,
        author_bio: body.authorBio,
        author_avatar_url: body.authorAvatarUrl,
      })
      .select('id')
      .single();

    if (courseError || !course) {
      throw new Error(`Course creation failed: ${courseError?.message}`);
    }

    const courseId = course.id;

    // 2. Insert Modules and Lessons
    for (let i = 0; i < (body.modules || []).length; i++) {
      const mod = body.modules[i];
      const { data: moduleData, error: modError } = await supabase
        .from('course_modules')
        .insert({
          course_id: courseId,
          title: mod.title,
          duration: mod.duration,
          media_url: mod.mediaUrl, // Could be temp or final
          order_index: i,
        })
        .select('id')
        .single();

      if (!modError && moduleData) {
        const lessons = (mod.lessons || []).map((lesson: any, lIdx: number) => ({
          module_id: moduleData.id,
          title: lesson.title,
          duration: lesson.duration,
          order_index: lIdx,
        }));
        
        if (lessons.length > 0) {
          await supabase.from('course_lessons').insert(lessons);
        }
      }
    }

    // 3. Insert FAQs
    const faqs = (body.faqs || []).map((faq: any, idx: number) => ({
      course_id: courseId,
      question: faq.q,
      answer: faq.a,
      order_index: idx,
    }));
    if (faqs.length > 0) {
      await supabase.from('course_faqs').insert(faqs);
    }

    // 4. Insert Notes
    const notes = (body.notes || []).map((note: any) => ({
      course_id: courseId,
      title: note.title,
      file_type: note.fileType,
      file_url: note.url, // Could be temp or final
    }));
    if (notes.length > 0) {
      await supabase.from('course_notes').insert(notes);
    }

    // 5. Trigger Background Job to process temp uploads
    await inngest.send({
      name: "course/process.uploads",
      data: {
        courseId,
        formData: body,
      }
    });

    return NextResponse.json({ success: true, courseId });
  } catch (err: any) {
    console.error("Course creation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
