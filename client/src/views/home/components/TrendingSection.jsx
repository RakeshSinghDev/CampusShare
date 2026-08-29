import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProductCard } from '@/components/common/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Flame } from 'lucide-react';
import { trendingNearYou as defaultTrending } from '@/data/homeData';

/**
 * Trending Near You — Local Campus Discovery section.
 * Renders high-demand listings actively viewed on campus.
 */
export function TrendingSection({ products = defaultTrending, isLoading = false }) {
  const itemsList = Array.isArray(products) && products.length > 0 ? products : defaultTrending;

  return (
    <section className="mb-8">
      <SectionHeader
        title="Trending Near You"
        subtitle="High-demand listings actively viewed by students across campus"
        action={
          <Link
            to="/search?sort=trending"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5"
          >
            <span>See Trending</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-3 p-3 rounded-2xl border border-slate-200 bg-white">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {itemsList.map((product) => (
            <div key={product.id || product._id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
