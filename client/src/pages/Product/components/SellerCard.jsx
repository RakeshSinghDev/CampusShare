import React from 'react';
import { Link } from 'react-router-dom';
import { UserAvatar } from '@/components/common/UserAvatar';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { Star, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Seller Credibility & Campus Profile Card.
 */
export function SellerCard({ seller }) {
  if (!seller) return null;

  return (
    <Card className="rounded-2xl border-slate-200 shadow-subtle bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <UserAvatar
              name={seller.name}
              src={seller.avatarUrl}
              isVerified={seller.isVerified}
              size="lg"
            />

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {seller.name}
                </h3>
                {seller.isVerified && <VerifiedBadge showLabel={false} size="sm" />}
              </div>

              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                {seller.major}
              </p>
              <p className="text-[11px] text-slate-500">
                {seller.department} • {seller.university}
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
                  <span>{seller.rating} ({seller.reviewCount} reviews)</span>
                </span>

                <span className="text-slate-500 font-medium">
                  {seller.successfulExchanges} successful exchanges
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/profile"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 shrink-0 flex items-center gap-0.5 mt-1"
          >
            View Profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
