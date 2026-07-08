'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  CreditCard,
  Award,
  BarChart3,
  Settings as SettingsIcon
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

export function AdminDock() {
  const pathname = usePathname();

  const dockItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Courses", icon: BookOpen, href: "/admin/courses" },
    { title: "Students", icon: Users, href: "/admin/students" },
    { title: "Messages", icon: MessageSquare, href: "/admin/messages" },
    { title: "Transactions", icon: CreditCard, href: "/admin/transactions" },
    { title: "Certificates", icon: Award, href: "/admin/certificates" },
    { title: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { title: "Settings", icon: SettingsIcon, href: "/admin/settings" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <Dock className="items-end pb-3">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

          return (
            <Link key={item.href} href={item.href}>
              <DockItem className={`aspect-square rounded-full transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}>
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>
                  <Icon className={`h-full w-full ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`} />
                </DockIcon>
              </DockItem>
            </Link>
          );
        })}
      </Dock>
    </div>
  );
}
