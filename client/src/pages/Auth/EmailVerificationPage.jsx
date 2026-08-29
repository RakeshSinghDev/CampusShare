import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function EmailVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = location.state?.email || 'alex.rivera@stanford.edu';
  const tokenParam = searchParams.get('token');

  const [cooldown, setCooldown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [cooldown]);

  useEffect(() => {
    if (tokenParam) {
      handleVerifyToken(tokenParam);
    }
  }, [tokenParam]);

  const handleVerifyToken = async (token) => {
    setIsVerifying(true);
    try {
      await authService.verifyEmail(token);
      toast.success('Campus email verified successfully!');
      navigate('/verify');
    } catch (err) {
      toast.error(err.data?.message || 'Invalid or expired email verification link.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCooldown(30);
    setCanResend(false);
    try {
      await authService.resendVerificationEmail(email);
      toast.success(`Verification link sent to ${email}!`);
    } catch (err) {
      toast.error('Failed to resend verification email.');
    }
  };

  return (
    <AuthLayout
      title="Check Your College Email"
      subtitle="We sent a verification link to confirm your campus student account"
    >
      <AuthCard className="text-center py-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs mb-3">
          <Mail className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900">Verification Link Sent</h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto mt-1">
          We sent a verification link to <span className="font-bold text-slate-900">{email}</span>. Click the link in your inbox to activate your student account.
        </p>

        <div className="pt-4 space-y-3">
          <PrimaryButton
            onClick={() => handleVerifyToken('mock_verification_token_123')}
            isLoading={isVerifying}
            className="w-full h-11 text-base rounded-xl font-bold"
            leftIcon={CheckCircle2}
          >
            {isVerifying ? 'Verifying Email...' : 'Simulate Clicking Verification Link'}
          </PrimaryButton>

          <Button
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={!canResend}
            className="w-full rounded-xl text-xs font-semibold"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${!canResend && 'animate-spin'}`} />
            {canResend ? 'Resend Verification Email' : `Resend available in ${cooldown}s`}
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <Link to="/register" className="text-slate-500 hover:text-blue-600 inline-flex items-center gap-1 font-medium">
            <ArrowLeft className="h-3.5 w-3.5" /> Change Email
          </Link>
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
