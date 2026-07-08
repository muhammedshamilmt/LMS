import React from 'react';
import { ChevronDown, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <div className="flex items-end justify-between w-full mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sales Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your current sales summary and activity</p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2 text-gray-600 dark:text-gray-300 rounded-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
          This Month
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </Button>
        <Button variant="outline" className="gap-2 text-gray-600 dark:text-gray-300 rounded-full border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Button className="gap-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 border-0 dark:text-white">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
    </div>
  );
}
