import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { ProductCard } from '@/components/common/ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Heart, Search, Grid } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { sortWishlist } from '@/lib/sortWishlist';

import { WishlistHeader } from './components/WishlistHeader';
import { WishlistToolbar } from './components/WishlistToolbar';
import { WishlistFilterSheet } from './components/WishlistFilterSheet';
import { WishlistSkeleton } from './components/WishlistSkeleton';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistItems, wishlistCount, clearWishlist, removeFromWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState('recently_added');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique categories from wishlist items
  const availableCategories = useMemo(() => {
    const cats = wishlistItems.map((item) => item.category).filter(Boolean);
    return Array.from(new Set(cats));
  }, [wishlistItems]);

  // Filter & Sort items
  const processedItems = useMemo(() => {
    let result = [...wishlistItems];

    if (categoryFilter !== 'all') {
      result = result.filter((i) => i.category === categoryFilter);
    }
    if (statusFilter !== 'all') {
      result = result.filter((i) => i.status === statusFilter);
    }
    if (typeFilter !== 'all') {
      if (typeFilter === 'buy') {
        result = result.filter((i) => i.listingType === 'buy' || i.listingType === 'both');
      } else if (typeFilter === 'rent') {
        result = result.filter((i) => i.listingType === 'rent' || i.listingType === 'both');
      }
    }

    return sortWishlist(result, sortBy);
  }, [wishlistItems, categoryFilter, statusFilter, typeFilter, sortBy]);

  const activeFilterCount =
    (categoryFilter !== 'all' ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0) +
    (typeFilter !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setCategoryFilter('all');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  return (
    <PageContainer>
      {/* Wishlist Header */}
      <WishlistHeader count={wishlistCount} onClear={clearWishlist} />

      {isLoading ? (
        <WishlistSkeleton count={6} />
      ) : wishlistCount === 0 ? (
        /* Empty State */
        <div className="py-8">
          <EmptyState
            icon={Heart}
            title="Your saved wishlist is empty"
            description="Save academic resources, textbooks, or calculators you want to compare, rent later, or watch for price drops."
            actionLabel="Explore Campus Marketplace"
            onAction={() => navigate('/search')}
          >
            <div className="mt-3 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/search?category=Textbooks')}
                className="rounded-xl text-xs"
              >
                Browse Textbooks
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/search?type=rent')}
                className="rounded-xl text-xs"
              >
                Browse Rentals
              </Button>
            </div>
          </EmptyState>
        </div>
      ) : (
        /* Wishlist Content Grid & Toolbar */
        <div>
          {/* Sorting & Filter Controls */}
          <WishlistToolbar
            sortBy={sortBy}
            onSortChange={setSortBy}
            activeFilterCount={activeFilterCount}
            onOpenMobileFilters={() => setIsFilterSheetOpen(true)}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            categories={availableCategories}
          />

          {/* No Filter Results Fallback */}
          {processedItems.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm font-semibold text-slate-600">No items match your active filters.</p>
              <Button variant="outline" size="sm" onClick={resetFilters} className="rounded-xl text-xs">
                Reset Active Filters
              </Button>
            </div>
          ) : (
            /* Product Card Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRemove={(id) => removeFromWishlist(id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Filter Sheet Drawer */}
      <WishlistFilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        categories={availableCategories}
        selectedCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
        selectedStatus={statusFilter}
        onStatusChange={setStatusFilter}
        selectedType={typeFilter}
        onTypeChange={setTypeFilter}
        onResetFilters={resetFilters}
      />
    </PageContainer>
  );
}
