import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Active & Past Rentals Tracking Section.
 */
export function RentalsSection({ rentals = [] }) {
  if (rentals.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No active rentals"
        description="Save money by renting textbooks, calculators, or lab coats for a semester."
        actionLabel="Explore Campus Rentals"
        onAction={() => window.location.assign('/search?type=rent')}
      />
    );
  }

  return (
    <div className="space-y-4">
      {rentals.map((item) => (
        <Card key={item.id} className="rounded-2xl border-slate-200 bg-white overflow-hidden shadow-subtle">
          <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-16 w-16 rounded-xl object-cover bg-slate-100 shrink-0"
              />

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={item.status === 'active' ? 'rented' : 'sold'} />
                  <span className="text-xs font-bold text-blue-600">{item.rate}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {item.title}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> Due: {item.dueDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    Lender: <UserAvatar name={item.lender.name} src={item.lender.avatarUrl} size="sm" />
                    <span className="font-semibold text-slate-900">{item.lender.name}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Link to="/chats">
                <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> Chat Lender
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
