"use client";

import React, { useState } from "react";
import {
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronDown,
  Filter,
  CheckCircle2,
  X,
  ArrowUp,
  ArrowDown,
  CreditCard,
  Briefcase,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TransactionsPage() {
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("payment_lines");

  const { data, error, isLoading } = useSWR('/api/admin/transactions', fetcher);
  
  if (isLoading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <Skeleton className="h-12 w-[300px]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load transactions.</div>;
  }

  const {
    accountBalance = 0,
    totalExpenses = 0,
    totalSavings = 0,
    courseGrowth = { totalCourses: 0, activeStudents: 0 },
    bestSellingCourses = [],
    chartData = [],
    recentTransactions = []
  } = data || {};

  const transactions = recentTransactions;

  return (
    <div className="flex flex-col gap-6 mx-auto w-full text-gray-900 dark:text-gray-100 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Welcome back Sajibur Rahman</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor and control what happens with your money today for financial health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Sun, 12 June 2026</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Balance */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col justify-between ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-lg">$</span>
              </div>
              Account Balance
            </div>
            <div className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full cursor-pointer">
              🇺🇸 USD <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">${accountBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full font-medium">
                <ArrowUpRight className="w-3 h-3" /> 0.0%
              </span>
              <span className="text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col justify-between ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <ArrowDownRight className="text-red-500 w-4 h-4" />
              </div>
              Total Expenses
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full font-medium">
                <ArrowDownRight className="w-3 h-3" /> 0.0%
              </span>
              <span className="text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </div>
        </div>

        {/* Total Savings */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col justify-between ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ArrowUpRight className="text-blue-500 w-4 h-4" />
              </div>
              Total Savings
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">${totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full font-medium">
                <ArrowUpRight className="w-3 h-3" /> 0.0%
              </span>
              <span className="text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Course Growth & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Course Growth & Stats */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Course Growth</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Total Courses</span>
              </div>
              <div className="text-2xl font-bold">{courseGrowth.totalCourses}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">Lifetime total</div>
            </div>

            <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-800/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Active Students</span>
              </div>
              <div className="text-2xl font-bold">{courseGrowth.activeStudents}</div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-medium">Lifetime total</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm text-gray-500 mb-4">Best Selling Courses (Payments)</h4>
            <div className="space-y-4">
              {bestSellingCourses.length > 0 ? bestSellingCourses.map((course: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xl">🚀</div>
                    <div>
                      <div className="font-medium text-sm group-hover:text-blue-600 transition-colors">{course.title}</div>
                      <div className="text-xs text-gray-500">{course.sales} Sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">${course.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-gray-500">No courses sold yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Overview Chart */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col ">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="block w-2.5 h-2.5 border-2 border-blue-500 rounded-sm"></span>
              </div>
              Overview
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span> Earnings
              </div>
              <div className="flex items-center gap-1 text-sm bg-gray-50 dark:bg-zinc-800 px-3 py-1.5 rounded-full cursor-pointer border border-gray-200 dark:border-zinc-700">
                This Year <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex-1 relative flex items-end min-h-[220px] gap-2 md:gap-4 mt-auto border-b border-gray-100 dark:border-zinc-800 pb-2">
            {(() => {
              const maxEarnings = Math.max(...(chartData.map((d: any) => d.earnings) || [0]), 100); // minimum scale 100
              const ticks = [maxEarnings, maxEarnings * 0.75, maxEarnings * 0.5, maxEarnings * 0.25, 0];
              
              return (
                <>
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 pr-2">
                    {ticks.map((tick, i) => (
                      <span key={i}>${(tick / 1000).toFixed(1)}k</span>
                    ))}
                  </div>

                  <div className="w-full flex justify-between items-end pl-10 h-full relative z-10">
                    {chartData.map((data: any, idx: number) => {
                      const heightPercent = Math.max((data.earnings / maxEarnings) * 100, 5); // min 5% height for visibility
                      const isCurrentMonth = idx === new Date().getMonth();
                      
                      return (
                        <div 
                          key={idx}
                          className={`w-[7%] rounded-t-sm relative group cursor-pointer transition-all ${
                            isCurrentMonth 
                              ? "bg-blue-600 hover:bg-blue-700" 
                              : "bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800/60"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        >
                          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs px-3 py-1.5 rounded whitespace-nowrap ${isCurrentMonth ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <div className="text-[10px] text-gray-300 dark:text-gray-600">Earnings</div>
                            <div className="font-bold">${data.earnings.toLocaleString()}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          <div className="flex justify-between pl-10 mt-3 text-xs text-gray-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Transaction Table (Full Width) */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col ">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CreditCard className="w-3 h-3" />
            </div>
            Recent Transaction
          </h3>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors border border-gray-200 dark:border-zinc-700 px-3 py-1.5 rounded-full">
            Filter <Filter className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 dark:border-zinc-800 uppercase text-xs tracking-wider">
                <th className="pb-4 font-semibold px-2 cursor-pointer flex items-center gap-1">TYPE <ChevronDown className="w-3 h-3" /></th>
                <th className="pb-4 font-semibold">AMOUNT</th>
                <th className="pb-4 font-semibold">PAYMENT METHOD</th>
                <th className="pb-4 font-semibold cursor-pointer flex items-center gap-1">STATUS <ChevronDown className="w-3 h-3" /></th>
                <th className="pb-4 font-semibold">ACTIVITY</th>
                <th className="pb-4 font-semibold">PEOPLE</th>
                <th className="pb-4 font-semibold cursor-pointer flex items-center gap-1">DATE <ChevronDown className="w-3 h-3" /></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((tx: any) => (
                <tr
                  key={tx.id}
                  className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedTx(tx)}
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <ArrowDown className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">{tx.type || 'Received'}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="font-bold text-gray-900 dark:text-gray-100">{tx.amount}</div>
                    <div className="text-xs text-gray-400 font-medium">USD</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium text-gray-700 dark:text-gray-200 capitalize">{tx.paymentMethod}</div>
                    <div className="text-xs text-gray-400">Card</div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-full text-xs font-medium capitalize">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                    {tx.activity}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={tx.personAvatar || undefined} />
                        <AvatarFallback className="bg-orange-400 text-white text-[10px] uppercase">{tx.personInitial}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-700 dark:text-gray-200">{tx.personName}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-300 font-medium text-sm">
                    {tx.date}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Sidebar for Payment Details */}
      {selectedTx && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 py-2 transition-opacity"
            onClick={() => setSelectedTx(null)}
          />
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-[400px] max-w-full rounded-l-2xl bg-[#ffffff] dark:bg-zinc-950 z-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col border-l border-gray-200 dark:border-zinc-800">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Payment Details</h2>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary Card */}
              <div className="bg-[#f3f4f6] dark:bg-zinc-900 rounded-[20px] p-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff5a5f] flex items-center justify-center text-white">
                      <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6">
                        <path d="M16 1.48c-8.02 0-14.52 6.5-14.52 14.52S7.98 30.52 16 30.52 30.52 24.02 30.52 16 24.02 1.48 16 1.48zm4.6 15.65a3.86 3.86 0 0 1-5.4 0l-5.63-5.63a5.53 5.53 0 0 1 7.82-7.82l.5.5.5-.5a5.53 5.53 0 0 1 7.82 7.82l-5.61 5.63zm-4.6-2.1l4.9-4.9a2.76 2.76 0 0 0-3.9-3.9l-1 1-1-1a2.76 2.76 0 0 0-3.9 3.9l4.9 4.9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-0.5">Account</div>
                      <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">
                        {selectedTx.personEmail || "account@example.com"}
                      </div>
                    </div>
                  </div>
                  <div className="text-[15px] font-medium text-gray-900 dark:text-gray-300">
                    {selectedTx.details?.date || selectedTx.date.split(' ')[0]}
                  </div>
                </div>

                <div className="text-[28px] font-semibold mb-5 text-gray-900 dark:text-white">
                  {selectedTx.amount}
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedTx.details?.tags ? selectedTx.details.tags.map((tag: any, i: number) => (
                    <span key={i} className={`text-[13px] px-2.5 py-1 rounded-md ${tag.color} font-medium`}>
                      {tag.label}
                    </span>
                  )) : (
                    <span className="text-[13px] px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 font-medium">Standard</span>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex p-1.5 bg-[#f3f4f6] dark:bg-zinc-900 rounded-2xl mb-6">
                <button
                  className={`flex-1 py-2.5 text-[15px] font-medium rounded-xl transition-all ${activeTab === 'payment_lines' ? 'bg-white dark:bg-zinc-800  text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  onClick={() => setActiveTab('payment_lines')}
                >
                  Payment Lines
                </button>
                <button
                  className={`flex-1 py-2.5 text-[15px] font-medium rounded-xl transition-all ${activeTab === 'workflow_logs' ? 'bg-white dark:bg-zinc-800  text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  onClick={() => setActiveTab('workflow_logs')}
                >
                  Workflow Logs
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'payment_lines' && selectedTx.details?.paymentLines && (
                <div className="space-y-4">
                  {selectedTx.details.paymentLines.map((line: any, index: number) => (
                    <div key={index} className="bg-white dark:bg-zinc-900 rounded-[20px] border border-gray-200 dark:border-zinc-800 overflow-hidden  hover:shadow-md transition-shadow">
                      <div className="p-5 pb-4 bg-white dark:bg-zinc-900">
                        <div className="flex justify-between items-start mb-1.5">
                          <div className="font-bold text-[16px] text-gray-900 dark:text-gray-100 pr-2 leading-tight">{line.name}</div>
                          <div className="text-[14px] font-medium text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md whitespace-nowrap">{line.dateRange}</div>
                        </div>
                        <div className="flex justify-between items-center text-[13px] mt-2">
                          <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
                            {line.id} <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-gray-500 font-medium flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {line.nights}</span>
                        </div>
                      </div>

                      <div className="px-5 py-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 space-y-3.5">
                        {line.breakdown.map((item: any, i: number) => (
                          <div key={i} className="flex justify-between text-[14px] items-center">
                            <span className="text-gray-500 font-medium flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${item.amount.startsWith('-') ? 'bg-red-400' : 'bg-green-400'}`}></span>
                              {item.label}
                            </span>
                            <span className={`font-semibold ${item.amount.startsWith('-') ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'}`}>
                              {item.amount}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="px-5 py-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900">
                        <span className="font-semibold text-[14px] text-gray-500">Net Total</span>
                        <span className="font-bold text-[18px] text-blue-600 dark:text-blue-400">{line.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'payment_lines' && !selectedTx.details?.paymentLines && (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  No payment lines available for this transaction.
                </div>
              )}

              {activeTab === 'workflow_logs' && (
                <div className="bg-white dark:bg-zinc-900 rounded-[20px] border border-gray-200 dark:border-zinc-800 p-6  relative overflow-hidden">
                  <div className="absolute left-[31px] top-8 bottom-10 w-0.5 bg-gray-200 dark:bg-zinc-800"></div>

                  <div className="space-y-8 relative z-10">
                    <div className="relative flex gap-4">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100 dark:border-blue-900/50 mt-1 flex-shrink-0 z-10 relative"></div>
                      <div>
                        <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">Transaction Initiated</div>
                        <div className="text-[13px] text-gray-500 mt-1">System started processing the Airbnb payout.</div>
                        <div className="text-[12px] font-medium text-gray-400 mt-2">Aug 29, 2023 • 10:15 AM</div>
                      </div>
                    </div>

                    <div className="relative flex gap-4">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100 dark:border-blue-900/50 mt-1 flex-shrink-0 z-10 relative"></div>
                      <div>
                        <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">Payment Processing</div>
                        <div className="text-[13px] text-gray-500 mt-1">Verifying account details and funds availability.</div>
                        <div className="text-[12px] font-medium text-gray-400 mt-2">Aug 29, 2023 • 10:16 AM</div>
                      </div>
                    </div>

                    <div className="relative flex gap-4">
                      <div className="w-4 h-4 rounded-full bg-[#008A56] border-4 border-green-100 dark:border-green-900/50 mt-1 flex-shrink-0 z-10 relative">
                        <CheckCircle2 className="w-3 h-3 text-white absolute -top-[2px] -left-[2px]" />
                      </div>
                      <div>
                        <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">Completed Successfully</div>
                        <div className="text-[13px] text-gray-500 mt-1">Funds have been credited to your account.</div>
                        <div className="text-[12px] font-medium text-gray-400 mt-2">Aug 29, 2023 • 10:18 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
