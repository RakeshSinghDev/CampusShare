import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { StatusBadge } from '@/components/common/StatusBadge';

export function RentalSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Problem & Explanation */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 tracking-wider uppercase">
              <Clock className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Academic Rentals</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
              Need it for one semester?<br />
              <span className="text-blue-600">You probably don't need to buy it.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Rent graphing calculators, lab coats, and course equipment directly from students for the time you actually need them.
            </p>

            <div className="pt-2">
              <Link
                to="/search?type=rent"
                className="group inline-flex items-center gap-2 h-[44px] px-[20px] rounded-[10px] bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 focus:outline-none"
              >
                <span>Explore Rentals</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[2px]" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Realistic Rental Listing Screen Surface */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                <StatusBadge status="available" />
                <span className="text-slate-400 font-normal">Like new condition</span>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=300&q=80"
                  alt="TI-84 Calculator"
                  className="h-20 w-20 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    TI-84 Plus CE Graphing Calculator
                  </h4>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-base font-bold text-blue-600">₹50/week Rent</span>
                    <span className="text-xs text-slate-400 font-normal">• ₹650 Buy</span>
                  </div>
                  <p className="text-xs text-slate-500 pt-1 font-medium">
                    Duration: <strong className="text-slate-800">1 Semester (4 Months)</strong>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">Maya Chen</span>
                  <VerifiedBadge showLabel={false} size="sm" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>North Campus • Library Entrance</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
