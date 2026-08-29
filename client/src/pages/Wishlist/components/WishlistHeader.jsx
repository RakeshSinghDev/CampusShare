import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WishlistHeader({ count = 0, onClear }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Saved Wishlist
          </h1>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200/80">
            {count} {count === 1 ? 'saved item' : 'saved items'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Resources you've saved to compare, watch price drops, or rent later.
        </p>
      </div>

      {count > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="self-start sm:self-auto rounded-xl text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-1.5" /> Clear All Saved
        </Button>
      )}
    </div>
  );
}
