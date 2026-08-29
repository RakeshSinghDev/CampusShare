import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Camera } from 'lucide-react';

/**
 * Floating Sell CTA pill button for mobile viewports.
 * Positioned fixed bottom-20 right-4 above bottom nav bar.
 */
export function FloatingSellButton() {
  return (
    <Link
      to="/sell"
      className="fixed bottom-20 right-4 z-40 block md:hidden group"
      aria-label="List a resource for sale or rent"
    >
      <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-float ring-4 ring-white/60 active:scale-95 transition-all">
        <Camera className="h-5 w-5 stroke-[2.5]" />
        <span className="text-xs font-extrabold tracking-wide">Sell Item</span>
      </div>
    </Link>
  );
}
