import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VerifiedBadge } from './VerifiedBadge';
import { cn } from '@/lib/utils';

/**
 * Reusable User Avatar with online indicator and optional student verified badge overlay.
 */
export function UserAvatar({
  name = 'Student',
  src,
  isVerified = false,
  isOnline = false,
  size = 'md',
  className,
}) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const parts = fullName.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return fullName.slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative inline-flex items-center">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>

      {/* Online indicator */}
      {isOnline && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
      )}
    </div>
  );
}
