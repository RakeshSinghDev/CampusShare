import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ShoppingBag, Clock } from 'lucide-react';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { formatCurrency } from '@/lib/utils';

/**
 * Sticky Mobile Action Bar for product view.
 * Positioned fixed bottom-14 left-0 right-0 z-30 md:hidden above MobileBottomNav.
 */
export function StickyMobileActionBar({
  mode = 'rent',
  price,
  totalDue,
  onActionClick,
}) {
  return (
    <div className="fixed bottom-14 left-0 right-0 z-30 block md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-float">
      <div className="flex items-center justify-between gap-3">
        {/* Chat Seller Icon Button */}
        <Link to="/chats">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Chat with seller"
            title="Chat with seller"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </Link>

        {/* Dynamic Action Button */}
        <PrimaryButton
          onClick={onActionClick}
          className="flex-1 h-11 text-sm rounded-xl font-bold"
          leftIcon={mode === 'buy' ? ShoppingBag : Clock}
        >
          {mode === 'buy'
            ? `Buy Now — ${formatCurrency(price)}`
            : `Rent Now — ${formatCurrency(totalDue)}`}
        </PrimaryButton>
      </div>
    </div>
  );
}
