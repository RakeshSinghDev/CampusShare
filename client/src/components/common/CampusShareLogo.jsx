import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * Official CampusShare Logo Component.
 * Feature: Clean blue interlocking rounded-square link symbol + "CampusShare" wordmark.
 * Optically balanced brand lockup for headers, mobile navs, and footers.
 */
export function CampusShareLogo({
  size = 'default', // 'compact' | 'default' | 'header' | 'lg'
  showText = true,
  className = '',
  linkTo = '/',
}) {
  const sizeConfig = {
    compact: {
      icon: 'h-5 w-5',
      text: 'text-base',
    },
    default: {
      icon: 'h-6 w-6',
      text: 'text-lg',
    },
    header: {
      icon: 'h-[24px] w-[24px]',
      text: 'text-lg sm:text-xl',
    },
    lg: {
      icon: 'h-7 w-7',
      text: 'text-2xl',
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.default;

  const logoMark = (
    <div className="flex items-center gap-2 shrink-0 group">
      {/* Blue Interlocking Link Symbol SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('text-blue-600 transition-colors duration-150 group-hover:text-blue-700 shrink-0', currentSize.icon)}
      >
        <rect x="3.5" y="3.5" width="11" height="11" rx="3.5" stroke="currentColor" strokeWidth="2.5" />
        <rect x="9.5" y="9.5" width="11" height="11" rx="3.5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>

      {/* Brand Wordmark */}
      {showText && (
        <span
          className={cn(
            'font-bold tracking-tight text-slate-900 select-none leading-none',
            currentSize.text
          )}
        >
          Campus<span className="text-blue-600">Share</span>
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className={cn('inline-flex items-center focus:outline-none', className)}>
        {logoMark}
      </Link>
    );
  }

  return <div className={cn('inline-flex items-center', className)}>{logoMark}</div>;
}
