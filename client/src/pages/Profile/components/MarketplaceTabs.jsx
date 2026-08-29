import React from 'react';
import { Package, Clock, Heart, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Responsive Marketplace Tabs Navigation bar.
 */
export function MarketplaceTabs({ activeTab, onTabChange, counts = {} }) {
  const tabs = [
    { id: 'listings', label: 'My Listings', icon: Package, count: counts.listings },
    { id: 'rentals', label: 'Active Rentals', icon: Clock, count: counts.rentals },
    { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: counts.wishlist },
    { id: 'activity', label: 'Recent Activity', icon: Activity },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar border-b border-slate-200 mb-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all snap-start border focus:outline-none',
              isActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold',
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
