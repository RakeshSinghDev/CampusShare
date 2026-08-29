import React from 'react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Edit3, Star, MapPin, GraduationCap, Calendar, Clock, CheckCircle2 } from 'lucide-react';

/**
 * Student Marketplace Profile Header.
 */
export function ProfileHeader({ profile, onEditClick }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-subtle bg-white mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          
          {/* Avatar with Status Indicator */}
          <div className="relative shrink-0">
            <UserAvatar
              name={profile.name}
              src={profile.avatarUrl}
              isVerified={profile.isVerified}
              size="xl"
              className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-white shadow-md ring-2 ring-blue-100"
            />
            {profile.isVerified && (
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ring-2 ring-white" title="Verified Student Identity">
                <ShieldCheck className="h-4 w-4" />
              </span>
            )}
          </div>

          {/* Student Info Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {profile.name}
              </h1>
              {profile.isVerified && (
                <VerifiedBadge showLabel universityName={profile.university} />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="flex items-center gap-1 font-semibold text-slate-900">
                <GraduationCap className="h-4 w-4 text-blue-600 shrink-0" />
                {profile.department}
              </span>
              <span className="text-slate-300">•</span>
              <span>{profile.academicYear} ({profile.major})</span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> {profile.campus}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" /> Joined {profile.joinedDate}
              </span>
            </div>

            {/* Marketplace Trust Signals */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60">
                <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
                {profile.rating} Peer Rating ({profile.reviewCount} reviews)
              </span>

              <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200/60">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                {profile.successfulExchanges} Successful Exchanges
              </span>

              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                Replies {profile.avgResponseTime}
              </span>
            </div>
          </div>

          {/* Edit Profile Action */}
          <PrimaryButton
            variant="outline"
            size="sm"
            onClick={onEditClick}
            className="rounded-xl shrink-0 text-xs gap-1.5"
            leftIcon={Edit3}
          >
            Edit Profile
          </PrimaryButton>

        </div>
      </CardContent>
    </Card>
  );
}
