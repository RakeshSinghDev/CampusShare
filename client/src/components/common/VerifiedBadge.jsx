import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * CampusShare Student Verification Indicator.
 * Renders a clean inline verification mark without pill containers or borders.
 */
export function VerifiedBadge({
  showLabel = false,
  universityName = 'Verified Student',
  size = 'sm',
  className,
}) {
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-emerald-600 font-medium select-none cursor-help',
        className
      )}
      title={`${universityName} — Identity & Enrollment Verified`}
    >
      <BadgeCheck className={cn('shrink-0 text-emerald-600 fill-emerald-50', iconSize)} />
      {showLabel && <span className="text-xs text-slate-600 font-medium">{universityName}</span>}
    </span>
  );
}
