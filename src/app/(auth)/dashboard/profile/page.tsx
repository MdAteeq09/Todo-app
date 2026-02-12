'use client';

import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/loading-spinner';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return names[0].substring(0, 2);
  };

  if (isUserLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                <AvatarFallback className="text-3xl">{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-2xl">{user?.displayName ?? 'Anonymous User'}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">More profile details and settings will be available here soon.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
