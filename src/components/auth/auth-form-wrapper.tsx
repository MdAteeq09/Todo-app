import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyDoIcon } from '@/components/icons';

interface AuthFormWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthFormWrapper({
  children,
  title,
  description,
  footerText,
  footerLink,
  footerLinkText,
}: AuthFormWrapperProps) {
  return (
    <Card className="z-10 w-full max-w-md border-border/50 bg-background/80 backdrop-blur-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <DailyDoIcon className="h-12 w-12" />
        </div>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {footerText}{' '}
          <Link href={footerLink} className="font-semibold text-primary hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
