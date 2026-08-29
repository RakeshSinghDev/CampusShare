import React from 'react';
import { ProductCard } from '@/components/common/ProductCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Heart } from 'lucide-react';

/**
 * Saved Wishlist Section reusing ProductCard.
 */
export function WishlistSection({ wishlist = [] }) {
  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Click the heart icon on any resource card to save it for quick access."
        actionLabel="Explore Marketplace"
        onAction={() => window.location.assign('/search')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((product) => (
        <ProductCard key={product.id} product={{ ...product, isWishlisted: true }} />
      ))}
    </div>
  );
}
