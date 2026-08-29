import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RentalSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} className="rounded-2xl border-slate-200 bg-white p-5 space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-20 w-20 rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3 bg-slate-200" />
              <Skeleton className="h-5 w-full bg-slate-200" />
              <Skeleton className="h-3 w-1/2 bg-slate-200" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-xl bg-slate-200" />
        </Card>
      ))}
    </div>
  );
}
