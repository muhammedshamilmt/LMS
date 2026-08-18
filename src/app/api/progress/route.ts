import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = user.id;

    const { courseId, moduleId } = await request.json();
    if (!courseId || !moduleId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Check if already completed
    const { data: existing, error: checkError } = await supabase
      .from('course_progress')
      .select('id')
      .eq('course_id', courseId)
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .single();

    if (existing) {
      return NextResponse.json({ success: true, message: 'Already marked as complete' });
    }

    const { error } = await supabase
      .from('course_progress')
      .insert({
        course_id: courseId,
        user_id: userId,
        module_id: moduleId
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Progress error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = user.id;

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('course_progress')
      .select('module_id')
      .eq('course_id', courseId)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ completedModules: data.map(d => d.module_id) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
