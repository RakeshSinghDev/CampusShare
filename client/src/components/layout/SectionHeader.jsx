import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Reusable Section Header with title, description & optional action slot.
 */
export function SectionHeader({ title, subtitle, action, className }) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6', className)}>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
