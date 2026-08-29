import React from 'react';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

export function RentalSummary({ activeCount = 0, upcomingCount = 0, completedCount = 0 }) {
  const items = [
    { label: 'Active Rentals', value: activeCount, icon: Clock, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'Upcoming', value: upcomingCount, icon: Calendar, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Completed', value: completedCount, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {items.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold border ${stat.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900 leading-none block">{stat.value}</span>
              <span className="text-xs font-semibold text-slate-500 block mt-0.5">{stat.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
