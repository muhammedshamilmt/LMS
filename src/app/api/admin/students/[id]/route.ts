import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: Request, context: any) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    // 1. Fetch user profile
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Fetch all transactions for this user
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select(`
        *,
        course:courses(title)
      `)
      .eq('user_id', id)
      .order('created_at', { ascending: false });

    if (txError) throw txError;

    // 3. Fetch all enrolled courses
    const { data: enrollments, error: enrollError } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('user_id', id)
      .order('created_at', { ascending: false });

    if (enrollError) throw enrollError;

    // 4. Calculate Stats
    const totalSpent = transactions?.reduce((sum, tx) => sum + Number(tx.amount || 0), 0) || 0;
    const enrolledCoursesCount = enrollments?.length || 0;
    
    // Check how many courses have 100% progress
    let completedCoursesCount = 0;
    
    // We could fetch course_progress to get exact completion, but for now we'll 
    // mock it to 0 or check if there is a 'completed_at' field in enrollments.
    // Assuming enrollments table doesn't track full completion percentage directly without querying progress.
    // Let's stick to 0 for completed unless we fetch progress. 

    // Activity Log mapping (derived from transactions and enrollments)
    const activityLog: any[] = [];
    
    enrollments?.forEach(enroll => {
      activityLog.push({
        id: `enroll-${enroll.id}`,
        type: 'course_enrollment',
        title: `Enrolled in ${enroll.course?.title}`,
        date: new Date(enroll.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        timestamp: new Date(enroll.created_at).getTime()
      });
    });

    transactions?.forEach(tx => {
      activityLog.push({
        id: `tx-${tx.id}`,
        type: 'purchase',
        title: `Purchased ${tx.course?.title || 'Unknown'}`,
        date: new Date(tx.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        timestamp: new Date(tx.created_at).getTime()
      });
    });

    // Sort activity log by date descending
    activityLog.sort((a, b) => b.timestamp - a.timestamp);

    // 5. Format response
    const formattedStudent = {
      id: user.id,
      name: user.full_name || 'Unknown',
      email: user.email || 'No email',
      phone: user.phone || 'No phone',
      joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      location: user.region || 'Unknown Location',
      status: user.status || 'Active',
      avatar: user.avatar_url || '',
      stats: {
        enrolledCourses: enrolledCoursesCount,
        completedCourses: completedCoursesCount,
        totalSpent: `$${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        avgScore: 'N/A' // Not tracked yet
      },
      transactions: transactions?.map(tx => ({
        id: tx.id,
        date: new Date(tx.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: tx.course?.title || 'Course Purchase',
        amount: `$${Number(tx.amount).toFixed(2)}`,
        status: tx.status === 'completed' ? 'Completed' : 'Pending', // Capitalized
        method: tx.payment_method === 'card' ? 'Credit Card' : 'Bank Transfer',
        details: {
          account: user.email,
          date: new Date(tx.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        }
      })) || [],
      enrollments: enrollments?.map(e => ({
        id: e.id,
        courseId: e.course_id,
        courseTitle: e.course?.title,
        courseThumbnail: e.course?.thumbnail_url,
        progress: 0, // Need to fetch progress separately if needed
        enrolledAt: new Date(e.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      })) || [],
      activityLog
    };

    return NextResponse.json(formattedStudent);

  } catch (err: any) {
    console.error('Error fetching admin student details:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
