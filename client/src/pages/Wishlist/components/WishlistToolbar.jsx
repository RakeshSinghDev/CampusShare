import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function WishlistToolbar({
  sortBy,
  onSortChange,
  activeFilterCount = 0,
  onOpenMobileFilters,
  categoryFilter,
  onCategoryFilterChange,
  categories = [],
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-50/70 border border-slate-200/80 p-3 rounded-2xl">
      
      {/* Desktop Quick Category Filters */}
      <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => onCategoryFilterChange('all')}
          className={cn(
            'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap',
            categoryFilter === 'all'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          )}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryFilterChange(cat)}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap',
              categoryFilter === cat
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile Filter Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenMobileFilters}
        className="sm:hidden rounded-xl text-xs gap-1.5 bg-white"
      >
        <SlidersHorizontal className="h-4 w-4 text-slate-500" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </Button>

      {/* Sorting Control Dropdown */}
      <div className="flex items-center gap-2 ml-auto">
        <label htmlFor="wishlist-sort" className="text-xs font-bold text-slate-500 hidden sm:inline-flex items-center gap-1">
          <ArrowUpDown className="h-3.5 w-3.5" /> Sort by:
        </label>

        <select
          id="wishlist-sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer"
        >
          <option value="recently_added">Recently Added</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="recently_updated">Recently Updated</option>
        </select>
      </div>

    </div>
  );
}
