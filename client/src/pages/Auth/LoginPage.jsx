import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { loginSchema } from '@/schemas/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthError } from '@/components/auth/AuthError';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Button } from '@/components/ui/button';
import { LogIn, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loginWithGoogle } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isSamlSubmitting, setIsSamlSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const redirectTarget = searchParams.get('redirect') || '/home';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Local Credentials Sign In
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      await login(data);
      toast.success('Signed in successfully! Welcome back to CampusShare.');
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setServerError(
        err.response?.data?.message || err.data?.message || err.message || 'Invalid campus email or password. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Firebase Google OAuth Sign In Handler
  const handleGoogleSignIn = async () => {
    setIsGoogleSubmitting(true);
    setServerError('');

    try {
      // 1. Sign in via Firebase Auth Google Popup
      const result = await signInWithPopup(auth, googleProvider);
      if (!result?.user) {
        throw new Error('Google sign-in did not return valid user credentials.');
      }

      // 2. Obtain Firebase ID Token
      const idToken = await result.user.getIdToken();

      // 3. Send Firebase ID Token to CampusShare Express backend
      await loginWithGoogle(idToken);
      toast.success('Signed in with Google successfully! Welcome to CampusShare.');
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        toast.info('Google sign-in was cancelled.');
      } else if (err.code === 'auth/popup-blocked') {
        setServerError('Google sign-in popup was blocked by browser settings. Please allow popups for this site.');
        toast.error('Google popup was blocked. Please allow popups.');
      } else {
        const msg =
          err.response?.data?.message ||
          err.data?.message ||
          err.message ||
          'Unable to sign in with Google. Please try again.';
        setServerError(msg);
        toast.error(msg);
      }
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  // Catch any external error redirected from SAML SSO
  React.useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const decodedError = decodeURIComponent(errorParam);
      setServerError(decodedError);
      toast.error(decodedError);
    }
  }, [searchParams]);

  // PingFederate SAML 2.0 Single Sign-On Handler
  const handleSamlSignIn = () => {
    setIsSamlSubmitting(true);
    const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
    let samlLoginUrl = '/api/auth/saml/login';
    if (apiUrl && (apiUrl.startsWith('http://') || apiUrl.startsWith('https://'))) {
      const origin = new URL(apiUrl).origin;
      samlLoginUrl = `${origin}/api/auth/saml/login`;
    }
    if (redirectTarget && redirectTarget !== '/home') {
      const separator = samlLoginUrl.includes('?') ? '&' : '?';
      samlLoginUrl += `${separator}relayState=${encodeURIComponent(redirectTarget)}`;
    }
    window.location.href = samlLoginUrl;
  };

  return (
    <AuthLayout
      title="Welcome Back to CampusShare"
      subtitle="Sign in with your verified campus email to buy, sell & rent resources"
    >
      <AuthCard>
        <AuthError message={serverError} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Campus Email (.edu)" required error={errors.email?.message}>
            <Input
              type="email"
              autoComplete="username"
              placeholder="alex.rivera@stanford.edu"
              disabled={isSubmitting || isGoogleSubmitting || isSamlSubmitting}
              {...register('email')}
            />
          </FormField>

          <FormField label="Password" required error={errors.password?.message}>
            <PasswordInput
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isSubmitting || isGoogleSubmitting || isSamlSubmitting}
              {...register('password')}
            />
          </FormField>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 text-slate-600 font-medium cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="font-semibold text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting || isGoogleSubmitting || isSamlSubmitting}
            className="w-full h-11 text-base rounded-xl mt-2 font-bold"
            leftIcon={LogIn}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </PrimaryButton>

          {/* Divider */}
          <div className="relative my-4 text-center text-xs">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-slate-400 font-medium">Or continue with</span>
          </div>

          {/* Third-Party & University SSO Buttons */}
          <div className="w-full flex flex-col gap-2.5">
            {/* Firebase Google Auth Button */}
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting || isGoogleSubmitting || isSamlSubmitting}
              onClick={handleGoogleSignIn}
              className="w-full h-11 rounded-xl text-sm font-semibold gap-3 text-slate-700 bg-white hover:bg-slate-50 border-slate-200 shadow-sm transition-all"
            >
              {isGoogleSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                  <span>Verifying Google Identity...</span>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            {/* University SAML SSO Button */}
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting || isGoogleSubmitting || isSamlSubmitting}
              onClick={handleSamlSignIn}
              className="w-full h-11 rounded-xl text-sm font-semibold gap-3 text-slate-700 bg-white hover:bg-slate-50 border-slate-200 shadow-sm transition-all"
            >
              {isSamlSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                  <span>Connecting to University SSO...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-5 w-5 text-indigo-600" />
                  <span>Continue with Campus SSO (SAML)</span>
                </>
              )}
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have a verified student account yet?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
