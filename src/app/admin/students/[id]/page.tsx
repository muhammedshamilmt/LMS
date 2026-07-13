"use client";

import React, { useState } from 'react';
import { ChevronLeft, Mail, Phone, Calendar, MapPin, CreditCard, BookOpen, Clock, Activity, CheckCircle2, Download, Filter, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

// Dummy data for a single student
const STUDENT = {
  id: '1',
  name: 'Jenny Wilson',
  email: 'jenny.w@example.com',
  phone: '+1 (555) 123-4567',
  joinedDate: 'Jan 15, 2023',
  location: 'New York, USA',
  status: 'Active',
  avatar: 'https://i.pravatar.cc/150?u=1',
  stats: {
    enrolledCourses: 12,
    completedCourses: 8,
    totalSpent: '$1,245.00',
    avgScore: '92%'
  },
  transactions: [
    { 
      id: 'TXN-001', 
      date: 'Sep 12, 2023', 
      description: 'Advanced UI/UX Course', 
      amount: '$149.00', 
      status: 'Completed', 
      method: 'Credit Card (**** 4242)',
      details: {
        account: 'jenny.w@example.com',
        date: '12 Sep 23',
        tags: [
          { label: 'Course Purchase', color: 'bg-blue-100 text-blue-700' },
          { label: 'Design', color: 'bg-purple-100 text-purple-700' }
        ],
        paymentLines: [
          {
            name: 'Advanced UI/UX Course',
            id: 'TXN-001',
            dateRange: 'Lifetime Access',
            nights: '1 Course',
            breakdown: [
              { label: 'Course Fee', amount: '$149.00' },
              { label: 'Discount', amount: '$0.00' }
            ],
            total: '$149.00'
          }
        ]
      }
    },
    { id: 'TXN-002', date: 'Aug 24, 2023', description: 'React Native Masterclass', amount: '$199.00', status: 'Completed', method: 'PayPal' },
    { id: 'TXN-003', date: 'Jul 10, 2023', description: 'Figma for Beginners', amount: '$89.00', status: 'Completed', method: 'Credit Card (**** 4242)' },
    { id: 'TXN-004', date: 'Jun 05, 2023', description: 'Web Development Bootcamp', amount: '$299.00', status: 'Failed', method: 'Bank Transfer' },
    { id: 'TXN-005', date: 'May 18, 2023', description: 'Monthly Subscription', amount: '$29.00', status: 'Completed', method: 'Credit Card (**** 4242)' },
  ]
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Active: 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
    Completed: 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
    Failed: 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
    Pending: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20',
  }[status] || 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles}`}>
      {status}
    </span>
  );
};

export default function StudentDetailedPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'transactions' | 'activity' | 'courses'>('transactions');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState('payment_lines');

  // Ideally fetch student details based on params.id
  const student = STUDENT;

  return (
    <div className="w-full  mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/students">
            <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Student Details</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            Edit Profile
          </Button>
          <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white border-0 transition-colors">
            Suspend Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col items-center text-center">
            <Avatar className="w-28 h-28 mb-4 ring-4 ring-gray-50 dark:ring-white/5">
              <AvatarImage src={student.avatar} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">{student.name}</h2>
            <div className="mt-2 mb-4">
              <StatusBadge status={student.status} />
            </div>

            <div className="w-full mt-6 space-y-4 text-sm text-left">
              <div className="flex items-center gap-3 text-gray-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-zinc-400">
                <Phone className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-zinc-400">
                <Calendar className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
                <span>Joined {student.joinedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
                <span>{student.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
            <h3 className="font-semibold text-gray-900 dark:text-zinc-100 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-medium">Enrolled</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-zinc-100">{student.stats.enrolledCourses}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium">Completed</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-zinc-100">{student.stats.completedCourses}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-medium">Total Spent</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-zinc-100">{student.stats.totalSpent}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 mb-1">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium">Avg Score</span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-zinc-100">{student.stats.avgScore}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.03)] dark:shadow-none h-full flex flex-col">

            {/* Tabs */}
            <div className="flex items-center gap-6 px-6 border-b border-gray-100 dark:border-white/5">
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'transactions' ? 'border-black dark:border-white text-gray-900 dark:text-zinc-100' : 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100'}`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'courses' ? 'border-black dark:border-white text-gray-900 dark:text-zinc-100' : 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100'}`}
              >
                Enrolled Courses
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-5 text-sm font-medium border-b-2 transition-colors ${activeTab === 'activity' ? 'border-black dark:border-white text-gray-900 dark:text-zinc-100' : 'border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100'}`}
              >
                Activity Log
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex flex-col">
              {activeTab === 'transactions' && (
                <>
                  <div className="flex items-center justify-between p-6 pb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-zinc-100">Transaction History</h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-2 rounded-full border-gray-200 dark:border-white/10 dark:bg-white/5 text-xs text-gray-600 dark:text-zinc-300">
                        <Filter className="w-3 h-3" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-2 rounded-full border-gray-200 dark:border-white/10 dark:bg-white/5 text-xs text-gray-600 dark:text-zinc-300">
                        <Download className="w-3 h-3" />
                        Export
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto px-6 pb-6">
                    <table className="w-full text-sm text-left">
                      <thead className="text-gray-500 dark:text-zinc-400 border-b border-gray-100 dark:border-white/5">
                        <tr>
                          <th className="py-4 font-medium whitespace-nowrap pr-4">Transaction ID</th>
                          <th className="py-4 font-medium whitespace-nowrap px-4">Date</th>
                          <th className="py-4 font-medium whitespace-nowrap px-4">Description</th>
                          <th className="py-4 font-medium whitespace-nowrap px-4">Method</th>
                          <th className="py-4 font-medium whitespace-nowrap px-4">Amount</th>
                          <th className="py-4 font-medium whitespace-nowrap pl-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.transactions.map((txn, index) => (
                          <tr 
                            key={txn.id} 
                            className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                            onClick={() => setSelectedTx(txn)}
                          >
                            <td className="py-4 pr-4 font-medium text-gray-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{txn.id}</td>
                            <td className="py-4 px-4 text-gray-500 dark:text-zinc-400">{txn.date}</td>
                            <td className="py-4 px-4 text-gray-700 dark:text-zinc-300">{txn.description}</td>
                            <td className="py-4 px-4 text-gray-500 dark:text-zinc-400">
                              <span className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                {txn.method}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-medium text-gray-900 dark:text-zinc-100">{txn.amount}</td>
                            <td className="py-4 pl-4">
                              <StatusBadge status={txn.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {activeTab === 'courses' && (
                <div className="p-6 flex flex-col items-center justify-center flex-1 text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">Enrolled Courses</h3>
                  <p className="text-gray-500 dark:text-zinc-400 max-w-sm">
                    This section will display the list of courses this student is currently enrolled in or has completed.
                  </p>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="p-6 flex flex-col items-center justify-center flex-1 text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 mb-2">Activity Log</h3>
                  <p className="text-gray-500 dark:text-zinc-400 max-w-sm">
                    View the student's recent logins, course progress updates, and other platform interactions here.
                  </p>
                </div>
              )}

            </div>
          </div>
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
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-0.5">Account</div>
                      <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">
                        {selectedTx.details?.account || student.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-[15px] font-medium text-gray-900 dark:text-gray-300">
                    {selectedTx.details?.date || selectedTx.date}
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
                  className={`flex-1 py-2.5 text-[15px] font-medium rounded-xl transition-all ${activeSidebarTab === 'payment_lines' ? 'bg-white dark:bg-zinc-800  text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  onClick={() => setActiveSidebarTab('payment_lines')}
                >
                  Payment Lines
                </button>
                <button
                  className={`flex-1 py-2.5 text-[15px] font-medium rounded-xl transition-all ${activeSidebarTab === 'workflow_logs' ? 'bg-white dark:bg-zinc-800  text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  onClick={() => setActiveSidebarTab('workflow_logs')}
                >
                  Workflow Logs
                </button>
              </div>

              {/* Tab Content */}
              {activeSidebarTab === 'payment_lines' && selectedTx.details?.paymentLines && (
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

              {activeSidebarTab === 'payment_lines' && !selectedTx.details?.paymentLines && (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  No payment lines available for this transaction.
                </div>
              )}

              {activeSidebarTab === 'workflow_logs' && (
                <div className="bg-white dark:bg-zinc-900 rounded-[20px] border border-gray-200 dark:border-zinc-800 p-6  relative overflow-hidden">
                  <div className="absolute left-[31px] top-8 bottom-10 w-0.5 bg-gray-200 dark:bg-zinc-800"></div>

                  <div className="space-y-8 relative z-10">
                    <div className="relative flex gap-4">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100 dark:border-blue-900/50 mt-1 flex-shrink-0 z-10 relative"></div>
                      <div>
                        <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">Transaction Initiated</div>
                        <div className="text-[13px] text-gray-500 mt-1">System started processing the payment.</div>
                        <div className="text-[12px] font-medium text-gray-400 mt-2">{selectedTx.date} • 10:15 AM</div>
                      </div>
                    </div>

                    <div className="relative flex gap-4">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100 dark:border-blue-900/50 mt-1 flex-shrink-0 z-10 relative"></div>
                      <div>
                        <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">Payment Processing</div>
                        <div className="text-[13px] text-gray-500 mt-1">Verifying account details and funds availability.</div>
                        <div className="text-[12px] font-medium text-gray-400 mt-2">{selectedTx.date} • 10:16 AM</div>
                      </div>
                    </div>

                    <div className="relative flex gap-4">
                      <div className={`w-4 h-4 rounded-full ${selectedTx.status === 'Completed' ? 'bg-[#008A56] border-green-100 dark:border-green-900/50' : 'bg-red-500 border-red-100 dark:border-red-900/50'} border-4 mt-1 flex-shrink-0 z-10 relative`}>
                        <CheckCircle2 className="w-3 h-3 text-white absolute -top-[2px] -left-[2px]" />
                      </div>
                      <div>
                        <div className="font-medium text-[15px] text-gray-900 dark:text-gray-100">
                          {selectedTx.status === 'Completed' ? 'Completed Successfully' : 'Transaction Failed'}
                        </div>
                        <div className="text-[13px] text-gray-500 mt-1">
                          {selectedTx.status === 'Completed' ? 'Funds have been credited to your account.' : 'Payment was declined.'}
                        </div>
                        <div className="text-[12px] font-medium text-gray-400 mt-2">{selectedTx.date} • 10:18 AM</div>
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
