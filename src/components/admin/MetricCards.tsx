import React from 'react';
import { ShoppingCart, Users, Package, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
  previousValue: string;
  icon: React.ElementType;
  isPrimary?: boolean;
}

function MetricCard({ title, value, trend, trendValue, previousValue, icon: Icon, isPrimary }: MetricCardProps) {
  return (
    <div className={cn(
      "flex flex-col p-6 rounded-3xl",
      isPrimary
        ? "bg-gradient-to-br from-blue-500 to-blue-400 text-white  "
        : "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-100 dark:border-zinc-800"
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cn("text-sm font-medium", isPrimary ? "text-blue-100" : "text-gray-500 dark:text-gray-400")}>
          {title}
        </h3>
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full",
          isPrimary ? "bg-white" : "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
        )}>
          {isPrimary ? (
            <ShoppingCart className="w-5 h-5 text-blue-500" />
          ) : title === "Return Products" ? (
            <Package className="w-5 h-5 bg-blue-500 rounded-full p-[3px] text-white" />
          ) : title === "Total Revenue" ? (
            <DollarSign className="w-5 h-5 bg-blue-500 rounded-full p-[3px] text-white" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-4xl font-bold">{value}</span>
        {trendValue && (
          <span className={cn(
            "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
            isPrimary
              ? "bg-blue-400/30 text-white"
              : trend === 'up'
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400"
          )}>
            {trend === 'up' ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
            {trendValue}
          </span>
        )}
      </div>

      <div className={cn("text-sm", isPrimary ? "text-blue-100" : "text-gray-400 dark:text-gray-500")}>
        Last month: {previousValue}
      </div>
    </div>
  );
}

export function MetricCards() {
  const metrics = [
    {
      title: "Total Sales",
      value: "2500",
      trend: "up" as const,
      trendValue: "4.9%",
      previousValue: "2345",
      icon: ShoppingCart,
      isPrimary: true,
    },
    {
      title: "New Customer",
      value: "110",
      trend: "up" as const,
      trendValue: "7.5%",
      previousValue: "89",
      icon: Users,
    },
    {
      title: "Return Products",
      value: "72",
      trend: "down" as const,
      trendValue: "6.0%",
      previousValue: "60",
      icon: Package,
    },
    {
      title: "Total Revenue",
      value: "$8,220.64",
      trend: "up" as const,
      trendValue: "",
      previousValue: "$620.00",
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
