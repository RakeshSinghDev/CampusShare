import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProductCard } from '@/components/common/ProductCard';
import { recommendedProducts } from '@/data/homeData';
import { ChevronRight } from 'lucide-react';

export function MarketplacePreview() {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'buy' | 'rent'

  const filteredProducts = recommendedProducts.filter((product) => {
    if (filterType === 'buy') return product.listingType === 'buy' || product.listingType === 'both' || product.buyPrice;
    if (filterType === 'rent') return product.listingType === 'rent' || product.listingType === 'both' || product.rentPrice;
    return true;
  });

  return (
    <section id="marketplace-preview" className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            title="Everything students need, closer to where you study."
            subtitle="Explore textbooks, calculators, lab gear, notes, and course essentials"
            action={
              <Link
                to="/search"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5"
              >
                <span>Explore Marketplace</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            }
          />

          {/* Segmented Control Filter (All / Buy / Rent) */}
          <div className="inline-flex items-center rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-600 self-start sm:self-auto shrink-0 select-none">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              type="button"
              onClick={() => setFilterType('buy')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterType === 'buy'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => setFilterType('rent')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterType === 'rent'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Rent
            </button>
          </div>
        </div>

        {/* Product Cards Grid: 4 Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
