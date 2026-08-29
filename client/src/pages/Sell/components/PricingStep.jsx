import React from 'react';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Clock, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Step 3 — Pricing & Listing Type configuration form.
 */
export function PricingStep({ register, errors, watch, setValue }) {
  const listingType = watch('listingType') || 'buy';

  const modes = [
    {
      id: 'buy',
      label: 'Sell Outright',
      description: 'One-time sale price',
      icon: ShoppingBag,
    },
    {
      id: 'rent',
      label: 'Rent Short-Term',
      description: 'Lend by week or semester',
      icon: Clock,
    },
    {
      id: 'both',
      label: 'Sell + Rent',
      description: 'Offer both options to buyers',
      icon: Layers,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Pricing & Listing Type</h2>
        <p className="text-xs text-slate-500 mt-1">
          Choose whether you want to sell your resource, rent it out, or offer both options.
        </p>
      </div>

      {/* Listing Mode Cards Selector */}
      <FormField label="Listing Option" required>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = listingType === mode.id;

            return (
              <div
                key={mode.id}
                onClick={() => setValue('listingType', mode.id, { shouldValidate: true })}
                className={cn(
                  'flex flex-col items-center justify-center p-3.5 rounded-xl border text-center cursor-pointer transition-all',
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-2xs ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                )}
              >
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl mb-2', isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600')}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-900">{mode.label}</span>
                <span className="text-[11px] text-slate-500 mt-0.5">{mode.description}</span>
              </div>
            );
          })}
        </div>
      </FormField>

      {/* SALE PRICING FIELDS */}
      {(listingType === 'buy' || listingType === 'both') && (
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4 text-blue-600" /> Outright Sale Price
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Selling Asking Price (₹)" required error={errors.buyPrice?.message}>
              <Input
                type="number"
                step="1"
                placeholder="e.g. 450"
                {...register('buyPrice')}
              />
            </FormField>

            <FormField label="Original Retail Price (₹)" helperText="Optional — shows buyers their savings">
              <Input
                type="number"
                step="1"
                placeholder="e.g. 1600"
                {...register('originalPrice')}
              />
            </FormField>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              {...register('isNegotiable')}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
            <span>Open to reasonable campus price negotiations</span>
          </label>
        </div>
      )}

      {/* RENTAL PRICING FIELDS */}
      {(listingType === 'rent' || listingType === 'both') && (
        <div className="p-4 sm:p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-600" /> Short-Term Rental Rates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Weekly Rental Rate (₹/week)" required error={errors.rentPriceWeek?.message}>
              <Input
                type="number"
                step="1"
                placeholder="e.g. 80"
                {...register('rentPriceWeek')}
              />
            </FormField>

            <FormField label="Full Semester Rate (₹/sem)" helperText="Entire 4-month academic term">
              <Input
                type="number"
                step="1"
                placeholder="e.g. 350"
                {...register('rentPriceSemester')}
              />
            </FormField>
          </div>

          <FormField
            label="Refundable Security Deposit (₹)"
            required
            helperText="Held securely and refunded to renter upon safe item return"
          >
            <Input
              type="number"
              step="1"
              placeholder="e.g. 250"
              {...register('securityDeposit')}
            />
          </FormField>
        </div>
      )}
    </div>
  );
}
