import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/schemas/authSchemas';
import { authService } from '@/services/authService';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { AuthError } from '@/components/auth/AuthError';
import { FormField } from '@/components/forms/FormField';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const token = searchParams.get('token') || 'mock_reset_token_123';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');
    try {
      await authService.resetPassword({ token, password: data.password });
      toast.success('Password updated successfully! Please sign in with your new password.');
      navigate('/login');
    } catch (err) {
      setServerError(err.data?.message || err.message || 'Invalid or expired password reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Enter a new secure password for your CampusShare account"
    >
      <AuthCard>
        <AuthError message={serverError} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="New Password" required error={errors.password?.message}>
            <PasswordInput
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              {...register('password')}
            />
            <PasswordStrength password={passwordValue} />
          </FormField>

          <FormField label="Confirm New Password" required error={errors.confirmPassword?.message}>
            <PasswordInput
              autoComplete="new-password"
              placeholder="Re-enter password"
              {...register('confirmPassword')}
            />
          </FormField>

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            className="w-full h-11 text-base rounded-xl mt-2 font-bold"
            leftIcon={KeyRound}
          >
            {isSubmitting ? 'Updating Password...' : 'Reset Password'}
          </PrimaryButton>

          <div className="pt-4 border-t border-slate-100 text-center text-xs">
            <Link to="/login" className="font-semibold text-slate-600 hover:text-blue-600 inline-flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
