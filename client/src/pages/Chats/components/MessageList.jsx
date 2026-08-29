import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';

export function MessageList({ messages = [], onRetry }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
      {/* Date Separator */}
      <div className="flex items-center justify-center my-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500 border border-slate-200">
          Today
        </span>
      </div>

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onRetry={onRetry} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
