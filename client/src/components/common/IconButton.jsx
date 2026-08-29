import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Accessible Icon Button wrapper with ring focus state & badge overlay.
 */
export function IconButton({
  icon: Icon,
  label,
  badgeCount,
  isActive = false,
  className,
  variant = 'ghost',
  size = 'icon',
  ...props
}) {
  return (
    <Button
      variant={variant}
      size={size}
      aria-label={label}
      title={label}
      className={cn(
        'relative rounded-xl transition-colors',
        isActive && 'bg-blue-50 text-blue-600',
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {badgeCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
          {badgeCount > 9 ? '9+' : badgeCount}
        </span>
      )}
    </Button>
  );
}
