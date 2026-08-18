import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = user.id;
    const supabase = createAdminClient();

    // 1. Fetch user's enrolled courses with course details
    const { data: enrollments, error: enrollError } = await supabase
      .from('course_enrollments')
      .select(`
        id,
        created_at,
        course_id,
        courses (
          id, title, category, author_name, thumbnail_url, price, created_at
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (enrollError) throw enrollError;

    const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];

    // 2. Fetch all modules for these courses to calculate total modules per course and per category
    let modulesData: any[] = [];
    if (enrolledCourseIds.length > 0) {
      const { data: modules, error: modError } = await supabase
        .from('course_modules')
        .select('id, course_id')
        .in('course_id', enrolledCourseIds);
      if (modError) throw modError;
      modulesData = modules || [];
    }

    // 3. Fetch user's completed modules
    let progressData: any[] = [];
    if (enrolledCourseIds.length > 0) {
      const { data: progress, error: progError } = await supabase
        .from('course_progress')
        .select('module_id, course_id, completed_at')
        .eq('user_id', userId)
        .in('course_id', enrolledCourseIds);
      if (progError) throw progError;
      progressData = progress || [];
    }

    // 4. Calculate progress per course and per category
    const categoryStats: Record<string, { total: number; completed: number }> = {};
    const coursesProgress: Record<string, { total: number; completed: number }> = {};

    enrolledCourseIds.forEach(cId => {
      coursesProgress[cId] = { total: 0, completed: 0 };
    });

    modulesData.forEach(m => {
      if (coursesProgress[m.course_id]) {
        coursesProgress[m.course_id].total++;
      }
    });

    progressData.forEach(p => {
      if (coursesProgress[p.course_id]) {
        coursesProgress[p.course_id].completed++;
      }
    });

    // Populate category stats
    enrollments?.forEach(e => {
      const course = Array.isArray(e.courses) ? e.courses[0] : e.courses;
      const cat = course?.category || 'General';
      if (!categoryStats[cat]) categoryStats[cat] = { total: 0, completed: 0 };
      categoryStats[cat].total += coursesProgress[course.id]?.total || 0;
      categoryStats[cat].completed += coursesProgress[course.id]?.completed || 0;
    });

    const watchedTags = Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      completed: stats.completed,
      total: stats.total
    }));

    const enrolledCourses = enrollments?.map(e => {
      const course = Array.isArray(e.courses) ? e.courses[0] : e.courses;
      return {
        ...course,
        enrolledAt: e.created_at,
        progress: coursesProgress[course.id]
      };
    }) || [];

    // 5. Fetch suggested courses (always fetch, and pick randomly)
    let suggestedCourses: any = [];
    let query = supabase.from('courses').select('id, title, category, author_name, thumbnail_url, price, created_at, short_description, tags').eq('is_draft', false);
    if (enrolledCourseIds.length > 0) {
      // Exclude enrolled courses
      query = query.not('id', 'in', `(${enrolledCourseIds.join(',')})`);
    }
    const { data: suggestions, error: sugError } = await query.limit(10);
    if (sugError) throw sugError;

    if (suggestions && suggestions.length > 0) {
      // Shuffle array
      const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
      suggestedCourses = shuffled.slice(0, 6);
    }

    // 6. Calculate Activity Chart Data (trailing 14 days)
    const ptsPerModule = 15.35;
    const dailyPoints: Record<string, number> = {};
    
    // Initialize last 14 days with 0
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
      dailyPoints[dateStr] = 0;
    }

    // Populate points
    progressData.forEach(p => {
      if (p.completed_at) {
        const dateStr = new Date(p.completed_at).toISOString().split('T')[0];
        if (dailyPoints[dateStr] !== undefined) {
          dailyPoints[dateStr] += ptsPerModule;
        }
      }
    });

    const activityChartData = Object.entries(dailyPoints).map(([dateStr, points], index, array) => {
      // Format as "DD MMM" for start, middle, and end labels to match UI
      const d = new Date(dateStr);
      let label = '';
      if (index === 0 || index === 7 || index === 13) {
        label = index === 13 ? 'Today' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      }
      return {
        day: label,
        fullDate: dateStr,
        achieved: Math.round(points),
        expected: -1500 // Mock expected loss/burn
      };
    });

    return NextResponse.json({
      enrolledCourses,
      suggestedCourses,
      watchedTags,
      recentLessons: enrolledCourses,
      activityChartData
    });
  } catch (err: any) {
    console.error('Dashboard error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
