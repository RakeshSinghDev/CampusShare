import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, MapPin, Heart, Search } from 'lucide-react';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';

export function HeroSection() {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-16 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[520px]">
          
          {/* LEFT COLUMN: 52% Desktop Grid */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 tracking-wider uppercase">
              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Your Campus • Your Resources</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-slate-900 leading-[1.04] max-w-[620px]">
              Find what you need.<br />
              <span className="text-blue-600">Right on campus.</span>
            </h1>

            {/* Supporting Body Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[560px] font-normal">
              Find textbooks, calculators, lab gear, and course essentials from students at your campus — without paying full retail price.
            </p>

            {/* Help-First Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to="/search"
                className="group inline-flex items-center justify-center gap-2 h-[44px] px-[20px] rounded-[10px] bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              >
                <span>Explore CampusShare</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[2px]" />
              </Link>

              <button
                type="button"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center h-[44px] px-[20px] rounded-[10px] bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors duration-150"
              >
                How It Works
              </button>
            </div>

            {/* Understated Metadata Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-slate-700">
                <span className="text-blue-600 font-bold">✓</span> Verified students
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-blue-600" /> Campus pickup
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-700">↔ Buy or rent</span>
            </div>
          </div>

          {/* RIGHT COLUMN: 48% Desktop Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-3">
              
              {/* Active Search Result Hint Bar */}
              <div className="rounded-[10px] border border-slate-200/90 bg-slate-50 px-3 py-2 flex items-center justify-between text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2 truncate">
                  <Search className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">"Engineering Mechanics"</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">North Campus</span>
              </div>

              {/* Primary Listing Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs relative z-10">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
                    alt="Engineering Mechanics textbook"
                    className="h-full w-full object-cover group-hover:scale-[1.015] transition-transform duration-200"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                      Available
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Wishlist item"
                    className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 border border-slate-200/80 text-slate-600 hover:text-rose-500 shadow-2xs transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Engineering Textbook
                  </span>

                  <h3 className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-2 min-h-10">
                    Engineering Mechanics (14th Edition)
                  </h3>

                  <div className="flex items-baseline gap-3 pt-0.5">
                    <span className="text-xl font-bold text-slate-900">₹350 <span className="text-xs text-slate-400 font-normal">Buy</span></span>
                    <span className="text-sm font-semibold text-blue-600">₹90/week <span className="text-xs text-slate-400 font-normal">Rent</span></span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <span>Rohit Verma</span>
                    <VerifiedBadge showLabel={false} size="sm" />
                  </div>
                  <span className="text-[11px] text-slate-500">North Campus</span>
                </div>
              </div>

              {/* Single Secondary Product Card Overlay */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 z-20 w-60 rounded-xl border border-slate-200 bg-white p-3 shadow-sm items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=200&q=80"
                  alt="TI-84 Calculator"
                  className="h-11 w-11 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">TI-84 Plus Calculator</p>
                  <p className="text-[11px] font-semibold text-blue-600">₹650 Buy • ₹50/wk Rent</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
