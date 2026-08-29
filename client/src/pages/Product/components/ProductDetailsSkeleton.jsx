import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageContainer } from '@/components/layout/PageContainer';

export function ProductDetailsSkeleton() {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
          <div className="flex gap-2">
            <Skeleton className="h-16 w-20 rounded-xl" />
            <Skeleton className="h-16 w-20 rounded-xl" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-8 w-4/5 rounded-md" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </PageContainer>
  );
}
