export const DailyDoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" stroke="none" />
      <path d="m9 12 2 2 4-4" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5"/>
    </svg>
  );
