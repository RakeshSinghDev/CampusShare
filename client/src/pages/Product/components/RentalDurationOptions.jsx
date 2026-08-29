import React from 'react';
import { RENTAL_DURATIONS } from '@/data/productData';
import { formatCurrency } from '@/lib/utils';
import { ShieldCheck, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Rental Duration selector & pricing breakdown component.
 */
export function RentalDurationOptions({
  selectedDuration = '1_week',
  onSelectDuration,
  rentPricing = {},
  securityDeposit = 25,
}) {
  const selectedFee = rentPricing[selectedDuration] || rentPricing['1_week'] || 8;
  const totalDue = selectedFee + securityDeposit;

  return (
    <div className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50/40 p-4 sm:p-5">
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Select Rental Duration
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {RENTAL_DURATIONS.map((dur) => {
            const fee = rentPricing[dur.key];
            if (fee === undefined) return null;
            const isSelected = selectedDuration === dur.key;

            return (
              <button
                key={dur.key}
                onClick={() => onSelectDuration(dur.key)}
                className={cn(
                  'flex flex-col items-start p-2.5 rounded-xl border text-left transition-all duration-200 focus:outline-none',
                  isSelected
                    ? 'border-blue-600 bg-white text-slate-900 shadow-xs ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white hover:border-slate-300'
                )}
              >
                <span className="text-xs font-bold text-slate-900">{dur.label}</span>
                <span className="text-xs font-extrabold text-blue-600 mt-0.5">
                  {formatCurrency(fee)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transparent Cost Breakdown */}
      <div className="pt-3 border-t border-blue-100 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span>Rental Fee ({RENTAL_DURATIONS.find((d) => d.key === selectedDuration)?.label})</span>
          <span className="font-bold text-slate-900">{formatCurrency(selectedFee)}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-1">
            Refundable Security Deposit
            <Info className="h-3 w-3 text-slate-400" title="Returned upon safe item return" />
          </span>
          <span className="font-bold text-slate-900">{formatCurrency(securityDeposit)}</span>
        </div>

        <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between font-extrabold text-sm text-slate-900">
          <span>Total Due Now</span>
          <span className="text-base text-blue-700">{formatCurrency(totalDue)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200/60">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>Full deposit refunded to your account upon verified return</span>
      </div>
    </div>
  );
}
