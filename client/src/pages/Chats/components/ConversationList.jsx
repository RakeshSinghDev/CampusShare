import React from 'react';
import { UserAvatar } from '@/components/common/UserAvatar';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { cn } from '@/lib/utils';

export function ConversationList({ conversations = [], activeId, onSelect }) {
  if (conversations.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-slate-500 font-semibold">
        No conversations found.
      </div>
    );
  }

  return (
    <div className="space-y-1.5 overflow-y-auto">
      {conversations.map((conv) => {
        const isSelected = String(conv.id) === String(activeId);
        const hasUnread = conv.unreadCount > 0;

        const lastMsgObj = typeof conv.lastMessage === 'object' ? conv.lastMessage : { text: String(conv.lastMessage || '') };
        const lastMsgText = typeof lastMsgObj?.text === 'object' ? lastMsgObj.text?.text : (lastMsgObj?.text || 'Conversation started');
        const lastMsgTime = typeof lastMsgObj?.timestamp === 'string' ? lastMsgObj.timestamp : 'Just now';
        const isSentByMe = Boolean(lastMsgObj?.isSentByMe);

        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              'w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all border',
              isSelected
                ? 'bg-blue-50/70 border-blue-200 shadow-2xs'
                : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
            )}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* User Avatar with status dot */}
              <div className="relative shrink-0">
                <UserAvatar
                  name={conv.participant.name}
                  src={conv.participant.avatarUrl}
                  isVerified={conv.participant.isVerified}
                  size="md"
                />
                {conv.participant.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1 truncate">
                    <span className={cn('text-xs truncate', hasUnread ? 'font-black text-slate-900' : 'font-bold text-slate-800')}>
                      {conv.participant.name}
                    </span>
                    {conv.participant.isVerified && <VerifiedBadge size="sm" />}
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {lastMsgTime}
                  </span>
                </div>

                {/* Related Product Context snippet */}
                <span className="text-[11px] text-blue-600 font-semibold truncate block">
                  {conv.product.title}
                </span>

                {/* Last message text */}
                <p className={cn('text-xs truncate mt-0.5', hasUnread ? 'font-bold text-slate-900' : 'text-slate-500')}>
                  {isSentByMe && 'You: '}{typeof lastMsgText === 'string' ? lastMsgText : 'Conversation started'}
                </p>
              </div>
            </div>

            {/* Product Thumbnail & Unread Badge */}
            <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
              <img
                src={conv.product.imageUrl}
                alt={conv.product.title}
                className="h-9 w-9 rounded-lg object-cover bg-slate-100 border border-slate-200"
              />

              {hasUnread && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-extrabold text-white">
                  {conv.unreadCount}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
