'use client';

import React from 'react';
import { useNavigationStyle } from '@/contexts/NavigationContext';
import { TopNavbar } from '@/components/admin/TopNavbar';
import { AdminDock } from '@/components/admin/AdminDock';

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const { navStyle } = useNavigationStyle();

  return (
    <div className={`min-h-screen bg-[#F8FAFC] dark:bg-zinc-950 transition-colors duration-200 ${navStyle === 'topbar' ? 'py-3 px-2' : ''}`}>
      {navStyle === 'topbar' && <TopNavbar />}
      
      <main className={`mx-auto p-4 ${navStyle === 'dock' ? 'pb-32' : ''}`}>
        {children}
      </main>

      {navStyle === 'dock' && <AdminDock />}
    </div>
  );
}
