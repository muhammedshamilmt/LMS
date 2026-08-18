import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function CourseAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  // Fetch all transactions for this course
  const { data: transactions } = await supabase
    .from('transactions')
    .select('amount, status, created_at')
    .eq('course_id', id);

  // Fetch enrollments
  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('id, created_at')
    .eq('course_id', id);

  // Fetch modules
  const { data: modules } = await supabase
    .from('course_modules')
    .select('id')
    .eq('course_id', id);

  // Fetch progress
  const { data: progress } = await supabase
    .from('course_progress')
    .select('id, user_id, module_id')
    .eq('course_id', id);

  // Calculate Total Revenue
  const totalRevenue = transactions
    ?.filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0) || 0;

  // Calculate Enrollments
  const totalEnrollments = enrollments?.length || 0;

  // Calculate Completion Rate
  const moduleCount = modules?.length || 0;
  let completionRate = 0;
  if (moduleCount > 0 && totalEnrollments > 0) {
    const totalExpectedProgress = totalEnrollments * moduleCount;
    const actualProgress = progress?.length || 0;
    completionRate = Math.round((actualProgress / totalExpectedProgress) * 100);
    if (completionRate > 100) completionRate = 100;
  }

  // Drop-off rate
  const dropOffRate = completionRate > 0 ? 100 - completionRate : 0;

  // Chart data for the last 7 days
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return {
      date: d,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: 0,
      enrollments: 0
    };
  });

  transactions?.forEach(tx => {
    if (tx.status !== 'completed') return;
    const txDate = new Date(tx.created_at);
    const day = last7Days.find(d => 
      d.date.getDate() === txDate.getDate() && 
      d.date.getMonth() === txDate.getMonth() && 
      d.date.getFullYear() === txDate.getFullYear()
    );
    if (day) {
      day.revenue += Number(tx.amount || 0);
    }
  });

  enrollments?.forEach(en => {
    const enDate = new Date(en.created_at);
    const day = last7Days.find(d => 
      d.date.getDate() === enDate.getDate() && 
      d.date.getMonth() === enDate.getMonth() && 
      d.date.getFullYear() === enDate.getFullYear()
    );
    if (day) {
      day.enrollments += 1;
    }
  });

  const maxRevenue = Math.max(...last7Days.map(d => d.revenue), 100);
  const maxEnrollments = Math.max(...last7Days.map(d => d.enrollments), 10);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Course Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Detailed performance metrics for this course.</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-zinc-800 dark:text-zinc-100 cursor-pointer">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <Button variant="outline" className="text-sm">Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-xl border border-gray-100 dark:border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mt-1">${totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-xl border border-gray-100 dark:border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">Total Enrollments</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mt-1">{totalEnrollments}</h3>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-xl border border-gray-100 dark:border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">Completion Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mt-1">{completionRate}%</h3>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-xl border border-gray-100 dark:border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">Drop-off Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 mt-1">{dropOffRate}%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Enrollments Chart */}
        <div className="bg-white dark:bg-zinc-900/50 rounded-xl border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-zinc-100 mb-6">Enrollment Trends (Last 7 Days)</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {last7Days.map((day, i) => {
              const height = (day.enrollments / maxEnrollments) * 100;
              return (
                <div key={i} className="w-full bg-blue-100 dark:bg-blue-500/20 rounded-t-sm relative group" style={{ minHeight: '1px' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600"
                    style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      {day.enrollments}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {last7Days.map((day, i) => (
              <span key={i}>{day.dayName}</span>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-zinc-900/50 rounded-xl border border-gray-200 dark:border-white/10 p-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-zinc-100 mb-6">Revenue Overview (Last 7 Days)</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {last7Days.map((day, i) => {
              const height = (day.revenue / maxRevenue) * 100;
              return (
                <div key={i} className="w-full bg-purple-100 dark:bg-purple-500/20 rounded-t-sm relative group" style={{ minHeight: '1px' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-purple-500 rounded-t-sm transition-all duration-500 group-hover:bg-purple-600"
                    style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      ${day.revenue}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {last7Days.map((day, i) => (
              <span key={i}>{day.dayName}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
