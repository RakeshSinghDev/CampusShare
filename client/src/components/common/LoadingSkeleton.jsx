import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading Skeleton primitives for Cards, Grids, and Detail pages.
 */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
      <Skeleton className="h-44 w-full rounded-xl" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
      <Skeleton className="h-5 w-4/5 rounded-md" />
      <Skeleton className="h-4 w-3/5 rounded-md" />
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="h-6 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategorySkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>
      ))}
    </div>
  );
}
