import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = user.id;

    const { courseId } = await request.json();
    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Check if already enrolled
    const { data: existing, error: checkError } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      return NextResponse.json({ success: true, message: 'Already enrolled' });
    }

    // Fetch course to get price
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('price')
      .eq('id', courseId)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Simulate Transaction if course has a price > 0
    const price = course.price || 0;
    
    if (price > 0) {
      const { error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          course_id: courseId,
          amount: price,
          status: 'completed',
          payment_method: 'simulated'
        });

      if (txError) throw txError;
    }

    // Create Enrollment
    const { error: enrollError } = await supabase
      .from('course_enrollments')
      .insert({
        course_id: courseId,
        user_id: userId,
      });

    if (enrollError) throw enrollError;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Enrollment error:', err);
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
      .from('course_enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is not found
      throw error;
    }

    return NextResponse.json({ enrolled: !!data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
