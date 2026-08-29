import React from 'react';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/ui/input';
import { MapPin, ShieldCheck, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Step 4 — Campus Pickup & Location setup form.
 */
export function PickupStep({ register, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Campus Pickup & Location</h2>
        <p className="text-xs text-slate-500 mt-1">
          Specify your campus and preferred pickup spot for safe, in-person peer exchanges.
        </p>
      </div>

      <FormField label="University Campus" required error={errors.campus?.message}>
        <Input
          {...register('campus')}
          placeholder="e.g. State University (Main Campus)"
        />
      </FormField>

      <FormField
        label="Pickup Building / Quad Location"
        required
        error={errors.locationName?.message}
        helperText="e.g. Science Quad, Engineering Library, Student Union Plaza"
      >
        <Input
          {...register('locationName')}
          placeholder="e.g. Science Quad / Student Union Plaza"
        />
      </FormField>

      <FormField
        label="Preferred Pickup Timing Window"
        required
        error={errors.timingWindow?.message}
        helperText="e.g. Mon - Fri, 10 AM – 6 PM"
      >
        <Input
          {...register('timingWindow')}
          placeholder="e.g. Mon - Fri, 10 AM – 6 PM"
        />
      </FormField>

      {/* Safety Reminder Card */}
      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5 text-xs text-emerald-900">
        <h4 className="font-bold flex items-center gap-1.5 text-emerald-800 text-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-600" /> Campus Exchange Safety Tip
        </h4>
        <p className="text-emerald-700 leading-relaxed">
          Always arrange in-person resource handoffs in well-lit, public campus areas like campus dining halls, student centers, or quad plazas.
        </p>
      </div>
    </div>
  );
}
