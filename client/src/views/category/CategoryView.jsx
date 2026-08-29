import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { listingService } from '@/services/listingService';

import { PageContainer } from '@/components/layout/PageContainer';
import { ProductGrid } from '@/components/common/ProductGrid';
import { SearchBar } from '@/components/common/SearchBar';
import { EmptyState } from '@/components/common/EmptyState';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen, Calculator, Glasses, Laptop, FileText, PenTool, Package, Layers } from 'lucide-react';

const ICON_MAP = {
  BookOpen,
  Calculator,
  Glasses,
  Laptop,
  FileText,
  PenTool,
  Package,
  Layers,
};

export default function CategoryView() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedListingType, setSelectedListingType] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [page, setPage] = useState(1);

  // Fetch Category info & active counts
  const { data: category, isLoading: isCatLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
  });

  // Fetch listings for this specific category
  const { data: listingsData, isLoading: isListingsLoading } = useQuery({
    queryKey: ['categoryListings', slug, searchTerm, selectedCondition, selectedListingType, selectedSort, page],
    queryFn: () =>
      listingService.getListings({
        category: slug,
        search: searchTerm || undefined,
        condition: selectedCondition || undefined,
        listingType: selectedListingType || undefined,
        sort: selectedSort,
        page,
        limit: 12,
      }),
  });

  const items = listingsData?.items || [];
  const pagination = listingsData?.pagination || { page: 1, totalPages: 1, totalItems: 0 };

  const IconComponent = category?.icon && ICON_MAP[category.icon] ? ICON_MAP[category.icon] : BookOpen;

  return (
    <PageContainer className="space-y-6 pb-16">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Marketplace</span>
      </button>

      {/* Category Header Banner */}
      {isCatLoading ? (
        <Skeleton className="h-32 w-full rounded-3xl" />
      ) : (
        <Card className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-600/20 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">{category?.name || slug}</h1>
                <span className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 text-[11px] font-extrabold">
                  {category?.activeListingsCount || pagination.totalItems || 0} active resources
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">{category?.description}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Category Search & Filter Toolbar */}
      <div className="space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setPage(1);
          }}
          placeholder={`Search within ${category?.name || 'this category'}...`}
        />

        <div className="flex items-center justify-between gap-3 flex-wrap bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <select
              value={selectedCondition}
              onChange={(e) => {
                setSelectedCondition(e.target.value);
                setPage(1);
              }}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="">All Conditions</option>
              <option value="new">New</option>
              <option value="like_new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>

            <select
              value={selectedListingType}
              onChange={(e) => {
                setSelectedListingType(e.target.value);
                setPage(1);
              }}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="">All Types (Buy & Rent)</option>
              <option value="sale">Buy Only</option>
              <option value="rent">Rent Only</option>
              <option value="sale_and_rent">Buy & Rent</option>
            </select>
          </div>

          <select
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e.target.value);
              setPage(1);
            }}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 focus:outline-none focus:border-blue-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_low_to_high">Price: Low to High</option>
            <option value="price_high_to_low">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Category Listings Grid */}
      {items.length === 0 && !isListingsLoading ? (
        <EmptyState
          title={`No Resources Available in ${category?.name || 'this category'} yet`}
          description="Be the first verified student to list textbooks or gear in this category."
          actionLabel="Browse All Marketplace Items"
          onAction={() => navigate('/search')}
        />
      ) : (
        <ProductGrid products={items} isLoading={isListingsLoading} />
      )}

      {/* Pagination Footer */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 text-xs">
          <span className="text-slate-500 font-medium">
            Page {pagination.page} of {pagination.totalPages} ({pagination.totalItems} items)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
