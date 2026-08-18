import React from 'react';
import { Users, Clock, Star, BookOpen, Video, FileText, Download, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { createAdminClient } from '@/lib/supabase/admin';

export default async function CourseOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
        <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">Course not found</h2>
        <p className="text-gray-500">The course you are looking for does not exist or has been deleted.</p>
        <Link href="/admin/courses">
          <Button className="mt-4">Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const { data: modules } = await supabase
    .from('course_modules')
    .select('*, course_lessons(*)')
    .eq('course_id', id)
    .order('order_index');

  let totalLessons = 0;
  let totalDurationMinutes = 0;
  const formattedModules = (modules || []).map((m: any) => {
    totalLessons += m.course_lessons?.length || 0;
    
    // Parse duration
    let mins = 0;
    if (m.duration) {
      const durationStr = m.duration.toString().toLowerCase();
      const hoursMatch = durationStr.match(/(\d+)\s*h/);
      const minutesMatch = durationStr.match(/(\d+)\s*m/);
      if (hoursMatch) mins += parseInt(hoursMatch[1]) * 60;
      if (minutesMatch) mins += parseInt(minutesMatch[1]);
      if (!hoursMatch && !minutesMatch) {
        const num = parseInt(durationStr);
        if (!isNaN(num)) mins += num;
      }
      totalDurationMinutes += mins;
    }
    
    return {
      title: m.title || 'Untitled Module',
      lessons: m.course_lessons?.length || 0,
      duration: m.duration || '0m'
    };
  });

  const displayDuration = totalDurationMinutes >= 60 
    ? `${Math.floor(totalDurationMinutes / 60)}h ${totalDurationMinutes % 60}m`
    : `${totalDurationMinutes}m`;

  const { count: enrolledCount } = await supabase
    .from('course_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('course_id', id);

  const courseData = {
    title: course.title || 'Untitled Course',
    description: course.about_text_1 || course.short_description || course.detailed_description || 'No description provided.',
    instructor: course.author_name || 'Unknown Instructor',
    price: course.price ? `$${course.price}` : 'Free',
    status: course.is_draft ? 'Draft' : 'Published',
    thumbnail: course.thumbnail_url,
    promoVideo: course.promo_video_url,
    stats: {
      enrolled: enrolledCount || 0,
      duration: displayDuration,
      rating: 0,
      lessons: totalLessons
    },
    modules: formattedModules
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{courseData.title}</h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-1 max-w-2xl">{courseData.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 rounded-full text-xs font-medium border border-green-200 dark:border-green-500/20">
            {courseData.status}
          </span>
          <Link href={`/admin/courses/${id}/preview`}>
            <Button variant="outline" className="text-sm h-9">Edit Course</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Enrolled</p>
            <p className="text-xl font-bold text-gray-900 dark:text-zinc-100">{courseData.stats.enrolled}</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Duration</p>
            <p className="text-xl font-bold text-gray-900 dark:text-zinc-100">{courseData.stats.duration}</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Rating</p>
            <p className="text-xl font-bold text-gray-900 dark:text-zinc-100">{courseData.stats.rating}</p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Lessons</p>
            <p className="text-xl font-bold text-gray-900 dark:text-zinc-100">{courseData.stats.lessons}</p>
          </div>
        </div>
      </div>

      {/* Curriculum Overview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-4">Curriculum Outline</h3>
        <div className="space-y-3">
          {courseData.modules.map((module, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 group hover:border-gray-200 dark:hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-white/10">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-zinc-100">{module.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> {module.lessons} lessons</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {module.duration}</span>
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
