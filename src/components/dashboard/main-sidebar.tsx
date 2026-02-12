'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, CheckCircle, Folder, Settings } from 'lucide-react';

import { cn } from '@/lib/utils';
import { DailyDoIcon } from '@/components/icons';
import { UserNav } from './user-nav';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/tasks', label: 'All Tasks', icon: ListTodo },
  { href: '/dashboard/completed', label: 'Completed', icon: CheckCircle },
];

export function MainSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 border-r bg-card text-card-foreground hidden md:flex flex-col">
      <div className="flex items-center justify-center h-20 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <DailyDoIcon className="h-8 w-8" />
          <span className="text-xl font-bold">DailyDo</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <UserNav />
      </div>
    </aside>
  );
}
