import React from 'react';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProductCard } from '@/components/common/ProductCard';

/**
 * Similar Products Discovery section.
 */
export function SimilarProducts({ products = [] }) {
  if (products.length === 0) return null;

  return (
    <section className="pt-4">
      <SectionHeader
        title="Similar Academic Resources"
        subtitle="Other course materials available near your campus location"
      />

      <div className="flex gap-4 overflow-x-auto pb-3 snap-x hide-scrollbar sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 sm:overflow-visible">
        {products.map((prod) => (
          <div key={prod.id} className="w-[260px] shrink-0 snap-start sm:w-auto">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </section>
  );
}
