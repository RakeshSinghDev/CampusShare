import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Plus,
  ShoppingBag,
  Clock,
  MessageSquare,
  User,
  ShieldCheck,
  Heart,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { NAV_ITEMS } from '@/constants/navigation';
import { CampusShareLogo } from '@/components/common/CampusShareLogo';
import { UserAvatar } from '@/components/common/UserAvatar';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { SearchBar } from '@/components/common/SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { currentUser } from '@/data/homeData';

export function DesktopHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const activeUser = user || currentUser;
  const userName = activeUser?.name || 'Rakesh Singh';
  const userEmail = activeUser?.email || 'rakesh.singh@kuk.ac.in';

  return (
    <header className="sticky top-0 z-40 hidden md:block w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-shadow shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        
        {/* LEFT: Official CampusShare Brand Logo */}
        <CampusShareLogo size="header" linkTo={isAuthenticated ? '/home' : '/'} />

        {/* CENTER: Integrated Marketplace Search Bar */}
        <div className="w-full max-w-md">
          <SearchBar placeholder="Search campus textbooks, calculators, lab gear..." />
        </div>

        {/* RIGHT: Navigation Links & Unified Action Control System */}
        <div className="flex items-center gap-4 shrink-0">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-150',
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* UNIFIED ACTION CONTROL GROUP (44px Equal Visual Height) */}
          <div className="flex items-center gap-2.5">
            {/* 1. CHAT CONTROL */}
            {isAuthenticated && (
              <Link
                to="/chats"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                aria-label="Open student messages"
                title="Messages"
              >
                <MessageSquare className="h-5 w-5 text-slate-600" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
              </Link>
            )}

            {/* 2. SELL / RENT CTA CONTROL & DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open sell or rent menu"
                  className="group flex h-11 items-center gap-2.5 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-2xs hover:bg-blue-700 active:bg-blue-800 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/20 text-white shrink-0 shadow-2xs">
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <span>Sell / Rent</span>
                  <ChevronDown className="h-4 w-4 text-blue-100 opacity-90 group-hover:translate-y-0.5 transition-transform duration-150 ml-0.5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border border-slate-200/90 shadow-subtle bg-white space-y-1">
                <DropdownMenuLabel className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Campus Marketplace Listing
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  onClick={() => navigate('/sell?mode=sale')}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/60 transition-colors group cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Sell an Item</p>
                    <p className="text-[11px] text-slate-500 font-medium truncate">List resource for one-time sale</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate('/sell?mode=rent')}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/60 transition-colors group cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Rent an Item</p>
                    <p className="text-[11px] text-slate-500 font-medium truncate">List resource for short-term rental</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 3. USER AVATAR & PROFILE MENU CONTROL */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Open profile menu"
                    className="flex h-11 items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-2.5 py-1 hover:bg-slate-50 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  >
                    <UserAvatar name={userName} src={activeUser?.avatarUrl} isVerified size="sm" />
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-subtle bg-white">
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold leading-none text-slate-900">{userName}</p>
                        <VerifiedBadge showLabel={false} size="sm" />
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
                      <p className="text-[10px] text-slate-400 truncate">{activeUser?.college || 'Kurukshetra University'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <User className="h-4 w-4 text-slate-500" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/rentals" className="w-full flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>My Rentals</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="w-full flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <Heart className="h-4 w-4 text-slate-500" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/verify" className="w-full flex items-center gap-2 text-xs font-semibold text-emerald-700 cursor-pointer">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Student Verification</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <Settings className="h-4 w-4 text-slate-500" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={logout} className="text-xs font-semibold text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer">
                    <div className="w-full flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex h-11 items-center px-4 rounded-xl border border-slate-200/90 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex h-11 items-center px-4 rounded-xl bg-blue-600 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
