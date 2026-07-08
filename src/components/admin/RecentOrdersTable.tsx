import React from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

const orders = [
  {
    id: '#2489',
    product: 'Premium T-Shirt',
    date: 'Aug 24, 2026',
    customer: 'Alice Johnson',
    category: 'Clothing',
    status: 'Delivered',
    items: 2,
    total: '$45.00'
  },
  {
    id: '#2488',
    product: 'Wireless Headphones',
    date: 'Aug 23, 2026',
    customer: 'Bob Smith',
    category: 'Electronics',
    status: 'Processing',
    items: 1,
    total: '$120.00'
  },
  {
    id: '#2487',
    product: 'Coffee Mug',
    date: 'Aug 22, 2026',
    customer: 'Charlie Brown',
    category: 'Kitchen',
    status: 'Cancelled',
    items: 4,
    total: '$32.00'
  }
];

export function RecentOrdersTable() {
  return (
    <div className="flex flex-col bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/10 rounded-3xl mt-8 mb-12 shadow-sm dark:shadow-none">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-white/5">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Recent orders</h3>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 bg-gray-50/50 dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
            Sort by
            <ChevronDown className="w-4 h-4 text-gray-400 dark:text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 dark:text-zinc-400 bg-white dark:bg-transparent border-b border-gray-100 dark:border-white/5">
            <tr>
              <th className="px-6 py-4 font-medium rounded-tl-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border border-gray-300 dark:border-white/20 rounded cursor-pointer" />
                  Product info
                </div>
              </th>
              <th className="px-6 py-4 font-medium">Order Id</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium rounded-tr-3xl">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-4 h-4 text-white bg-blue-500 rounded cursor-pointer shadow-sm">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-zinc-100">{order.product}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-zinc-400">{order.id}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-zinc-400">{order.date}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-zinc-300">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-zinc-400">{order.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                    order.status === 'Processing' 
                      ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' :
                      'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-zinc-400">{order.items}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-zinc-100">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
