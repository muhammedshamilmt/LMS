import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch basic counts
    const { count: usersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: coursesCount } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true });

    const { count: enrollmentsCount } = await supabase
      .from('course_enrollments')
      .select('*', { count: 'exact', head: true });

    // Fetch all transactions for revenue and performance chart
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select(`
        *,
        user:users(full_name, avatar_url),
        course:courses(title, thumbnail_url, category)
      `)
      .order('created_at', { ascending: false });

    if (txError) throw txError;

    // Fetch enrollments with course details for pie chart
    const { data: enrollments, error: enrollError } = await supabase
      .from('course_enrollments')
      .select(`
        course_id,
        course:courses(title)
      `);

    if (enrollError) throw enrollError;

    // --- Metrics ---
    const totalRevenue = transactions?.reduce((sum, tx) => sum + Number(tx.amount || 0), 0) || 0;
    const metrics = {
      totalEnrollments: enrollmentsCount || 0,
      totalStudents: usersCount || 0,
      activeCourses: coursesCount || 0,
      totalRevenue: totalRevenue
    };

    // --- Performance Chart Data ---
    const monthlyData: Record<string, { TotalSales: number, TotalRevenue: number }> = {
      'Jan': { TotalSales: 0, TotalRevenue: 0 },
      'Feb': { TotalSales: 0, TotalRevenue: 0 },
      'Mar': { TotalSales: 0, TotalRevenue: 0 },
      'Apr': { TotalSales: 0, TotalRevenue: 0 },
      'May': { TotalSales: 0, TotalRevenue: 0 },
      'Jun': { TotalSales: 0, TotalRevenue: 0 },
      'Jul': { TotalSales: 0, TotalRevenue: 0 },
      'Aug': { TotalSales: 0, TotalRevenue: 0 },
      'Sep': { TotalSales: 0, TotalRevenue: 0 },
      'Oct': { TotalSales: 0, TotalRevenue: 0 },
      'Nov': { TotalSales: 0, TotalRevenue: 0 },
      'Dec': { TotalSales: 0, TotalRevenue: 0 },
    };

    const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });

    transactions?.forEach(tx => {
      const month = new Date(tx.created_at).toLocaleString('en-US', { month: 'short' });
      if (monthlyData[month]) {
        monthlyData[month].TotalSales += 1;
        monthlyData[month].TotalRevenue += Number(tx.amount || 0);
      }
    });

    const performanceData = Object.entries(monthlyData).map(([name, data]) => ({
      name,
      TotalSales: data.TotalSales,
      TotalRevenue: data.TotalRevenue,
      isActive: name === currentMonth
    }));

    // --- Gauge Chart Data (Enrollment Breakdown) ---
    const courseEnrollmentCounts: Record<string, number> = {};
    enrollments?.forEach(enroll => {
      const courseObj = Array.isArray(enroll.course) ? enroll.course[0] : enroll.course;
      const title = (courseObj as any)?.title || 'Unknown Course';
      courseEnrollmentCounts[title] = (courseEnrollmentCounts[title] || 0) + 1;
    });

    const gaugeData = Object.entries(courseEnrollmentCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Sort highest first

    // --- Recent Orders ---
    const recentOrders = transactions?.slice(0, 5).map(tx => {
      const courseObj = Array.isArray(tx.course) ? tx.course[0] : tx.course;
      const userObj = Array.isArray(tx.user) ? tx.user[0] : tx.user;
      return {
        id: tx.id,
        product: (courseObj as any)?.title || 'Unknown Course',
        date: new Date(tx.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        customer: (userObj as any)?.full_name || 'Unknown User',
        avatar: (userObj as any)?.avatar_url || '',
        category: tx.payment_method === 'card' ? 'Credit Card' : 'Bank Transfer', // Repurposing category for method
        status: tx.status === 'completed' ? 'Delivered' : (tx.status === 'pending' ? 'Processing' : 'Cancelled'),
        items: 1, // Usually 1 course per transaction
        total: `$${Number(tx.amount).toFixed(2)}`
      };
    }) || [];

    return NextResponse.json({
      metrics,
      performanceData,
      gaugeData,
      recentOrders
    });

  } catch (err: any) {
    console.error('Error fetching admin dashboard data:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
