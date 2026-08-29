import React from 'react';
import { CheckCircle2, Sparkles, Send, Bookmark, Trash2 } from 'lucide-react';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

/**
 * Step 6 — Final Publish Checklist & Confirmation.
 */
export function PublishStep({
  formData,
  onPublish,
  onSaveDraft,
  onClearDraft,
}) {
  const checklist = [
    { label: 'Resource Photos Added', isComplete: formData.images?.length > 0, detail: `${formData.images?.length || 0} photo(s)` },
    { label: 'Item Details & Category', isComplete: Boolean(formData.title && formData.category && formData.condition), detail: `${formData.category || 'Category'} • ${formData.condition || 'Condition'}` },
    { label: 'Pricing Configured', isComplete: Boolean(formData.buyPrice || formData.rentPriceWeek), detail: formData.listingType === 'buy' ? `${formatCurrency(formData.buyPrice)} Buy Price` : `${formatCurrency(formData.rentPriceWeek)}/wk Rental` },
    { label: 'Campus Pickup Specified', isComplete: Boolean(formData.campus && formData.locationName), detail: formData.locationName || 'Pickup Location' },
  ];

  const isAllComplete = checklist.every((c) => c.isComplete);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 mb-3 shadow-2xs">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Ready to Publish Listing!</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your listing checklist below before making your resource discoverable on campus.
        </p>
      </div>

      {/* Checklist Card */}
      <Card className="rounded-2xl border-slate-200 shadow-subtle bg-white">
        <CardContent className="p-5 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm mb-2">Publish Readiness Checklist</h3>

          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className={`h-5 w-5 ${item.isComplete ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'}`} />
                <span className="font-bold text-xs text-slate-900">{item.label}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500">{item.detail}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Main Publish & Draft Controls */}
      <div className="space-y-3 pt-2">
        <PrimaryButton
          onClick={onPublish}
          disabled={!isAllComplete}
          className="w-full h-12 text-base rounded-xl font-bold shadow-md"
          leftIcon={Send}
        >
          Publish Campus Listing
        </PrimaryButton>

        <div className="flex items-center justify-between gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            className="flex-1 rounded-xl text-xs"
          >
            <Bookmark className="h-4 w-4 mr-1.5 text-slate-500" /> Save as Draft
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onClearDraft}
            className="rounded-xl text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1.5" /> Clear Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
