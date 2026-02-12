import { LoginForm } from '@/components/auth/login-form';
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper';

export default function LoginPage() {
  return (
    <AuthFormWrapper
      title="Welcome Back!"
      description="Log in to continue managing your tasks."
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign Up"
    >
      <LoginForm />
    </AuthFormWrapper>
  );
}
