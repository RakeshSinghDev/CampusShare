import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { VerifiedBadge } from './VerifiedBadge';
import { PriceDisplay } from './PriceDisplay';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/hooks/useWishlist';
import { formatCurrency } from '@/lib/utils';

/**
 * Authoritative CampusShare Product Card Component.
 * Minimalist, typography-first marketplace listing presentation.
 */
export function ProductCard({ product, onRemove }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const productId = product?._id || product?.id;
  const wishlisted = isWishlisted(productId);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (onRemove && wishlisted) {
      onRemove(productId);
    }
  };

  return (
    <Card className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-subtle hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* 1. Aspect 4:3 Image Container & Subtle Wishlist Button */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100 rounded-t-2xl">
          <Link to={`/product/${productId}`}>
            <img
              src={product.imageUrl || product.images?.[0]?.url || product.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'}
              alt={product.title}
              className="h-full w-full object-cover group-hover:scale-[1.015] transition-transform duration-200"
              loading="lazy"
            />
          </Link>

          {/* 36px Quiet Circular Wishlist Control Top Right */}
          <button
            type="button"
            onClick={handleHeartClick}
            aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
            className="absolute top-2.5 right-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-slate-200/80 text-slate-600 hover:text-rose-500 shadow-2xs transition-colors"
          >
            <Heart
              className={`h-4.5 w-4.5 transition-colors ${
                wishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* 2. Card Main Information Content */}
        <CardContent className="p-3.5 space-y-2">
          {/* Status Dot & Condition Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <StatusBadge status={product.status || 'available'} />
            {product.condition && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">
                  {typeof product.condition === 'object' ? product.condition?.name : product.condition}
                </span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-2 min-h-10 group-hover:text-blue-600 transition-colors">
            <Link to={`/product/${productId}`}>
              {product.title}
            </Link>
          </h3>

          {/* Price Hierarchy */}
          <div className="pt-0.5">
            <PriceDisplay
              buyPrice={product.salePrice || product.buyPrice}
              rentPrice={product.rentalPricing?.price || product.rentPrice}
              rentPeriod={product.rentalPricing?.unit || product.rentPeriod}
              listingType={product.listingType}
              size="md"
            />
          </div>
        </CardContent>
      </div>

      {/* 3. Un-containerized Seller & Campus Metadata Footer */}
      <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-100 flex flex-col gap-1 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800">
          <span>{product.seller?.name || 'Rohit Verma'}</span>
          {product.seller?.isVerified !== false && <VerifiedBadge showLabel={false} size="sm" />}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-normal truncate">
          <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
          <span className="truncate">Campus pickup · {product.location || 'Kurukshetra University'}</span>
        </div>
      </div>
    </Card>
  );
}
