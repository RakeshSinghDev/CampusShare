import React from 'react';
import { PackageOpen } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { cn } from '@/lib/utils';

/**
 * Reusable Empty State component.
 */
export function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'There are no items matching your criteria at the moment.',
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-slate-200 bg-white/50 my-4',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4 shadow-2xs">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 max-w-md">{description}</p>

      {actionLabel && onAction && (
        <div className="mt-6">
          <PrimaryButton onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
