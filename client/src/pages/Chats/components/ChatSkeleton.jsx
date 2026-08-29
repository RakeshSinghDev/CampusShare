import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-4 p-4">
      <Skeleton className="h-12 w-full rounded-xl bg-slate-200" />
      <Skeleton className="h-10 w-full rounded-xl bg-slate-200" />
      <div className="flex-1 space-y-3 pt-4">
        <Skeleton className="h-10 w-2/3 rounded-2xl bg-slate-200" />
        <Skeleton className="h-10 w-1/2 ml-auto rounded-2xl bg-slate-200" />
        <Skeleton className="h-10 w-3/4 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
