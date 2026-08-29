import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function RentalTimeline({ timeline = [] }) {
  if (timeline.length === 0) return null;

  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-5 shadow-subtle mb-6">
      <h3 className="font-bold text-slate-900 text-sm mb-4">Rental Status Timeline</h3>

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {timeline.map((item, idx) => (
          <div key={idx} className="flex md:flex-col items-center gap-3 md:text-center z-10 flex-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                item.isComplete
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-100'
                  : item.isCurrent
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                  : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}
            >
              {item.isComplete ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : item.isCurrent ? (
                <Clock className="h-4 w-4" />
              ) : (
                idx + 1
              )}
            </div>

            <div>
              <span className="font-bold text-xs text-slate-900 block">{item.step}</span>
              <span className="text-[11px] text-slate-500 font-medium">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
