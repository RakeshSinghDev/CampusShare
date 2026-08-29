import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { MapPin, ChevronRight, Tag } from 'lucide-react';
import { semesterBundles as defaultSemesterBundles } from '@/data/homeData';

/**
 * Semester Essentials — Course Bundles section.
 * Contract: Expects bundles array with fallback to default semesterBundles config.
 */
export function SemesterEssentials({ bundles = defaultSemesterBundles }) {
  const itemsList = Array.isArray(bundles) && bundles.length > 0 ? bundles : defaultSemesterBundles;

  return (
    <section className="mb-10">
      <SectionHeader
        title="Semester Essentials"
        subtitle="Frequently needed course resource packs bundled together by upperclassmen"
        action={
          <Link
            to="/search?category=bundles"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            Explore Bundles <ChevronRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {itemsList.map((bundle) => (
          <div
            key={bundle.id}
            className="group relative flex flex-col sm:flex-row rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-subtle hover:shadow-card-hover hover:border-blue-200 transition-all duration-200"
          >
            {/* Bundle Image */}
            <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-slate-100 shrink-0">
              <img
                src={bundle.imageUrl}
                alt={bundle.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-blue-600 text-white font-bold text-[10px] shadow-xs">
                  {bundle.itemCount} Resources Included
                </Badge>
              </div>
            </div>

            {/* Bundle Details */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                    <Tag className="h-3 w-3" /> {bundle.savingsText}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="h-3 w-3" /> {bundle.location}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link to={`/product/${bundle.id}`}>{bundle.title}</Link>
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                  {bundle.subtitle}
                </p>
              </div>

              {/* Price & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-slate-900">
                    {formatCurrency(bundle.bundlePrice)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(bundle.originalPrice)}
                  </span>
                </div>

                <Link
                  to={`/product/${bundle.id}`}
                  className="rounded-xl bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  View Bundle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
