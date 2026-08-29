import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Promotional Rental Banner Component.
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
    <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 sm:p-8 text-white shadow-subtle mb-6">
      {/* Subtle decorative radial accent */}
      <div className="absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white mb-3 backdrop-blur-md border border-white/20">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-200" />
          <span>{data.badgeText}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white">
          {data.title}
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-blue-100 font-medium leading-relaxed opacity-95">
          {data.subtitle}
        </p>

        <div className="mt-5">
          <Button asChild className="rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs sm:text-sm px-5 py-2.5 shadow-2xs">
            <Link to={data.ctaLink} className="gap-2">
              <span>{data.ctaText}</span>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
