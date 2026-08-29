import React from 'react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { currentUser } from '@/data/homeData';

/**
 * Compact Greeting & Student Identity section.
 * Contract: Expects user object with fallback to default student identity.
 */
export function GreetingSection({ user = currentUser }) {
  const activeUser = user || currentUser;

  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex items-center justify-between py-2 mb-4">
      <div className="flex items-center gap-3">
        <Link to="/profile" className="relative shrink-0">
          <UserAvatar
            name={activeUser?.name || 'Student'}
            src={activeUser?.avatarUrl}
            isVerified={Boolean(activeUser?.isVerified)}
            size="lg"
            className="ring-2 ring-blue-100"
          />
        </Link>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">
              {getGreetingTime()} 👋
            </span>
            {activeUser?.isVerified && <VerifiedBadge showLabel={false} size="sm" />}
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {activeUser?.name || 'Student'}
          </h1>
          {activeUser?.university && (
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              {activeUser.university}
            </span>
          )}
        </div>
      </div>

      {/* Quick Notification Icon */}
      <Link
        to="/chats"
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-slate-600" />
        {activeUser?.unreadNotifications > 0 && (
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white" />
        )}
      </Link>
    </div>
  );
}
