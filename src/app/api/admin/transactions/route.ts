import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = createAdminClient();
    
    // 1. Get all transactions joined with users and courses for lists/stats
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select(`
        *,
        user:users(full_name, email, avatar_url),
        course:courses(title)
      `)
      .order('created_at', { ascending: false });

    if (txError) throw txError;

    // 2. Account Balance
    const accountBalance = transactions?.reduce((sum, tx) => sum + Number(tx.amount || 0), 0) || 0;

    // 3. Total Courses
    const { count: totalCourses, error: courseCountError } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true });

    // 4. Active Students (distinct user_ids from enrollments)
    const { data: enrollments, error: enrollError } = await supabase
      .from('course_enrollments')
      .select('user_id');
      
    const activeStudents = new Set((enrollments || []).map(e => e.user_id)).size;

    // 5. Best Selling Courses Aggregation
    const courseSales: Record<string, { title: string, sales: number, revenue: number }> = {};
    
    transactions?.forEach(tx => {
      const courseId = tx.course_id;
      const title = tx.course?.title || 'Unknown Course';
      const amount = Number(tx.amount || 0);

      if (!courseSales[courseId]) {
        courseSales[courseId] = { title, sales: 0, revenue: 0 };
      }
      courseSales[courseId].sales += 1;
      courseSales[courseId].revenue += amount;
    });

    const bestSellingCourses = Object.values(courseSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3); // top 3

    // 6. Overview Chart (Earnings by Month for the current year)
    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const chartData = months.map(month => ({ name: month, earnings: 0 }));

    transactions?.forEach(tx => {
      const date = new Date(tx.created_at);
      if (date.getFullYear() === currentYear) {
        const monthIndex = date.getMonth();
        chartData[monthIndex].earnings += Number(tx.amount || 0);
      }
    });

    // 7. Format Recent Transactions for UI
    const recentTransactions = transactions?.map(tx => {
      return {
        id: tx.id,
        type: "Received", // Always received since these are course purchases
        amount: `+ $${Number(tx.amount).toFixed(2)}`,
        paymentMethod: tx.payment_method,
        status: tx.status,
        activity: `Course Purchase: ${tx.course?.title || 'Unknown'}`,
        personName: tx.user?.full_name || 'Anonymous User',
        personEmail: tx.user?.email || '',
        personAvatar: tx.user?.avatar_url || null,
        personInitial: tx.user?.full_name ? tx.user.full_name[0] : 'U',
        date: new Date(tx.created_at).toLocaleString('en-US', { 
          month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' 
        })
      };
    }) || [];

    return NextResponse.json({
      accountBalance,
      totalExpenses: 0,
      totalSavings: accountBalance,
      courseGrowth: {
        totalCourses: totalCourses || 0,
        activeStudents
      },
      bestSellingCourses,
      chartData,
      recentTransactions
    });

  } catch (err: any) {
    console.error('Error fetching admin transactions:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
