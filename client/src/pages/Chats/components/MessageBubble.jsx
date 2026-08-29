import React from 'react';
import { Check, CheckCheck, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MessageBubble({ message, onRetry }) {
  const isSentByMe = Boolean(message?.isSentByMe);
  const isSending = message?.status === 'sending';
  const isFailed = message?.status === 'failed';
  const isRead = message?.status === 'read';

  const textContent = typeof message?.text === 'object' ? (message.text?.text || '') : (message?.text || '');
  const timestampText = typeof message?.timestamp === 'object' ? 'Just now' : (message?.timestamp || 'Just now');

  return (
    <div className={cn('flex flex-col my-1 max-w-[85%] sm:max-w-[75%]', isSentByMe ? 'ml-auto items-end' : 'mr-auto items-start')}>
      <div
        className={cn(
          'p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs break-words',
          isSentByMe
            ? 'bg-blue-600 text-white rounded-br-xs'
            : 'bg-slate-100 text-slate-900 border border-slate-200/80 rounded-bl-xs'
        )}
      >
        {textContent}
      </div>

      <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-400 font-medium">
        <span>{timestampText}</span>

        {isSentByMe && (
          <span className="flex items-center gap-0.5">
            {isSending && <Clock className="h-3 w-3 text-slate-400 animate-spin" />}
            {isFailed && (
              <button
                type="button"
                onClick={() => onRetry && onRetry(message.id)}
                className="inline-flex items-center gap-0.5 font-bold text-red-600 hover:underline"
              >
                <AlertCircle className="h-3 w-3 text-red-600" />
                <span>Failed • Retry</span>
              </button>
            )}
            {message.status === 'sent' && <Check className="h-3 w-3 text-slate-400" />}
            {isRead && <CheckCheck className="h-3 w-3 text-blue-500" />}
          </span>
        )}
      </div>
    </div>
  );
}
