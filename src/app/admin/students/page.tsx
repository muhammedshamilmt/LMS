"use client";

import React, { useState } from 'react';
import { Search, Filter, Download, Plus, ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const DUMMY_STUDENTS = [
  { id: '1', name: 'Jenny Wilson', email: 'jenny.w@example.com', lastActive: 'Sep 12 at 09:10 AM', status: 'Active', created: '1 month ago', platform: 'Web', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'David Lane', email: 'david.l@example.com', lastActive: 'Sep 12 at 10:15 AM', status: 'Inactive', created: '2 months ago', platform: 'App', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Michael Smith', email: 'michael.s@example.com', lastActive: 'Sep 12 at 11:20 AM', status: 'Pending', created: '3 months ago', platform: 'Web', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Chris Lee', email: 'chris.l@example.com', lastActive: 'Sep 12 at 12:25 PM', status: 'Active', created: '4 months ago', platform: 'Web', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Emily Johnson', email: 'emily.j@example.com', lastActive: 'Sep 12 at 01:30 PM', status: 'Inactive', created: '5 months ago', platform: 'App', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Steven Davis', email: 'steven.d@example.com', lastActive: 'Sep 12 at 02:35 PM', status: 'Pending', created: '6 months ago', platform: 'Web', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Alex Jaka', email: 'alex.j@example.com', lastActive: 'Sep 12 at 03:40 PM', status: 'Active', created: '7 months ago', platform: 'App', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: '8', name: 'James Brown', email: 'james.b@example.com', lastActive: 'Sep 12 at 04:45 PM', status: 'Inactive', created: '8 months ago', platform: 'Web', avatar: 'https://i.pravatar.cc/150?u=8' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Active: 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
    Inactive: 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
    Pending: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
  }[status] || 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${styles}`}>
      {status}
    </span>
  );
};

export default function StudentsPage() {
  const [view, setView] = useState<'list' | 'grid'>('list');

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Students</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search students..."
            className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 md:w-80 bg-white dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-500 transition-colors"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex flex-col bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none">

        {/* Table Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-full">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${view === 'list' ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-zinc-100 shadow-sm' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100'}`}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setView('grid')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${view === 'grid' ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-zinc-100 shadow-sm' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100'}`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 rounded-full border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2 rounded-full border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Link href="/admin/students/new">
              <Button className="gap-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-gray-200 border-0 transition-colors">
                <Plus className="w-5 h-5" />
                Add New Student
              </Button>
            </Link>
          </div>
        </div>

        {/* Content View */}
        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 dark:text-zinc-400 bg-white dark:bg-transparent border-b border-gray-100 dark:border-white/5">
                <tr>
                  <th className="px-6 py-5 font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-white/20 bg-transparent" />
                      Student
                    </div>
                  </th>
                  <th className="px-6 py-5 font-medium whitespace-nowrap">Email</th>
                  <th className="px-6 py-5 font-medium whitespace-nowrap">Last Active</th>
                  <th className="px-6 py-5 font-medium whitespace-nowrap">Status</th>
                  <th className="px-6 py-5 font-medium whitespace-nowrap">Created</th>
                  <th className="px-6 py-5 font-medium whitespace-nowrap">Platform</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_STUDENTS.map((student) => (
                  <tr key={student.id} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 dark:border-white/20 bg-transparent" onClick={(e) => e.stopPropagation()} />
                        <Link href={`/admin/students/${student.id}`} className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{student.name}</span>
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-zinc-400"><Link href={`/admin/students/${student.id}`}>{student.email}</Link></td>
                    <td className="px-6 py-4 text-gray-500 dark:text-zinc-400">
                      <Link href={`/admin/students/${student.id}`}>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-zinc-600" />
                          {student.lastActive}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/students/${student.id}`}>
                        <StatusBadge status={student.status} />
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-zinc-400"><Link href={`/admin/students/${student.id}`}>{student.created}</Link></td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/students/${student.id}`}>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-300 rounded-md border border-gray-200 dark:border-white/10">
                          {student.platform}
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {DUMMY_STUDENTS.map((student) => (
              <Link href={`/admin/students/${student.id}`} key={student.id} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 rounded-3xl hover:border-blue-200 dark:hover:border-blue-500/30 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-none group cursor-pointer">
                <Avatar className="w-20 h-20 mb-4 ring-4 ring-gray-50 dark:ring-white/5 transition-all group-hover:ring-blue-50 dark:group-hover:ring-blue-500/10">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{student.name}</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mb-5">{student.email}</p>
                <StatusBadge status={student.status} />
                <div className="flex items-center gap-2 mt-5 text-xs font-medium text-gray-500 dark:text-zinc-500 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-zinc-600" />
                  {student.lastActive}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400">
            <span>Show</span>
            <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-2 py-1 outline-none text-gray-900 dark:text-zinc-100">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span>Students per page</span>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black font-medium text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 font-medium text-sm transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 font-medium text-sm transition-colors">
              3
            </button>
            <span className="px-2 text-gray-400 dark:text-zinc-500">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 font-medium text-sm transition-colors">
              16
            </button>
            <button className="p-1 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
