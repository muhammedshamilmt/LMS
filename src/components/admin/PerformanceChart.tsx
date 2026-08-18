"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Static data removed

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl">
        <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{`August 2026`}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Sales</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">440</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">$4.5k</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function PerformanceChart({ chartData = [] }: { chartData?: any[] }) {
  return (
    <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Overview</h3>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800">
          This Week
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </button>
      </div>

      <div className="flex-1 w-full mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={0} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" opacity={0.3} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="TotalSales" stackId="a" fill="#F3F4F6" radius={[0, 0, 8, 8]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isActive ? '#DBEAFE' : '#F3F4F6'} className="dark:opacity-20" />
              ))}
            </Bar>
            <Bar dataKey="TotalRevenue" stackId="a" fill="#E5E7EB" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isActive ? '#3B82F6' : '#E5E7EB'} className="dark:opacity-80" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
