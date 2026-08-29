import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { toast } from 'sonner';

export function MessageComposer({ onSend }) {
  const [text, setText] = useState('');

  const quickReplies = [
    'Is this still available?',
    'Can we meet on campus today?',
    'Is the price negotiable?',
    'Can I rent for 1 week?',
  ];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white p-3 space-y-2.5">
      {/* Quick Reply Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
        {quickReplies.map((reply, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSend(reply)}
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 transition-colors whitespace-nowrap"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input & Actions Form */}
      <form onSubmit={handleSend} className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => toast.info('File attachment UI placeholder')}
          className="p-2 h-10 w-10 rounded-xl text-slate-400 hover:text-slate-600 shrink-0"
          aria-label="Attach file or photo"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 h-10 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
        />

        <PrimaryButton
          type="submit"
          disabled={!text.trim()}
          className="h-10 px-4 rounded-xl text-xs font-bold shrink-0"
          leftIcon={Send}
        >
          Send
        </PrimaryButton>
      </form>
    </div>
  );
}
