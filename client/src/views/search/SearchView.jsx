import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingService } from '@/services/listingService';
import { searchController } from '@/controllers/searchController';
import { useDebounce } from '@/hooks/useDebounce';

import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ProductGrid } from '@/components/common/ProductGrid';
import { EmptyState } from '@/components/common/EmptyState';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

export default function SearchView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search filter states initialized from URL query string params
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || '');
  const [selectedListingType, setSelectedListingType] = useState(searchParams.get('listingType') || '');
  const [selectedCampus, setSelectedCampus] = useState(searchParams.get('campus') || '');
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // Suggestions Autocomplete Dropdown state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);

  // Debounce search input by 300ms
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Fetch search suggestions when user types
  useEffect(() => {
    let isMounted = true;
    if (debouncedSearch.length >= 2) {
      searchController.getSuggestions(debouncedSearch).then((res) => {
        if (isMounted) {
          setSuggestions(res);
          setShowSuggestions(res.length > 0);
        }
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    return () => { isMounted = false; };
  }, [debouncedSearch]);

  // Sync state to URL Query String
  useEffect(() => {
    const params = searchController.buildQueryParams({
      query: debouncedSearch,
      category: selectedCategory,
      condition: selectedCondition,
      listingType: selectedListingType,
      campus: selectedCampus,
      sort: selectedSort,
      page,
    });
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedCategory, selectedCondition, selectedListingType, selectedCampus, selectedSort, page, setSearchParams]);

  // Query real API listings from backend
  const { data: listingsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['searchListings', debouncedSearch, selectedCategory, selectedCondition, selectedListingType, selectedCampus, selectedSort, page],
    queryFn: () =>
      listingService.getListings({
        search: debouncedSearch || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        condition: selectedCondition || undefined,
        listingType: selectedListingType || undefined,
        campus: selectedCampus || undefined,
        sort: selectedSort,
        page,
        limit: 12,
      }),
    keepPreviousData: true,
  });

  const items = listingsData?.items || [];
  const pagination = listingsData?.pagination || { page: 1, totalPages: 1, totalItems: 0 };

  const activeChips = searchController.getActiveFilterChips({
    query: debouncedSearch,
    category: selectedCategory,
    condition: selectedCondition,
    listingType: selectedListingType,
    campus: selectedCampus,
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCondition('');
    setSelectedListingType('');
    setSelectedCampus('');
    setSelectedSort('newest');
    setPage(1);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (suggestion) => {
    if (typeof suggestion === 'string') {
      setSearchTerm(suggestion);
    } else if (suggestion.type === 'category' && suggestion.slug) {
      navigate(`/category/${suggestion.slug}`);
    } else if (suggestion.text) {
      setSearchTerm(suggestion.text);
    }
    setShowSuggestions(false);
  };

  const removeChip = (key) => {
    if (key === 'query') setSearchTerm('');
    if (key === 'category') setSelectedCategory('all');
    if (key === 'condition') setSelectedCondition('');
    if (key === 'listingType') setSelectedListingType('');
    if (key === 'campus') setSelectedCampus('');
    setPage(1);
  };

  return (
    <PageContainer className="space-y-6 pb-16">
      <SectionHeader
        title="Campus Marketplace Search"
        subtitle="Search textbooks, graphing calculators, lab gear, and electronics across campus"
      />

      {/* 1. SEARCH INPUT WITH AUTOCOMPLETE SUGGESTIONS */}
      <div className="relative z-30">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-subtle focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
          <Search className="h-5 w-5 text-slate-400 shrink-0 ml-2" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            placeholder="Search textbooks, calculators, laptops, lab coats..."
            className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setShowSuggestions(false);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Suggestion Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1.5 rounded-2xl border border-slate-200 bg-white shadow-xl py-2 overflow-hidden z-40">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-blue-500" />
              <span>Search Suggestions</span>
            </div>
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between transition-colors"
              >
                <span>{typeof item === 'string' ? item : item.text}</span>
                {item.type && (
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.type}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. ACTIVE REMOVABLE FILTER CHIPS */}
      {activeChips.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-slate-400 font-bold text-[11px]">Active Filters:</span>
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-200"
            >
              <span>{chip.label}</span>
              <button type="button" onClick={() => removeChip(chip.key)} className="hover:text-blue-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-bold text-red-600 hover:underline ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      {/* 3. TOOLBAR: MOBILE FILTER SHEET & DESKTOP TOOLBAR */}
      <div className="flex items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
        {/* Mobile Filter Sheet Trigger (<1024px) */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100"
              >
                <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-6 space-y-6">
              <SheetHeader>
                <SheetTitle className="text-base font-black text-slate-900">Filter Resources</SheetTitle>
              </SheetHeader>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Item Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="">All Conditions</option>
                    <option value="new">New</option>
                    <option value="like_new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Listing Type</label>
                  <select
                    value={selectedListingType}
                    onChange={(e) => setSelectedListingType(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  >
                    <option value="">All Types (Buy & Rent)</option>
                    <option value="sale">Buy Only</option>
                    <option value="rent">Rent Only</option>
                    <option value="sale_and_rent">Buy & Rent</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Campus Location</label>
                  <input
                    type="text"
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    placeholder="e.g. Stanford Main Campus"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900"
                  />
                </div>

                <div className="pt-4 flex items-center gap-2">
                  <PrimaryButton onClick={() => setPage(1)} className="flex-1 h-10 text-xs font-bold rounded-xl">
                    Apply Filters
                  </PrimaryButton>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="px-3 h-10 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filter Toolbar (1024px+) */}
        <div className="hidden lg:flex items-center gap-2">
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

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
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

      {/* 4. LISTINGS GRID & STATES */}
      {isError ? (
        <EmptyState
          title="Couldn't load search results"
          description="A network or server error occurred while retrieving resources. Please try again."
          actionLabel="Try Again"
          onAction={() => refetch()}
        />
      ) : items.length === 0 && !isLoading ? (
        <EmptyState
          title={debouncedSearch ? `No resources found for "${debouncedSearch}"` : 'No Resources Match Your Criteria'}
          description="Try adjusting your keywords, selecting a different category, or resetting active filters."
          actionLabel="Clear All Filters"
          onAction={handleClearFilters}
        />
      ) : (
        <ProductGrid products={items} isLoading={isLoading} />
      )}

      {/* 5. PAGINATION FOOTER */}
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
