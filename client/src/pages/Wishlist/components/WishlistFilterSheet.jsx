import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { FormField } from '@/components/forms/FormField';

export function WishlistFilterSheet({
  isOpen,
  onClose,
  categories = [],
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedType,
  onTypeChange,
  onResetFilters,
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-slate-900">
            Filter Saved Wishlist
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 py-4">
          {/* Category Filter */}
          <FormField label="Category">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </FormField>

          {/* Availability Status */}
          <FormField label="Availability Status">
            <div className="grid grid-cols-3 gap-2">
              {['all', 'available', 'rented'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onStatusChange(st)}
                  className={`h-9 rounded-xl text-xs font-bold capitalize border ${
                    selectedStatus === st
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Items' : st}
                </button>
              ))}
            </div>
          </FormField>

          {/* Listing Option */}
          <FormField label="Listing Option">
            <div className="grid grid-cols-3 gap-2">
              {['all', 'buy', 'rent'].map((tp) => (
                <button
                  key={tp}
                  type="button"
                  onClick={() => onTypeChange(tp)}
                  className={`h-9 rounded-xl text-xs font-bold capitalize border ${
                    selectedType === tp
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {tp === 'all' ? 'All Types' : tp}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 mt-4">
          <Button type="button" variant="outline" onClick={onResetFilters} className="rounded-xl text-xs flex-1">
            Reset Filters
          </Button>
          <PrimaryButton type="button" onClick={onClose} className="rounded-xl text-xs flex-1">
            Apply Filters
          </PrimaryButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
