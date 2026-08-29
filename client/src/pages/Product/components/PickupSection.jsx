import React from 'react';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Campus Pickup Location & Availability Timing component.
 */
export function PickupSection({ pickup }) {
  if (!pickup) return null;

  return (
    <Card className="rounded-2xl border-blue-100 bg-blue-50/30 shadow-2xs">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 shadow-xs">
            <MapPin className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Campus Pickup Location</h3>
              {pickup.isAvailableToday && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Available Today
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-blue-700 mt-1">
              {pickup.locationName}
            </p>
            <p className="text-xs text-slate-500">{pickup.campus}</p>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Timing window: {pickup.timingWindow}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
