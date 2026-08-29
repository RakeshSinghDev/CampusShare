import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriceDisplay } from '@/components/common/PriceDisplay';

export function CommunitySection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT 50%: Editorial Message & CTA */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Pass It On
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.08] max-w-[560px]">
              What you no longer need<br />
              <span className="text-blue-600">can help someone else.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
              List textbooks, calculators, lab gear, and course resources and help another student save.
            </p>

            <div className="pt-2">
              <Link
                to="/sell"
                className="group inline-flex items-center justify-center gap-2 h-[44px] px-[20px] rounded-[10px] bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 focus:outline-none"
              >
                <span>List an Item</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[2px]" />
              </Link>
            </div>
          </div>

          {/* RIGHT 50%: Real Marketplace Product Listing Surface */}
          <div className="lg:col-span-6 space-y-3">
            
            {/* Authentic Listing Surface */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <StatusBadge status="available" />
                <span className="text-slate-400 font-normal">Like new condition</span>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
                  alt="Organic Chemistry textbook"
                  className="h-24 w-24 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="space-y-1.5 min-w-0 flex-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Engineering & Science
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug truncate">
                    Organic Chemistry (9th Ed) — Wade & Simek
                  </h3>
                  <div className="pt-0.5">
                    <PriceDisplay
                      buyPrice={450}
                      rentPrice={80}
                      rentPeriod="week"
                      listingType="both"
                      size="md"
                    />
                  </div>
                </div>
              </div>

              {/* Natural Student Metadata Row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <span>Rohit Verma</span>
                  <VerifiedBadge showLabel={false} size="sm" />
                  <span className="text-slate-300 font-normal">•</span>
                  <span className="text-slate-500 font-normal">CSE · Semester 4</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                  <span>North Campus</span>
                </div>
              </div>
            </div>

            {/* Natural Metadata Summary Line */}
            <p className="text-xs text-slate-400 text-center font-medium">
              Listed by Rohit Verma · CSE · Semester 4 · North Campus pickup
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
