require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.IMAGEKIT_PRIVATE_KEY); // just use service role key
async function run() {
  const userId = '00000000-0000-0000-0000-000000000000'; // test with any ID
  
  try {
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
    console.log("Enrollments:", enrollments.length);

    let enrolledCourseIds = enrollments.map(e => e.course_id) || [];
    enrolledCourseIds = enrolledCourseIds.length > 0 ? enrolledCourseIds : ['00000000-0000-0000-0000-000000000000'];

    const { data: progress, error: progError } = await supabase
      .from('course_progress')
      .select('module_id, course_id, created_at')
      .eq('user_id', userId)
      .in('course_id', enrolledCourseIds);

    if (progError) throw progError;
    console.log("Progress success!");
  } catch(e) {
    console.error("DB Error:", e);
  }
}
run();
