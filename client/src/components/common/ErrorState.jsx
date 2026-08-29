import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { cn } from '@/lib/utils';

/**
 * Reusable Error State component.
 */
export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error loading this resource. Please try again.',
  onRetry,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-red-200 bg-red-50/50 my-4',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-4 shadow-2xs">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-600 max-w-md">{message}</p>

      {onRetry && (
        <div className="mt-6">
          <PrimaryButton variant="outline" leftIcon={RefreshCw} onClick={onRetry}>
            Try Again
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
