import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { CampusShareLogo } from '@/components/common/CampusShareLogo';
import { UserAvatar } from '@/components/common/UserAvatar';
import { useAuth } from '@/hooks/useAuth';
import { currentUser } from '@/data/homeData';

export function MobileHeader() {
  const { user } = useAuth();
  const activeUser = user || currentUser;
  const userName = activeUser?.name || 'Rakesh Singh';

  return (
    <header className="sticky top-0 z-40 block md:hidden w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Official Brand Logo */}
        <CampusShareLogo size="compact" />

        {/* Quick Mobile Header Action Icons */}
        <div className="flex items-center gap-1">
          <Link
            to="/search"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Search campus resources"
          >
            <Search className="h-4.5 w-4.5" />
          </Link>

          <Link
            to="/wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="View saved wishlist"
          >
            <Heart className="h-4.5 w-4.5" />
          </Link>

          <Link to="/profile" className="ml-1 flex items-center" aria-label="View user profile">
            <UserAvatar name={userName} src={activeUser?.avatarUrl} isVerified size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
