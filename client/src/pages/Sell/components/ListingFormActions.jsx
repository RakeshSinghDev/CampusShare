import React from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrimaryButton } from '@/components/common/PrimaryButton';

/**
 * Sticky Navigation Bar for Listing Wizard (Back, Next/Continue, Save Draft).
 */
export function ListingFormActions({
  currentStep,
  totalSteps = 5,
  onBack,
  onNext,
  onSaveDraft,
  onPublish,
  canContinue = true,
  isSubmitting = false,
}) {
  const isFinalStep = currentStep === totalSteps;

  return (
    <div className="sticky bottom-0 z-30 w-full border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-4 py-3 shadow-float mt-8 rounded-b-2xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Back Action */}
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 1 || isSubmitting}
          className="rounded-xl text-xs sm:text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
        </Button>

        <div className="flex items-center gap-2">
          {/* Save Draft Action */}
          <Button
            type="button"
            variant="ghost"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="rounded-xl text-xs text-slate-600 hidden sm:inline-flex"
          >
            <Bookmark className="h-4 w-4 mr-1.5 text-slate-400" /> Save Draft
          </Button>

          {/* Continue / Publish Action */}
          {isFinalStep ? (
            <PrimaryButton
              type="button"
              onClick={onPublish}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="rounded-xl px-6 text-xs sm:text-sm font-bold bg-green-600 hover:bg-green-700 text-white"
              rightIcon={Check}
            >
              {isSubmitting ? 'Publishing Listing...' : 'Publish Listing'}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              type="button"
              onClick={onNext}
              isLoading={isSubmitting}
              disabled={!canContinue || isSubmitting}
              className="rounded-xl px-5 text-xs sm:text-sm font-bold"
              rightIcon={ArrowRight}
            >
              {isSubmitting ? 'Uploading Photos...' : currentStep === totalSteps - 1 ? 'Go to Preview' : 'Continue'}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
