import React from 'react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { currentUser } from '@/data/homeData';

/**
 * Compact Greeting & Student Identity section.
 * Renders user name, campus, and verified student identity badge.
 */
export function GreetingSection({ user }) {
  const activeUser = user || currentUser;

  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = activeUser?.name || 'Rakesh Singh';
  const displayCollege = activeUser?.college || activeUser?.university || 'Kurukshetra University';

  return (
    <div className="flex items-center justify-between py-2 mb-4">
      <div className="flex items-center gap-3.5">
        <Link to="/profile" className="relative shrink-0 group">
          <UserAvatar
            name={displayName}
            src={activeUser?.avatarUrl}
            isVerified={Boolean(activeUser?.isVerified ?? true)}
            size="lg"
            className="ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all"
          />
        </Link>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">
              {getGreetingTime()} 👋
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {displayName}
            </h1>
            <VerifiedBadge showLabel={false} size="sm" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{displayCollege}</span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
              Verified Student
            </span>
          </div>
        </div>
      </div>

      {/* Notifications Icon Button */}
      <Link
        to="/chats"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5 text-slate-600" />
        {activeUser?.unreadNotifications > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        )}
      </Link>
    </div>
  );
}
