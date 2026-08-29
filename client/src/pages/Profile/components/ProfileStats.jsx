import React from 'react';
import { Package, CheckCircle2, Clock, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Compact Student Marketplace Activity Stats bar.
 */
export function ProfileStats({ stats }) {
  const items = [
    { label: 'Listings', value: stats.listingsCount || 12, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: 'Sold', value: stats.soldCount || 8, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Rentals', value: stats.rentalsCount || 4, icon: Clock, color: 'text-purple-600 bg-purple-50' },
    { label: 'Wishlist', value: stats.wishlistCount || 15, icon: Heart, color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {items.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs"
          >
            <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold', stat.color)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900 leading-none block">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                {stat.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
