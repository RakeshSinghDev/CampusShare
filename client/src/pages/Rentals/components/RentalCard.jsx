import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, MessageSquare, Clock, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { UserAvatar } from '@/components/common/UserAvatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export function RentalCard({ rental, onCancel }) {
  const isOverdue = rental.status === 'overdue';
  const isUpcoming = rental.status === 'upcoming';
  const isCompleted = rental.status === 'completed';
  const isActive = rental.status === 'active';

  return (
    <Card className="rounded-2xl border-slate-200 bg-white overflow-hidden shadow-subtle flex flex-col justify-between">
      <CardContent className="p-5 space-y-4">
        {/* Top Header Row */}
        <div className="flex items-start gap-4">
          <img
            src={rental.imageUrl}
            alt={rental.title}
            className="h-20 w-20 rounded-xl object-cover bg-slate-100 shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <StatusBadge status={isOverdue ? 'paused' : rental.status === 'active' ? 'rented' : rental.status} />
              {isOverdue && (
                <span className="text-[11px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> {rental.daysOverdue} days overdue
                </span>
              )}
            </div>

            <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
              <Link to={`/rentals/${rental.id}`} className="hover:text-blue-600 transition-colors">
                {rental.title}
              </Link>
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Calendar className="h-3.5 w-3.5 text-slate-400" /> {rental.startDate} – {rental.endDate}
              </span>
              <span>•</span>
              <span>{rental.durationLabel}</span>
            </div>
          </div>
        </div>

        {/* Financial & Pickup Summary */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Rental Fee</span>
            <span className="font-extrabold text-slate-900">{formatCurrency(rental.rentalFee)}</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block">Refundable Deposit</span>
            <span className="font-extrabold text-emerald-700">{formatCurrency(rental.securityDeposit)}</span>
          </div>
        </div>

        {/* Lender & Location */}
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <UserAvatar name={rental.lender.name} src={rental.lender.avatarUrl} size="sm" />
            <span className="font-bold text-slate-800">{rental.lender.name}</span>
          </div>

          {rental.pickup?.locationName && (
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-slate-400" /> {rental.pickup.locationName}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link to={`/rentals/${rental.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full rounded-xl text-xs gap-1 font-bold">
              View Rental <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <Link to="/chats">
            <Button variant="ghost" size="sm" className="rounded-xl text-xs gap-1.5 text-slate-600">
              <MessageSquare className="h-3.5 w-3.5" /> Chat
            </Button>
          </Link>

          {isUpcoming && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCancel(rental.id)}
              className="rounded-xl text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Cancel
            </Button>
          )}

          {isCompleted && (
            <Link to={`/product/${rental.productId}`}>
              <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1 text-blue-600">
                <RotateCcw className="h-3.5 w-3.5" /> Rent Again
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
