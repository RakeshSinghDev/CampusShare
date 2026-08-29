import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, ShieldCheck, ArrowLeft, Eye, Bookmark } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

/**
 * Product Details Header — Title, Availability, Category, Condition & Quick Actions.
 */
export function ProductHeader({ product, isWishlisted, onToggleWishlist }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} on CampusShare!`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Listing link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-3">
      {/* Navigation & Action Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          to="/search"
          className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
            aria-label="Share listing"
            title="Share listing"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={onToggleWishlist}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors shadow-2xs ${
              isWishlisted
                ? 'border-red-200 bg-red-50 text-red-500 fill-red-500'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
            aria-label="Save to wishlist"
            title="Save to wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Badges Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <StatusBadge status={product.status || 'available'} />
        <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium">
          {typeof product.condition === 'object' ? product.condition?.name : product.condition}
        </Badge>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
          {typeof product.category === 'object' ? (product.category?.name || product.category?.slug) : product.category}
        </span>
        {product.verification?.isListingVerified && (
          <VerifiedBadge showLabel universityName="Verified Listing" size="sm" />
        )}
      </div>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {product.title}
      </h1>

      {/* Stats Counter Bar */}
      {product.stats && (
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-0.5">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-slate-400" /> {product.stats.viewsCount} views
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Bookmark className="h-3.5 w-3.5 text-slate-400" /> {product.stats.savesCount} saved
          </span>
        </div>
      )}
    </div>
  );
}
