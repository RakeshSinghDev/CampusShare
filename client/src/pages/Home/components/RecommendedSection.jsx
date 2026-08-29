import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProductCard } from '@/components/common/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import { recommendedProducts as defaultRecommended } from '@/data/homeData';

/**
 * Recommended for You product listings section.
 * Contract: Expects products array with fallback to default recommendedProducts.
 */
export function RecommendedSection({ products = defaultRecommended, isLoading = false }) {
  const itemsList = Array.isArray(products) && products.length > 0 ? products : defaultRecommended;

  return (
    <section className="mb-10">
      <SectionHeader
        title="Recommended for You"
        subtitle="Handpicked academic resources based on your major & active courses"
        action={
          <Link
            to="/search"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="space-y-3 p-3 rounded-2xl border border-slate-200 bg-white">
              <Skeleton className="h-36 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x hide-scrollbar sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-visible">
          {itemsList.map((product) => (
            <div key={product.id || product._id} className="w-[260px] shrink-0 snap-start sm:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
