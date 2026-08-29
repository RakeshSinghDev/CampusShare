import React from 'react';
import { MapPin, IndianRupee, RefreshCw } from 'lucide-react';

export function WhyCampusShare() {
  const points = [
    {
      title: 'Find locally',
      description: 'Discover textbooks, calculators, and lab gear from students around your campus.',
      icon: MapPin,
    },
    {
      title: 'Spend less',
      description: 'Buy pre-owned items at steep discounts or rent for a single semester.',
      icon: IndianRupee,
    },
    {
      title: 'Pass it on',
      description: 'Keep resources moving through the campus community instead of leaving them unused.',
      icon: RefreshCw,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Why CampusShare
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Everything students need, closer to where they study.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {points.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Icon className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
