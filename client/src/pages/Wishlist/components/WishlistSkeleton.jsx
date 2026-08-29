import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function WishlistSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} className="rounded-2xl border-slate-200 bg-white overflow-hidden shadow-subtle">
          <Skeleton className="aspect-4/3 w-full bg-slate-200" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-3 w-1/3 bg-slate-200 rounded-md" />
            <Skeleton className="h-4 w-full bg-slate-200 rounded-md" />
            <Skeleton className="h-4 w-2/3 bg-slate-200 rounded-md" />
            <div className="pt-2 flex justify-between">
              <Skeleton className="h-5 w-1/4 bg-slate-200 rounded-md" />
              <Skeleton className="h-5 w-1/4 bg-slate-200 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
