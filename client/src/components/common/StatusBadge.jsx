import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Minimal status indicator for listing states (● Available, ● Rented, ● Sold).
 * Rendered without pill containers or background boxes.
 */
export function StatusBadge({ status = 'available', className }) {
  const statusColors = {
    available: 'text-emerald-600 bg-emerald-500',
    rented: 'text-purple-600 bg-purple-500',
    sold: 'text-slate-500 bg-slate-400',
    pending: 'text-amber-600 bg-amber-500',
  };

  const statusLabels = {
    available: 'Available',
    rented: 'Rented',
    sold: 'Sold',
    pending: 'Pending',
  };

  const colorClass = statusColors[status] || statusColors.available;
  const label = statusLabels[status] || statusLabels.available;
  const dotColor = colorClass.split(' ')[1];
  const textColor = colorClass.split(' ')[0];

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold select-none', textColor, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', dotColor)} />
      <span>{label}</span>
    </span>
  );
}
