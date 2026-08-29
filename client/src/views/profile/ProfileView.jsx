import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { listingService } from '@/services/listingService';
import { listingController } from '@/controllers/listingController';

import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { PlusCircle, Settings, PauseCircle, PlayCircle, Trash2, LogOut } from 'lucide-react';

export default function ProfileView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');

  // Fetch real user listings from API
  const { data: userListingsData, isLoading } = useQuery({
    queryKey: ['userListings'],
    queryFn: () => listingService.getUserListings(),
  });

  const myListings = userListingsData?.items || [];

  const profile = {
    name: user?.name || 'Alex Rivera',
    email: user?.email || 'alex.rivera@stanford.edu',
    college: user?.college || 'Stanford University',
    course: user?.course || 'Computer Science',
    academicYear: user?.academicYear || 'Senior (Year 4)',
    campus: user?.campus || 'Stanford Main Campus',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    verificationStatus: user?.verificationStatus || 'verified',
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <PageContainer className="space-y-6 pb-20">
      {/* 1. STUDENT IDENTITY HEADER */}
      <Card className="p-6 rounded-3xl border-slate-200 bg-white shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-16 w-16 rounded-full object-cover border-2 border-blue-600 shadow-xs"
          />
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-lg font-black text-slate-900">{profile.name}</h1>
              <VerifiedBadge />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {profile.course ? `${profile.course} • ` : ''}{profile.college}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">{profile.email}</p>
            <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ✓ Verified Student Identity
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PrimaryButton onClick={() => navigate('/sell')} leftIcon={PlusCircle} className="text-xs font-bold px-4 py-2.5 rounded-xl">
            Post Listing
          </PrimaryButton>
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </Card>

      {/* 2. PROFILE TAB NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'listings' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          My Listings ({myListings.length})
        </button>
      </div>

      {/* 3. MY LISTINGS MANAGEMENT TAB */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 && !isLoading ? (
            <EmptyState
              title="No Active Listings"
              description="You haven't listed any academic resources yet. Sell or rent your unused books and gear to campus peers."
              actionLabel="Create Your First Listing"
              onAction={() => navigate('/sell')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {myListings.map((item) => (
                <Card key={item._id || item.id} className="p-3 rounded-2xl border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={item.images?.[0]?.url || item.primaryImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        item.status === 'active'
                          ? 'bg-emerald-600 text-white'
                          : item.status === 'paused'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-xs truncate">{item.title}</h3>
                    <p className="text-xs font-black text-blue-600">
                      ${item.salePrice || item.rentalPricing?.price}
                    </p>
                  </div>

                  {/* Listing Controls */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                    <button
                      type="button"
                      onClick={() => listingController.handleToggleStatus(item._id || item.id, item.status, queryClient)}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
                    >
                      {item.status === 'active' ? (
                        <>
                          <PauseCircle className="h-3.5 w-3.5 text-amber-500" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => listingController.handleDeleteListing(item._id || item.id, queryClient)}
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      title="Delete Listing"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
}
