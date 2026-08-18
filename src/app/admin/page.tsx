"use client";

import React from "react";
import useSWR from 'swr';
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { MetricCards } from "@/components/admin/MetricCards";
import { PerformanceChart } from "@/components/admin/PerformanceChart";
import { SalesGaugeChart } from "@/components/admin/SalesGaugeChart";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";

const apiFetcher = (url: string) => fetch(url).then(async (res) => {
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || 'Failed to fetch data');
  return data;
});

export default function AdminDashboard() {
  const { data, error, isLoading } = useSWR('/api/admin/dashboard', apiFetcher);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full pb-10 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-full w-32"></div>
        </div>
        
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2 h-[400px] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
          <div className="lg:col-span-1 h-[400px] bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
        </div>

        {/* Table Skeleton */}
        <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-3xl"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-screen text-red-500">Failed to load dashboard data</div>;
  }

  return (
    <div className="flex flex-col w-full h-full pb-10">
      <DashboardHeader />
      
      <div className="mb-8">
        <MetricCards metricsData={data.metrics} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart chartData={data.performanceData} />
        </div>
        <div className="lg:col-span-1">
          <SalesGaugeChart gaugeData={data.gaugeData} totalEnrollments={data.metrics.totalEnrollments} totalRevenue={data.metrics.totalRevenue} />
        </div>
      </div>

      <RecentOrdersTable orders={data.recentOrders} />
    </div>
  );
}
