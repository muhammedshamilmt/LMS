"use client";

import React, { useState, useEffect } from 'react';
import { Zap, Moon, Sun } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function TopNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Courses', href: '/admin/courses' },
    { name: 'Students', href: '/admin/students' },
    { name: 'Messages', href: '/admin/messages' },
    { name: 'Transactions', href: '/admin/transactions' },
    { name: 'Certificates', href: '/admin/certificates' },
    { name: 'Analytics', href: '/admin/analytics' },
    { name: 'Settings', href: '/admin/settings' }
  ];

  return (
    <nav className="flex sticky top-3 z-50 items-center justify-between rounded-full px-8 py-4 bg-white dark:bg-zinc-950 transition-colors duration-200 border-b border-gray-100 dark:border-zinc-900/50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <span className="text-xl font-bold text-gray-900 dark:text-white">Boltshift</span>
      </div>

      {/* Center Navigation */}
      <div className="flex items-center py-1 px-1 bg-gray-100 dark:bg-zinc-900/80 rounded-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
          return (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className={`px-5 py-5 text-sm font-medium rounded-full transition-all duration-300 
                ${isActive
                  ? 'bg-black text-white dark:bg-white hover:bg-black hover:text-white dark:text-black  dark:hover:text-black  dark:hover:bg-white '
                  : 'text-gray-500 dark:text-gray-400 '
                }`}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          );
        })}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">

        {/* Toggle Button in a pill (replacing notification and settings) */}
        <div className="flex items-center p-1 bg-gray-50 dark:bg-zinc-900/80 rounded-full">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 dark:text-gray-400 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <AvatarFallback>OS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-gray-900 dark:text-white">oripio Studio</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">oripio@helo.mail</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
