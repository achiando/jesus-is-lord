"use client";

import { cn } from '@/lib/utils';
import { LayoutDashboard, List, MessageSquare, Calendar, BarChartHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Programs",
    href: "/admin/programs",
    icon: <List className="h-4 w-4" />,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Live Chat",
    href: "/admin/chat",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChartHorizontal className="h-4 w-4" />,
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-background">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="flex flex-col p-2">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
