import React from 'react';
import { WIZARD_STEPS } from '@/constants/listing';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Step progress bar for listing creation wizard.
 */
export function ListingProgress({ currentStep, onStepClick }) {
  return (
    <div className="w-full mb-6">
      {/* Mobile Compact Progress Header */}
      <div className="flex items-center justify-between md:hidden mb-2 text-xs font-semibold text-slate-600">
        <span>Step {currentStep} of {WIZARD_STEPS.length}: {WIZARD_STEPS[currentStep - 1]?.title}</span>
        <span className="text-blue-600 font-bold">{Math.round((currentStep / WIZARD_STEPS.length) * 100)}%</span>
      </div>

      {/* Progress Bar Track */}
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mb-4">
        <div
          className="h-full bg-blue-600 transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / WIZARD_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Desktop Stepper Indicator */}
      <div className="hidden md:grid grid-cols-6 gap-2">
        {WIZARD_STEPS.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => isCompleted && onStepClick(step.number)}
              disabled={!isCompleted && !isCurrent}
              className={cn(
                'flex items-center gap-2 p-2 rounded-xl border text-left transition-all text-xs font-semibold',
                isCurrent
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 cursor-pointer'
                  : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
              )}
            >
              <div
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                )}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : step.number}
              </div>
              <span className="truncate">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
