import React from "react";
import { MetricCards } from "@/components/admin/MetricCards";
import { PerformanceChart } from "@/components/admin/PerformanceChart";
import { SalesGaugeChart } from "@/components/admin/SalesGaugeChart";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col w-full h-full pb-10">
      
      {/* Header matching the image's top section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">Track your sales and performance of your strategy</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 text-gray-600 dark:text-zinc-300 rounded-full border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2 text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 border-0 transition-colors">
            <Plus className="w-4 h-4" />
            Add Widget
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="mb-8">
        <MetricCards />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <SalesGaugeChart />
        </div>
      </div>

      {/* Bottom section: Heatmap/Visits and Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Heatmap component for "Total visits" */}
        <div className="lg:col-span-1 flex flex-col p-6 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none h-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-gray-500 dark:text-zinc-400 font-medium">Total visits by hourly</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-zinc-100">288,822</span>
                <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400">
                  +1.4%
                </span>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 text-gray-400 dark:text-zinc-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <span className="text-xl leading-none -mt-2">...</span>
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-end pb-2">
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 text-[10px] text-gray-400 dark:text-zinc-500 font-semibold justify-around py-0.5">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
              </div>
              <div className="flex-1 grid grid-cols-6 gap-1.5">
                {Array.from({length: 24}).map((_, i) => {
                  let colorClass = 'bg-gray-100 dark:bg-white/5';
                  if ([2, 7, 14, 18, 22].includes(i)) colorClass = 'bg-blue-500 dark:bg-blue-600';
                  else if ([1, 5, 10, 15, 20].includes(i)) colorClass = 'bg-blue-300 dark:bg-blue-400/80';
                  else if ([3, 8, 12, 17, 21].includes(i)) colorClass = 'bg-blue-100 dark:bg-blue-400/30';
                  
                  return (
                    <div 
                      key={i} 
                      className={`rounded-sm ${colorClass} transition-colors hover:opacity-80`} 
                      style={{ height: '28px' }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {/* Reusing RecentOrdersTable but stripping its external margins via tailwind arbitrary selectors */}
          <div className="[&>div]:!mt-0 [&>div]:!mb-0 h-full">
            <RecentOrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
}
