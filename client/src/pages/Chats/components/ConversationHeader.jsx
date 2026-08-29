import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { Button } from '@/components/ui/button';

export function ConversationHeader({ participant, onBack }) {
  if (!participant) return null;

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-3">
        {/* Back button on mobile */}
        {onBack && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="lg:hidden p-1.5 h-8 w-8 rounded-xl text-slate-600"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <div className="relative">
          <UserAvatar name={participant.name} src={participant.avatarUrl} isVerified={participant.isVerified} size="md" />
          {participant.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900 leading-none">
              {participant.name}
            </h2>
            {participant.isVerified && <VerifiedBadge size="sm" />}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>{participant.major}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3 text-slate-400" /> {participant.campus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
