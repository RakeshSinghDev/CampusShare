import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProductCard } from '@/components/common/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Flame } from 'lucide-react';
import { trendingNearYou as defaultTrending } from '@/data/homeData';

/**
 * Trending Near You — Local Campus Discovery section.
 * Contract: Expects products array with fallback to default trendingNearYou config.
 */
export function TrendingSection({ products = defaultTrending, isLoading = false }) {
  const itemsList = Array.isArray(products) && products.length > 0 ? products : defaultTrending;

  return (
    <section className="mb-10">
      <SectionHeader
        title="Trending Near You"
        subtitle="High-demand listings actively viewed by students across campus"
        action={
          <Link
            to="/search?sort=trending"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            See Trending <ChevronRight className="h-4 w-4" />
          </Link>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-3 p-3 rounded-2xl border border-slate-200 bg-white">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {itemsList.map((product) => (
            <div key={product.id || product._id} className="relative">
              {/* Hot Trending Pill Indicator */}
              <div className="absolute top-3 left-3 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  <Flame className="h-3 w-3 fill-current text-white" />
                  {product.viewsCount || 'Trending'}
                </span>
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
