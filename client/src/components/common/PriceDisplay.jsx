import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Formatted Buy & Rent Price Display component.
 * Renders typography-driven prices without individual pill button containers.
 */
export function PriceDisplay({
  buyPrice,
  rentPrice,
  rentPeriod = 'week',
  listingType = 'both',
  size = 'md',
  className,
}) {
  const isLarge = size === 'lg';

  return (
    <div className={cn('flex flex-wrap items-baseline gap-2 text-slate-900', className)}>
      {(listingType === 'buy' || listingType === 'both') && buyPrice !== undefined && (
        <div className="flex items-baseline gap-1">
          <span className={cn('font-bold text-slate-900 tracking-tight', isLarge ? 'text-2xl' : 'text-lg')}>
            {formatCurrency(buyPrice)}
          </span>
          <span className="text-xs text-slate-500 font-medium">Buy</span>
        </div>
      )}

      {listingType === 'both' && buyPrice !== undefined && rentPrice !== undefined && (
        <span className="text-slate-300 font-normal select-none">•</span>
      )}

      {(listingType === 'rent' || listingType === 'both') && rentPrice !== undefined && (
        <div className="flex items-baseline gap-1">
          <span className={cn('font-semibold text-blue-600 tracking-tight', isLarge ? 'text-xl' : 'text-sm')}>
            {formatCurrency(rentPrice)}
          </span>
          <span className="text-xs text-blue-600 font-medium">/{rentPeriod} Rent</span>
        </div>
      )}
    </div>
  );
}
