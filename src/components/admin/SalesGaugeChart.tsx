"use client";

import React from 'react';
import { MoreHorizontal, ArrowUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 10 },
  { name: 'C', value: 10 },
  { name: 'D', value: 10 },
  { name: 'E', value: 10 },
  { name: 'F', value: 10 },
  { name: 'G', value: 10 },
  { name: 'H', value: 10 },
  { name: 'I', value: 10 },
  { name: 'J', value: 10 },
];

const COLORS = [
  '#2563EB', '#2563EB', '#3B82F6', '#3B82F6', '#60A5FA',
  '#93C5FD', '#BFDBFE', '#E0F2FE', '#F0F9FF', '#F8FAFC'
];

export function SalesGaugeChart() {
  return (
    <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
        <button className="p-2 text-gray-400 dark:text-gray-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex items-center justify-center flex-1 w-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%] flex flex-col items-center">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">70.8%</span>
          <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sales Growth</span>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className={index >= 8 ? "dark:opacity-20" : ""} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <div className="flex flex-col flex-1 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
          <span className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Number of Sales</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">2,343</span>
            <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
              <ArrowUp className="w-3 h-3 mr-0.5" />
              4.5%
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
          <span className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">$30.9k</span>
            <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900">
              <ArrowUp className="w-3 h-3 mr-0.5" />
              4.5%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
