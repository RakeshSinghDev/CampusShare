import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function OverdueAlertBanner({ overdueItems = [] }) {
  if (overdueItems.length === 0) return null;

  const first = overdueItems[0];

  return (
    <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-amber-900">
            {overdueItems.length} Rental Needs Immediate Return Attention
          </h4>
          <p className="text-xs text-amber-700 mt-0.5">
            "{first.title}" was due back on {first.endDate} ({first.daysOverdue} days overdue). Please coordinate return with {first.lender.name}.
          </p>
        </div>
      </div>

      <Link to={`/rentals/${first.id}`}>
        <Button variant="secondary" size="sm" className="rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shrink-0">
          Review Return <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
