'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, PlusCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/tasks', label: 'Tasks', icon: ListTodo },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
         <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 text-primary hover:bg-muted"
            onClick={() => {
              // This should open the new task dialog
              // The event will be handled by a global state or context in a real app.
              // For now, we dispatch a custom event.
              window.dispatchEvent(new CustomEvent('open-new-task-dialog'));
            }}
          >
            <PlusCircle className="w-7 h-7 mb-1" />
            <span className="text-xs">New</span>
          </button>
        <Link
          href="/dashboard/profile"
          className={cn(
            'inline-flex flex-col items-center justify-center px-5 hover:bg-muted',
            pathname === '/dashboard/profile' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
}
