import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/authSchemas';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { AuthError } from '@/components/auth/AuthError';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      university: '',
      department: '',
      academicYear: '1st Year',
      campus: '',
      acceptTerms: false,
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      await registerAuth(data);
      toast.success('Registration successful! Welcome to CampusShare.');
      navigate('/email-verification', { state: { email: data.email } });
    } catch (err) {
      setServerError(err.data?.message || err.message || 'Registration failed. Please check your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create Verified Student Account"
      subtitle="Join CampusShare to buy, sell & rent academic resources on campus"
    >
      <AuthCard>
        <AuthError message={serverError} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Full Name" required error={errors.fullName?.message}>
            <Input
              autoComplete="name"
              placeholder="e.g. Jordan Lee"
              {...register('fullName')}
            />
          </FormField>

          <FormField
            label="College Email (.edu)"
            required
            error={errors.email?.message}
            helperText="Use your official university or campus email address"
          >
            <Input
              type="email"
              autoComplete="email"
              placeholder="jordan.l@university.edu"
              {...register('email')}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="College / University" required error={errors.university?.message}>
              <Input
                placeholder="e.g. State University"
                {...register('university')}
              />
            </FormField>

            <FormField label="Course / Branch" required error={errors.department?.message}>
              <Input
                placeholder="e.g. Computer Science '25"
                {...register('department')}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Academic Year" required error={errors.academicYear?.message}>
              <select
                {...register('academicYear')}
                className="flex h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year / Senior">4th Year / Senior</option>
                <option value="Graduate / PG">Graduate / PG</option>
              </select>
            </FormField>

            <FormField label="Campus Location" required error={errors.campus?.message}>
              <Input
                placeholder="e.g. Main Campus"
                {...register('campus')}
              />
            </FormField>
          </div>

          <FormField label="Create Password" required error={errors.password?.message}>
            <PasswordInput
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              {...register('password')}
            />
            <PasswordStrength password={passwordValue} />
          </FormField>

          <FormField label="Confirm Password" required error={errors.confirmPassword?.message}>
            <PasswordInput
              autoComplete="new-password"
              placeholder="Re-enter password"
              {...register('confirmPassword')}
            />
          </FormField>

          <FormField error={errors.acceptTerms?.message}>
            <label className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer pt-1">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <span>
                I agree to the{' '}
                <a href="#terms" onClick={(e) => { e.preventDefault(); toast.info('Terms of Service'); }} className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => { e.preventDefault(); toast.info('Privacy Policy'); }} className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>.
              </span>
            </label>
          </FormField>

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            className="w-full h-11 text-base rounded-xl mt-2 font-bold"
            leftIcon={UserPlus}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Student Account'}
          </PrimaryButton>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:underline">
              Sign in here
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
