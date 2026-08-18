import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin'; 
import { inngest } from '@/inngest/client';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createAdminClient(); 
    const courseId = (await params).id;

    // Fetch course details
    const { data: course, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error || !course) {
      return NextResponse.json({ error: error?.message || "Course not found" }, { status: 404 });
    }

    // Fetch relations
    const [modulesRes, faqsRes, notesRes, announcementsRes] = await Promise.all([
      supabase.from('course_modules').select('*, course_lessons(*)').eq('course_id', courseId).order('order_index'),
      supabase.from('course_faqs').select('*').eq('course_id', courseId).order('order_index'),
      supabase.from('course_notes').select('*').eq('course_id', courseId),
      supabase.from('course_announcements').select('*').eq('course_id', courseId).order('created_at', { ascending: false })
    ]);

    // Format response
    const formattedCourse = {
      id: course.id,
      title: course.title,
      category: course.category,
      videoUrl: course.promo_video_url,
      aboutText1: course.about_text_1 || "",
      aboutText2: course.about_text_2 || "",
      authorName: course.author_name || "",
      authorRole: course.author_role || "",
      authorBio: course.author_bio || "",
      thumbnailUrl: course.thumbnail_url || "",
      authorAvatarUrl: course.author_avatar_url || "",
      whatYouLearn: course.what_you_learn || [],
      isDraft: course.is_draft,
      price: course.price,
      
      faqs: (faqsRes.data || []).map((faq: any) => ({
        id: faq.id,
        q: faq.question,
        a: faq.answer
      })),
      
      announcements: (announcementsRes.data || []).map((ann: any) => ({
        id: ann.id,
        title: ann.title,
        content: ann.content,
        date: ann.date
      })),
      
      modules: (modulesRes.data || []).map((mod: any) => ({
        id: mod.id,
        title: mod.title,
        duration: mod.duration,
        mediaUrl: mod.media_url,
        isExpanded: true,
        lessons: (mod.course_lessons || []).sort((a:any, b:any) => a.order_index - b.order_index).map((l: any) => ({
          id: l.id,
          title: l.title,
          duration: l.duration
        }))
      })),
      
      resources: (notesRes.data || []).map((note: any) => {
        const [type, size] = (note.file_type || 'PDF|0 MB').split('|');
        return {
          id: note.id,
          title: note.title,
          type: type || 'PDF', 
          size: size || '0 MB', 
          url: note.file_url
        };
      })
    };

    return NextResponse.json(formattedCourse);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const supabase = createAdminClient(); 
    const courseId = (await params).id;

    // 1. Update Course
    const { error: courseError } = await supabase
      .from('courses')
      .update({
        title: body.title,
        category: body.category,
        promo_video_url: body.videoUrl, // Can be temp or final
        thumbnail_url: body.thumbnailUrl, // Assume we might send it from preview eventually
        author_avatar_url: body.authorAvatarUrl,
        about_text_1: body.aboutText1,
        about_text_2: body.aboutText2,
        author_name: body.authorName,
        author_role: body.authorRole,
        author_bio: body.authorBio,
        what_you_learn: body.whatYouLearn || []
      })
      .eq('id', courseId);

    if (courseError) throw new Error(`Course update failed: ${courseError.message}`);

    // 2. Update FAQs (Replace all)
    await supabase.from('course_faqs').delete().eq('course_id', courseId);
    if (body.faqs && body.faqs.length > 0) {
      await supabase.from('course_faqs').insert(
        body.faqs.map((faq: any, idx: number) => ({
          course_id: courseId,
          question: faq.q,
          answer: faq.a,
          order_index: idx
        }))
      );
    }

    // 3. Update Announcements (Replace all)
    await supabase.from('course_announcements').delete().eq('course_id', courseId);
    if (body.announcements && body.announcements.length > 0) {
      await supabase.from('course_announcements').insert(
        body.announcements.map((ann: any) => ({
          course_id: courseId,
          title: ann.title,
          content: ann.content,
          date: ann.date
        }))
      );
    }

    // 4. Update Modules (Replace all)
    await supabase.from('course_modules').delete().eq('course_id', courseId);
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

      if (!modError && moduleData && mod.lessons) {
        const lessons = mod.lessons.map((lesson: any, lIdx: number) => ({
          module_id: moduleData.id,
          title: lesson.title,
          duration: lesson.duration,
          order_index: lIdx,
        }));
        if (lessons.length > 0) await supabase.from('course_lessons').insert(lessons);
      }
    }

    // 5. Update Notes/Resources (Replace all)
    await supabase.from('course_notes').delete().eq('course_id', courseId);
    if (body.resources && body.resources.length > 0) {
      await supabase.from('course_notes').insert(
        body.resources.map((res: any) => ({
          course_id: courseId,
          title: res.title,
          file_type: `${res.type || 'PDF'}|${res.size || '0 MB'}`,
          file_url: res.url, // Could be temp or final
        }))
      );
    }

    // 6. Trigger Background Job to process any new temp uploads
    // We map 'resources' back to 'notes' structure so Inngest can process it similarly 
    // to the POST route.
    const formDataForInngest = {
      ...body,
      notes: body.resources || []
    };

    await inngest.send({
      name: "course/process.uploads",
      data: {
        courseId,
        formData: formDataForInngest,
      }
    });

    return NextResponse.json({ success: true, courseId });
  } catch (err: any) {
    console.error("Course update error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const supabase = createAdminClient(); 
    const courseId = (await params).id;

    const updates: any = {};
    if (body.title !== undefined) updates.title = body.title;
    if (body.category !== undefined) updates.category = body.category;
    if (body.thumbnailUrl !== undefined) updates.thumbnail_url = body.thumbnailUrl;
    if (body.isDraft !== undefined) updates.is_draft = body.isDraft;

    const { error } = await supabase.from('courses').update(updates).eq('id', courseId);
    if (error) throw new Error(`Course update failed: ${error.message}`);

    // If we updated thumbnail to a temp url, trigger the inngest job
    if (body.thumbnailUrl && body.thumbnailUrl.startsWith('temp:')) {
      await inngest.send({
        name: "course/process.uploads",
        data: {
          courseId,
          formData: { thumbnailUrl: body.thumbnailUrl },
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createAdminClient();
    const courseId = (await params).id;

    // Delete related records to prevent foreign key constraint failures
    await supabase.from('course_faqs').delete().eq('course_id', courseId);
    await supabase.from('course_announcements').delete().eq('course_id', courseId);
    await supabase.from('course_notes').delete().eq('course_id', courseId);
    
    // For lessons, we have to find the modules first
    const { data: modules } = await supabase.from('course_modules').select('id').eq('course_id', courseId);
    if (modules && modules.length > 0) {
      const moduleIds = modules.map(m => m.id);
      await supabase.from('course_lessons').delete().in('module_id', moduleIds);
      await supabase.from('course_modules').delete().in('id', moduleIds);
    }
    
    const { error } = await supabase.from('courses').delete().eq('id', courseId);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
