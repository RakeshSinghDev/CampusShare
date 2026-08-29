import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Standard responsive container wrapper for page views.
 */
export function PageContainer({ children, className }) {
  return (
    <main className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8', className)}>
      {children}
    </main>
  );
}
