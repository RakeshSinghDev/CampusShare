import React from 'react';
import { Package, Clock, ShoppingBag, Heart, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Recent Activity Timeline logs section.
 */
export function ActivitySection({ activities = [] }) {
  const iconMap = {
    listing: Package,
    rental: Clock,
    sale: ShoppingBag,
    wishlist: Heart,
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-5 shadow-subtle">
      <div className="space-y-4">
        {activities.map((act) => {
          const Icon = iconMap[act.type] || Activity;

          return (
            <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0 mt-0.5 shadow-2xs">
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{act.title}</h4>
                  <span className="text-[11px] text-slate-400 font-medium">{act.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{act.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
