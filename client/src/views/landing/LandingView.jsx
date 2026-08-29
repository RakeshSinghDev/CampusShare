import React, { useEffect } from 'react';
import { LandingHeader } from './components/LandingHeader';
import { HeroSection } from './components/HeroSection';
import { StudentProblemSection } from './components/StudentProblemSection';
import { CampusSearchSection } from './components/CampusSearchSection';
import { MarketplacePreview } from './components/MarketplacePreview';
import { CategoryStrip } from './components/CategoryStrip';
import { WhyCampusShare } from './components/WhyCampusShare';
import { HowItWorks } from './components/HowItWorks';
import { RentalSection } from './components/RentalSection';
import { CommunitySection } from './components/CommunitySection';
import { TrustSection } from './components/TrustSection';
import { FinalCTA } from './components/FinalCTA';
import { LandingFooter } from './components/LandingFooter';

export default function LandingView() {
  useEffect(() => {
    document.title = 'CampusShare — Find What You Need. Right on Campus.';
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-700">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <StudentProblemSection />
        <CampusSearchSection />
        <MarketplacePreview />
        <CategoryStrip />
        <WhyCampusShare />
        <HowItWorks />
        <RentalSection />
        <CommunitySection />
        <TrustSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
