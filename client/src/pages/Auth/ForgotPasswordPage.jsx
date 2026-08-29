import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/schemas/authSchemas';
import { authService } from '@/services/authService';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await authService.forgotPassword(data.email);
      setSentEmail(data.email);
      setIsSent(true);
      toast.success('Password reset instructions sent!');
    } catch (err) {
      toast.error('An error occurred while requesting password reset.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your campus email to receive a password reset link"
    >
      <AuthCard>
        {isSent ? (
          <div className="text-center py-4 space-y-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-2xs">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Check Your Email</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              If an account exists for <span className="font-bold text-slate-900">{sentEmail}</span>, password reset instructions have been sent.
            </p>
            <div className="pt-2">
              <Link to="/reset-password?token=mock_reset_token_123">
                <PrimaryButton className="w-full rounded-xl">
                  Proceed to Reset Password
                </PrimaryButton>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Campus Email (.edu)" required error={errors.email?.message}>
              <Input
                type="email"
                autoComplete="email"
                placeholder="alex.rivera@stanford.edu"
                {...register('email')}
              />
            </FormField>

            <PrimaryButton
              type="submit"
              isLoading={isSubmitting}
              className="w-full h-11 text-base rounded-xl mt-2 font-bold"
              leftIcon={KeyRound}
            >
              {isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link'}
            </PrimaryButton>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center text-xs">
          <Link to="/login" className="font-semibold text-slate-600 hover:text-blue-600 inline-flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
