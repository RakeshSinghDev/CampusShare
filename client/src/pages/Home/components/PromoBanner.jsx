import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { PrimaryButton } from '@/components/common/PrimaryButton';

/**
 * Promotional / Value Proposition Banner.
 */
export function PromoBanner({ banner }) {
  const data = banner || {
    title: 'Save up to 70% by Renting Textbooks & Lab Gear',
    subtitle: 'Rent for a semester or single exam cycle directly from verified peers on campus.',
    ctaText: 'Explore Rentals',
    ctaLink: '/search?type=rent',
    badgeText: 'Campus Rental Guarantee',
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 text-white shadow-card mb-8">
      {/* Decorative subtle background circle */}
      <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white mb-3 backdrop-blur-md border border-white/20">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-200" />
          <span>{data.badgeText}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
          {data.title}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed opacity-95">
          {data.subtitle}
        </p>

        <div className="mt-5">
          <Link to={data.ctaLink}>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-blue-700 shadow-sm hover:bg-blue-50 active:scale-95 transition-all">
              <span>{data.ctaText}</span>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
