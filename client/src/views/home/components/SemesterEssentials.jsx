import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { MapPin, ChevronRight, Tag, ShieldCheck } from 'lucide-react';
import { semesterBundles as defaultSemesterBundles } from '@/data/homeData';

/**
 * Semester Essentials — Course Bundles section.
 * Renders verified course pack bundles.
 */
export function SemesterEssentials({ bundles = defaultSemesterBundles }) {
  const itemsList = Array.isArray(bundles) && bundles.length > 0 ? bundles : defaultSemesterBundles;

  return (
    <section className="mb-8">
      <SectionHeader
        title="Semester Essentials"
        subtitle="Frequently needed course resource packs bundled together by upperclassmen"
        action={
          <Link
            to="/search?category=bundles"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5"
          >
            <span>Explore Bundles</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {itemsList.map((bundle) => (
          <div
            key={bundle.id}
            className="group relative flex flex-col sm:flex-row rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-subtle hover:border-slate-300 transition-all duration-200"
          >
            {/* Bundle Image */}
            <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-slate-100 shrink-0">
              <img
                src={bundle.imageUrl}
                alt={bundle.title}
                className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-blue-600 text-white font-bold text-[10px] shadow-2xs border-none">
                  {bundle.itemCount} Items Included
                </Badge>
              </div>
            </div>

            {/* Bundle Details */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px] border border-emerald-200/80">
                    <ShieldCheck className="h-3 w-3" /> Verified Bundle
                  </span>
                  {bundle.location && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <MapPin className="h-3 w-3" /> {bundle.location}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link to={`/product/${bundle.id}`}>{bundle.title}</Link>
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {bundle.subtitle}
                </p>
              </div>

              {/* Price & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-slate-900">
                    {formatCurrency(bundle.bundlePrice)}
                  </span>
                  {bundle.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">
                      {formatCurrency(bundle.originalPrice)}
                    </span>
                  )}
                </div>

                <Button asChild size="sm" variant="outline" className="rounded-xl text-xs font-bold border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200">
                  <Link to={`/product/${bundle.id}`}>
                    Browse Bundle →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
