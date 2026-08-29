import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT ~55%: Contextual Message */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Next Semester Preparation
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.08] max-w-[540px]">
                Need something for<br />
                <span className="text-blue-600">your next semester?</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
                Find it from another student on your campus — or pass along something you no longer need.
              </p>
            </div>

            {/* RIGHT ~45%: Intentional Action Panel */}
            <div className="lg:col-span-5 space-y-4 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0">
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
                <Link
                  to="/search"
                  className="group inline-flex items-center justify-center gap-2 h-[44px] px-[20px] rounded-[10px] bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 focus:outline-none"
                >
                  <span>Explore resources</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[2px]" />
                </Link>

                <Link
                  to="/sell"
                  className="inline-flex items-center justify-center h-[44px] px-[20px] rounded-[10px] bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors duration-150 focus:outline-none"
                >
                  List an item
                </Link>
              </div>

              {/* Product Metadata Detail */}
              <div className="pt-1 text-xs text-slate-500 font-medium space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Available on your campus
                </span>
                <p className="text-slate-700">
                  Books · Calculators · Lab Gear · Study Notes
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
