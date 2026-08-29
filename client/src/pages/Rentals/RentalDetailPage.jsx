import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { StatusBadge } from '@/components/common/StatusBadge';
import { UserAvatar } from '@/components/common/UserAvatar';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, MessageSquare, ShieldCheck, ArrowLeft, ExternalLink, Clock, AlertTriangle } from 'lucide-react';
import { useRentals } from '@/hooks/useRentals';
import { RentalTimeline } from './components/RentalTimeline';
import { RentalCostBreakdown } from './components/RentalCostBreakdown';
import { ErrorState } from '@/components/common/ErrorState';

export default function RentalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRentalById } = useRentals();

  const rental = getRentalById(id);

  if (!rental) {
    return (
      <PageContainer>
        <ErrorState
          title="Rental Record Not Found"
          description="The requested rental record could not be found."
          actionLabel="Back to Rentals"
          onAction={() => navigate('/rentals')}
        />
      </PageContainer>
    );
  }

  const isOverdue = rental.status === 'overdue';

  return (
    <PageContainer className="pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-semibold">
        <Link to="/rentals" className="hover:text-blue-600 transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Rentals
        </Link>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-[200px]">{rental.title}</span>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Summary, Timeline & Instructions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Info Card */}
          <Card className="rounded-2xl border-slate-200 bg-white p-5 shadow-subtle">
            <div className="flex gap-4 items-start">
              <img
                src={rental.imageUrl}
                alt={rental.title}
                className="h-24 w-24 rounded-xl object-cover bg-slate-100 shrink-0"
              />

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <StatusBadge status={isOverdue ? 'paused' : rental.status === 'active' ? 'rented' : rental.status} />
                  {isOverdue && (
                    <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" /> {rental.daysOverdue} days overdue
                    </span>
                  )}
                </div>

                <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {rental.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> {rental.startDate} – {rental.endDate}
                  </span>
                  <span>•</span>
                  <span>{rental.durationLabel}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Rental Status Progress Timeline */}
          <RentalTimeline timeline={rental.timeline} />

          {/* Pickup & Return Instructions Card */}
          <Card className="rounded-2xl border-slate-200 bg-white p-5 shadow-subtle space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" /> Campus Exchange Location & Hours
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">Pickup Location</span>
                <span className="text-slate-600 block">{rental.pickup?.locationName}</span>
                <span className="text-[11px] text-slate-400 block">{rental.pickup?.timingWindow}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">Return Location</span>
                <span className="text-slate-600 block">{rental.return?.locationName}</span>
                <span className="text-[11px] text-slate-400 block">{rental.return?.timingWindow}</span>
              </div>
            </div>

            {rental.return?.instructions && (
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 space-y-1">
                <span className="font-bold block">Return Instructions from Lender:</span>
                <p className="text-blue-800">{rental.return.instructions}</p>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT COLUMN: Cost Breakdown, Lender & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Cost Breakdown */}
          <RentalCostBreakdown
            rentalFee={rental.rentalFee}
            securityDeposit={rental.securityDeposit}
          />

          {/* Lender Info Card */}
          <Card className="rounded-2xl border-slate-200 bg-white p-5 shadow-subtle space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Lender Information</h3>

            <div className="flex items-center gap-3">
              <UserAvatar name={rental.lender.name} src={rental.lender.avatarUrl} isVerified={rental.lender.isVerified} size="md" />
              <div>
                <span className="font-extrabold text-slate-900 text-sm block">{rental.lender.name}</span>
                <span className="text-xs text-slate-500 block">{rental.lender.major} • {rental.lender.university}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/chats">
                <PrimaryButton className="w-full rounded-xl text-xs" leftIcon={MessageSquare}>
                  Chat with {rental.lender.name.split(' ')[0]}
                </PrimaryButton>
              </Link>
            </div>
          </Card>

          {/* View Product Details Link */}
          <Link to={`/product/${rental.productId}`}>
            <Button variant="outline" className="w-full rounded-xl text-xs font-semibold gap-1.5">
              <ExternalLink className="h-4 w-4" /> View Rented Item Details Page
            </Button>
          </Link>
        </div>

      </div>
    </PageContainer>
  );
}
