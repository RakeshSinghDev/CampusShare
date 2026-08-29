import React from 'react';
import { ShoppingBag, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Buy vs Rent Mode Switcher tab control.
 */
export function BuyRentSelector({
  mode = 'rent',
  onChange,
  buyPrice,
  rentStartPrice,
}) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5 border border-slate-200/80">
      {/* Rent Mode Option */}
      <button
        onClick={() => onChange('rent')}
        className={cn(
          'flex flex-col items-center justify-center rounded-xl py-2.5 px-3 transition-all duration-200 focus:outline-none',
          mode === 'rent'
            ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200/80'
            : 'text-slate-600 hover:text-slate-900 font-medium'
        )}
      >
        <div className="flex items-center gap-1.5 text-xs">
          <Clock className="h-4 w-4" />
          <span>Rent Short-Term</span>
        </div>
        <span className={cn('text-sm font-extrabold mt-0.5', mode === 'rent' ? 'text-blue-600' : 'text-slate-500')}>
          From {formatCurrency(rentStartPrice)}/wk
        </span>
      </button>

      {/* Buy Mode Option */}
      <button
        onClick={() => onChange('buy')}
        className={cn(
          'flex flex-col items-center justify-center rounded-xl py-2.5 px-3 transition-all duration-200 focus:outline-none',
          mode === 'buy'
            ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/80'
            : 'text-slate-600 hover:text-slate-900 font-medium'
        )}
      >
        <div className="flex items-center gap-1.5 text-xs">
          <ShoppingBag className="h-4 w-4" />
          <span>Buy Outright</span>
        </div>
        <span className={cn('text-sm font-extrabold mt-0.5', mode === 'buy' ? 'text-slate-900' : 'text-slate-500')}>
          {formatCurrency(buyPrice)}
        </span>
      </button>
    </div>
  );
}
