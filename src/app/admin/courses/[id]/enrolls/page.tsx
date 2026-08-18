import React from 'react';
import { Search, Filter, MoreHorizontal, Download, Mail, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { createAdminClient } from '@/lib/supabase/admin';

export default async function CourseEnrollsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  // 1. Fetch enrollments for this course
  const { data: enrollments } = await supabase
    .from('course_enrollments')
    .select('*')
    .eq('course_id', id)
    .order('created_at', { ascending: false });

  let enrolledStudents: any[] = [];

  if (enrollments && enrollments.length > 0) {
    const userIds = enrollments.map((e) => e.user_id);
    
    // 2. Fetch users
    const { data: users } = await supabase
      .from('users')
      .select('id, full_name, email, avatar_url')
      .in('id', userIds);

    const userMap = new Map();
    users?.forEach(u => userMap.set(u.id, u));

    // 3. Fetch progress for this course and these users
    const { data: progress } = await supabase
      .from('course_progress')
      .select('user_id, module_id, completed_at')
      .eq('course_id', id)
      .in('user_id', userIds);

    const progressMap = new Map();
    progress?.forEach(p => {
      const pCount = progressMap.get(p.user_id) || 0;
      progressMap.set(p.user_id, pCount + 1);
    });

    // 4. Fetch total modules for the course
    const { count: totalModules } = await supabase
      .from('course_modules')
      .select('*', { count: 'exact', head: true })
      .eq('course_id', id);

    const maxModules = totalModules || 1;

    // 5. Combine data
    enrolledStudents = enrollments.map((e) => {
      const user = userMap.get(e.user_id);
      const completedModules = progressMap.get(e.user_id) || 0;
      const progressPercent = Math.round((completedModules / maxModules) * 100);
      
      return {
        id: e.user_id,
        name: user?.full_name || 'Unknown User',
        email: user?.email || 'No email',
        avatar: user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U',
        enrolledDate: new Date(e.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
        progress: progressPercent > 100 ? 100 : progressPercent,
        status: progressPercent >= 100 ? 'Completed' : 'Active',
        lastActive: 'Active' // Simplification
      };
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Enrolled Students</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Manage students enrolled in this course.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-64 bg-white dark:bg-white/5 dark:text-zinc-100 transition-colors"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 rounded-lg">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="gap-2 shrink-0 rounded-lg hidden sm:flex">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Enrolled</th>
                <th className="px-6 py-4 font-medium">Progress</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Active</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {enrolledStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-medium shrink-0">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-zinc-100">{student.name}</p>
                        <p className="text-xs text-gray-500 dark:text-zinc-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">
                    {student.enrolledDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 w-32">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                          style={{ width: `${student.progress}%` }} 
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-zinc-300">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                      student.status === 'Active' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                      student.status === 'Completed' ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                      'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-zinc-300">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                        <Ban className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-sm text-gray-500 dark:text-zinc-400">
          <span>Showing {enrolledStudents.length} entries</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
