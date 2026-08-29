import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, PlusCircle, Clock, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { quickActions as defaultQuickActions } from '@/data/homeData';

/**
 * Quick Actions section for fast marketplace navigation.
 * Renders 2x2 grid on mobile and 4-column row on desktop.
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {activeActions.map((action) => {
        const Icon = iconMap[action.iconName] || ShoppingBag;

        return (
          <Link key={action.id} to={action.path} className="group focus:outline-none">
            <Card className="h-full p-4 rounded-2xl border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-subtle transition-all duration-200 hover:-translate-y-[1px] flex flex-col items-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-blue-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors mb-2.5">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {action.label}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 hidden sm:block">
                {action.description}
              </span>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
