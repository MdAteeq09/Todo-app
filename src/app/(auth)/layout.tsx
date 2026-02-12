'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MainSidebar } from '@/components/dashboard/main-sidebar';
import { MobileNav } from '@/components/dashboard/mobile-nav';
import { LoadingSpinner } from '@/components/common/loading-spinner';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else {
        setIsChecking(false);
      }
    }
  }, [user, loading, router]);

  if (isChecking || loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />
      <main className="flex-1 flex flex-col pl-0 md:pl-64">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
