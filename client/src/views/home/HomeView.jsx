import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingService } from '@/services/listingService';
import { ListingModel } from '@/models/Listing';
import { useAuth } from '@/hooks/useAuth';
import { currentUser, quickActions, homeCategories, semesterBundles, recommendedProducts as fallbackRecommended, trendingNearYou as fallbackTrending } from '@/data/homeData';

import { GreetingSection } from './components/GreetingSection';
import { PromoBanner } from './components/PromoBanner';
import { QuickActions } from './components/QuickActions';
import { CategorySection } from './components/CategorySection';
import { RecommendedSection } from './components/RecommendedSection';
import { SemesterEssentials } from './components/SemesterEssentials';
import { TrendingSection } from './components/TrendingSection';

import { SearchBar } from '@/components/common/SearchBar';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { PageContainer } from '@/components/layout/PageContainer';
import { PlusCircle } from 'lucide-react';

export default function HomeView() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  // Active student user identity for Greeting section
  const user = authUser || currentUser;

  // Fetch real active listings from backend API
  const { data: listingsData, isLoading } = useQuery({
    queryKey: ['homeListings'],
    queryFn: () => listingService.getListings({ limit: 8, sort: 'newest' }),
    staleTime: 1000 * 60 * 2, // 2 mins cache
  });

  const apiItems = Array.isArray(listingsData?.items)
    ? listingsData.items.map(ListingModel.fromApiListing)
    : [];

  const recommendedItems = apiItems.length > 0 ? apiItems.slice(0, 4) : fallbackRecommended;
  const trendingItems = apiItems.length > 4 ? apiItems.slice(4, 8) : fallbackTrending;

  const handleSearchSubmit = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <PageContainer className="space-y-8 pb-20">
      {/* 1. GREETING & HERO SEARCH */}
      <div className="space-y-5">
        <GreetingSection user={user} />
        
        <div className="md:hidden">
          <SearchBar onSearch={handleSearchSubmit} placeholder="Search campus textbooks, gear..." />
        </div>
        
        <PromoBanner />
      </div>

      {/* 2. QUICK ACTIONS BAR */}
      <QuickActions actions={quickActions} />

      {/* 3. CATEGORY BROWSING SECTION */}
      <CategorySection categories={homeCategories} />

      {/* 4. RECOMMENDED RESOURCES SECTION */}
      <RecommendedSection products={recommendedItems} isLoading={isLoading} />

      {/* 5. SEMESTER ESSENTIALS */}
      <SemesterEssentials bundles={semesterBundles} />

      {/* 6. TRENDING ON CAMPUS SECTION */}
      <TrendingSection products={trendingItems} isLoading={isLoading} />

      {/* 7. CALL TO ACTION FOOTER BANNER */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 text-center space-y-4 shadow-subtle">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Have Academic Gear You No Longer Need?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          List your textbooks, calculators, and lab gear in under 2 minutes. Rent or sell directly to verified students on your campus.
        </p>
        <div className="pt-2">
          <PrimaryButton onClick={() => navigate('/sell')} leftIcon={PlusCircle} className="mx-auto text-xs sm:text-sm font-bold px-6 py-3 rounded-xl">
            Post a Listing Now
          </PrimaryButton>
        </div>
      </div>
    </PageContainer>
  );
}
