import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { EmptyState } from '@/components/common/EmptyState';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { useRentals } from '@/hooks/useRentals';

import { RentalHeader } from './components/RentalHeader';
import { RentalSummary } from './components/RentalSummary';
import { OverdueAlertBanner } from './components/OverdueAlertBanner';
import { RentalCard } from './components/RentalCard';
import { RentalSkeleton } from './components/RentalSkeleton';

export default function RentalsPage() {
  const navigate = useNavigate();
  const {
    rentals,
    activeRentals,
    upcomingRentals,
    completedRentals,
    overdueRentals,
    cancelRental,
  } = useRentals();

  const [activeTab, setActiveTab] = useState('active');
  const [cancelTargetId, setCancelTargetId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmCancel = () => {
    if (cancelTargetId) {
      cancelRental(cancelTargetId);
      setCancelTargetId(null);
    }
  };

  const getTabItems = () => {
    if (activeTab === 'active') return activeRentals;
    if (activeTab === 'upcoming') return upcomingRentals;
    if (activeTab === 'completed') return completedRentals;
    return activeRentals;
  };

  const currentItems = getTabItems();

  return (
    <PageContainer>
      {/* Rentals Header */}
      <RentalHeader activeCount={activeRentals.length} />

      {/* 3-Card Metrics Activity Summary */}
      <RentalSummary
        activeCount={activeRentals.length}
        upcomingCount={upcomingRentals.length}
        completedCount={completedRentals.length}
      />

      {/* Overdue Warning Alert Banner */}
      <OverdueAlertBanner overdueItems={overdueRentals} />

      {/* Status Tabs Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'active'
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="h-4 w-4" />
          Active ({activeRentals.length})
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'upcoming'
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="h-4 w-4" />
          Upcoming ({upcomingRentals.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'completed'
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          Completed ({completedRentals.length})
        </button>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <RentalSkeleton count={3} />
      ) : currentItems.length === 0 ? (
        /* Empty State */
        <EmptyState
          icon={Clock}
          title={
            activeTab === 'active'
              ? 'No active rentals'
              : activeTab === 'upcoming'
              ? 'No upcoming rentals'
              : 'No completed rentals'
          }
          description="Save money by renting textbooks, calculators, or lab gear from verified classmates."
          actionLabel="Explore Campus Rentals"
          onAction={() => navigate('/search?type=rent')}
        />
      ) : (
        /* Rental Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentItems.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              onCancel={(id) => setCancelTargetId(id)}
            />
          ))}
        </div>
      )}

      {/* Cancellation Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(cancelTargetId)}
        onClose={() => setCancelTargetId(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Rental Reservation?"
        description="Are you sure you want to cancel this rental reservation? The lender will be notified."
        confirmLabel="Cancel Reservation"
        isDestructive
      />
    </PageContainer>
  );
}
