'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/common/loading-spinner';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgImage = PlaceHolderImages.find(img => img.id === 'auth-background');
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      {children}
    </main>
  );
}
