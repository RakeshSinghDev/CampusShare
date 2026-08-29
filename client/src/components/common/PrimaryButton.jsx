import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Reusable Primary Action Button for CampusShare with loading indicator & icon slots.
 */
export function PrimaryButton({
  children,
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  variant = 'default',
  size = 'default',
  disabled,
  ...props
}) {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={isLoading || disabled}
      className={cn('font-semibold shadow-sm active:scale-[0.99] transition-transform', className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
      ) : LeftIcon ? (
        <LeftIcon className="mr-2 h-4 w-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {!isLoading && RightIcon ? (
        <RightIcon className="ml-2 h-4 w-4 shrink-0" />
      ) : null}
    </Button>
  );
}
