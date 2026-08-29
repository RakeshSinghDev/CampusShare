import React from 'react';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { CATEGORIES, CONDITION_OPTIONS } from '@/constants/listing';
import { cn } from '@/lib/utils';

/**
 * Step 2 — Item Specifications & Details form.
 */
export function DetailsStep({ register, errors, watch, setValue }) {
  const selectedCondition = watch('condition');
  const titleValue = watch('title') || '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Item Specifications</h2>
        <p className="text-xs text-slate-500 mt-1">
          Tell fellow students about your resource so they can search and find it easily.
        </p>
      </div>

      {/* Product Title */}
      <FormField
        label="Resource Title"
        required
        error={errors.title?.message}
        helperText={`Use subject code and edition (e.g. Organic Chemistry 9th Ed — Wade). ${titleValue.length}/90 chars`}
      >
        <Input
          {...register('title')}
          placeholder="e.g. Organic Chemistry (9th Ed) — Wade & Simek"
          maxLength={90}
        />
      </FormField>

      {/* Category Dropdown */}
      <FormField label="Academic Category" required error={errors.category?.message}>
        <select
          {...register('category')}
          className="flex h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="">Select Academic Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </FormField>

      {/* Condition Selector Cards */}
      <FormField label="Item Condition" required error={errors.condition?.message}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CONDITION_OPTIONS.map((opt) => {
            const isSelected = selectedCondition === opt.label;
            return (
              <div
                key={opt.id}
                onClick={() => setValue('condition', opt.label, { shouldValidate: true })}
                className={cn(
                  'flex flex-col p-3 rounded-xl border cursor-pointer transition-all',
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 text-slate-900 shadow-2xs ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{opt.label}</span>
                  <input
                    type="radio"
                    value={opt.label}
                    checked={isSelected}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-600"
                  />
                </div>
                <span className="text-[11px] text-slate-500 mt-1">{opt.description}</span>
              </div>
            );
          })}
        </div>
      </FormField>

      {/* Brand & Model Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Brand / Publisher" helperText="e.g. Pearson, Texas Instruments, Apple">
          <Input {...register('brand')} placeholder="e.g. Pearson" />
        </FormField>

        <FormField label="Model / Edition" helperText="e.g. 9th Edition, TI-84 CE">
          <Input {...register('model')} placeholder="e.g. 9th Edition" />
        </FormField>
      </div>

      {/* Usage History & Age Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Usage History" helperText="e.g. 1 Semester, 2 Terms">
          <Input {...register('usage')} placeholder="e.g. 1 Semester" />
        </FormField>

        <FormField label="Approximate Age" helperText="e.g. 6 Months, 1 Year">
          <Input {...register('age')} placeholder="e.g. 6 Months" />
        </FormField>
      </div>

      {/* Description Textarea */}
      <FormField
        label="Item Description"
        required
        error={errors.description?.message}
        helperText="Describe item condition, included notes, solution manuals, or accessories."
      >
        <textarea
          {...register('description')}
          rows={4}
          maxLength={1000}
          placeholder="Describe your resource in detail... e.g. Includes full solutions manual and lecture notes printouts. Barely used, no highlighting or missing pages."
          className="flex w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
        />
      </FormField>
    </div>
  );
}
