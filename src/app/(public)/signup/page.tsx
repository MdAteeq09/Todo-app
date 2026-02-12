import { SignupForm } from '@/components/auth/signup-form';
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper';

export default function SignupPage() {
  return (
    <AuthFormWrapper
      title="Create an Account"
      description="Start organizing your life with TaskZenith."
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Log In"
    >
      <SignupForm />
    </AuthFormWrapper>
  );
}
