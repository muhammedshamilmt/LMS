import React from 'react';
import { CourseCard } from '@/components/course-card';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DUMMY_COURSES = [
  {
    id: '1',
    topBadge: 'UI/UX Design',
    category: 'Design',
    title: 'Advanced User Interface Design',
    tags: ['Figma', 'Prototyping', 'Web'],
    price: '$89.00',
    instructor: 'Jane Doe',
    bgColor: 'bg-[#FFEB3B]',
    logoFallback: 'D'
  },
  {
    id: '2',
    topBadge: 'Development',
    category: 'Programming',
    title: 'Fullstack Next.js Bootcamp',
    tags: ['React', 'Next.js', 'Tailwind'],
    price: '$120.00',
    instructor: 'John Smith',
    bgColor: 'bg-[#E3F2FD]',
    logoFallback: 'P'
  },
  {
    id: '3',
    topBadge: 'Marketing',
    category: 'Business',
    title: 'Digital Marketing Masterclass',
    tags: ['SEO', 'Social Media', 'Ads'],
    price: '$65.00',
    instructor: 'Emily Chen',
    bgColor: 'bg-[#FCE4EC]',
    logoFallback: 'M'
  },
  {
    id: '4',
    topBadge: 'Data Science',
    category: 'Analytics',
    title: 'Python for Data Analysis',
    tags: ['Python', 'Pandas', 'Jupyter'],
    price: '$95.00',
    instructor: 'Michael Brown',
    bgColor: 'bg-[#E8F5E9]',
    logoFallback: 'A'
  },
  {
    id: '5',
    topBadge: 'Mobile App',
    category: 'Programming',
    title: 'Flutter & Dart - The Complete Guide',
    tags: ['Flutter', 'Mobile', 'iOS'],
    price: '$110.00',
    instructor: 'Alex Johnson',
    bgColor: 'bg-[#E0F7FA]',
    logoFallback: 'F'
  },
  {
    id: '6',
    topBadge: 'Photography',
    category: 'Art',
    title: 'Mastering Landscape Photography',
    tags: ['Camera', 'Editing', 'Lightroom'],
    price: '$45.00',
    instructor: 'Sarah Wilson',
    bgColor: 'bg-[#FFF3E0]',
    logoFallback: 'L'
  }
];

export default function AdminCoursesPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Courses</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">Manage and create courses for your platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 bg-white dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-500 transition-colors"
            />
          </div>
          <Button variant="outline" className="gap-2 rounded-full border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10 hover:bg-gray-50 py-5 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Link href="/admin/courses/new">
            <Button className="gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:text-white border-0 py-5 transition-colors">
              <Plus className="w-5 h-5" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DUMMY_COURSES.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
