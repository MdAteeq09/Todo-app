import { cn } from '@/lib/utils';

export function LoadingSpinner({
  className,
  fullScreen = false,
}: {
  className?: string;
  fullScreen?: boolean;
}) {
  const spinner = (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}
