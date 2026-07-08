import React from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { MetricCards } from "@/components/admin/MetricCards";
import { PerformanceChart } from "@/components/admin/PerformanceChart";
import { SalesGaugeChart } from "@/components/admin/SalesGaugeChart";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col w-full h-full pb-10">
      <DashboardHeader />
      
      <div className="mb-8">
        <MetricCards />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-1">
          <SalesGaugeChart />
        </div>
      </div>

      <RecentOrdersTable />
    </div>
  );
}
