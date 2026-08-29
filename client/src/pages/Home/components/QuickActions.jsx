import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, PlusCircle, Clock, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { quickActions as defaultQuickActions } from '@/data/homeData';

/**
 * 4 Quick Action cards for fast marketplace navigation.
 * Contract: Expects actions array with fallback to default quickActions config.
 */
export function QuickActions({ actions = defaultQuickActions }) {
  const activeActions = Array.isArray(actions) && actions.length > 0 ? actions : defaultQuickActions;

  const iconMap = {
    ShoppingBag,
    PlusCircle,
    Clock,
    Heart,
  };

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 mb-6">
      {activeActions.map((action) => {
        const Icon = iconMap[action.iconName] || ShoppingBag;

        return (
          <Link
            key={action.id}
            to={action.path}
            className={cn(
              'group flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-4 text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-2xs',
              action.color
            )}
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white/90 shadow-2xs group-hover:scale-110 transition-transform">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="mt-2 text-xs sm:text-sm font-bold tracking-tight">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
