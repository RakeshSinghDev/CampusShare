import { useState, useEffect, useCallback } from 'react';
import { mockWishlistProducts } from '@/data/wishlistData';
import { toast } from 'sonner';

const WISHLIST_STORAGE_KEY = 'campusshare_wishlist';
const EVENT_WISHLIST_UPDATED = 'campusshare_wishlist_updated';

/**
 * Gets saved wishlist array from localStorage or defaults to initial mock dataset.
 */
function getInitialWishlist() {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // Ignore read errors
  }
  return mockWishlistProducts;
}

/**
 * Custom React hook managing local Wishlist state across all routes cleanly.
 */
export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState(getInitialWishlist);
  const [lastRemovedItem, setLastRemovedItem] = useState(null);

  // Sync state across browser tabs / route mounts via custom event
  useEffect(() => {
    const handleSync = () => {
      setWishlistItems(getInitialWishlist());
    };
    window.addEventListener(EVENT_WISHLIST_UPDATED, handleSync);
    return () => window.removeEventListener(EVENT_WISHLIST_UPDATED, handleSync);
  }, []);

  const saveWishlist = useCallback((items) => {
    setWishlistItems(items);
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // Ignore write errors
    }
    window.dispatchEvent(new Event(EVENT_WISHLIST_UPDATED));
  }, []);

  const isWishlisted = useCallback(
    (productId) => wishlistItems.some((item) => String(item.id || item._id) === String(productId)),
    [wishlistItems]
  );

  const addToWishlist = useCallback(
    (product) => {
      const productId = product?._id || product?.id;
      if (!productId || isWishlisted(productId)) return;
      const updated = [product, ...wishlistItems];
      saveWishlist(updated);
      toast.success(`Saved "${product.title || 'Resource'}" to wishlist`);
    },
    [wishlistItems, isWishlisted, saveWishlist]
  );

  const removeFromWishlist = useCallback(
    (productId) => {
      const itemToRemove = wishlistItems.find((i) => String(i.id || i._id) === String(productId));
      if (!itemToRemove) return;

      setLastRemovedItem(itemToRemove);
      const updated = wishlistItems.filter((i) => String(i.id || i._id) !== String(productId));
      saveWishlist(updated);

      toast('Removed from wishlist', {
        action: {
          label: 'Undo',
          onClick: () => {
            if (itemToRemove) {
              const restored = [itemToRemove, ...updated];
              saveWishlist(restored);
              toast.success(`Restored "${itemToRemove.title}" to wishlist`);
            }
          },
        },
      });
    },
    [wishlistItems, saveWishlist]
  );

  const toggleWishlist = useCallback(
    (product) => {
      const productId = product?._id || product?.id;
      if (!productId) return;
      if (isWishlisted(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(product);
      }
    },
    [isWishlisted, removeFromWishlist, addToWishlist]
  );

  const clearWishlist = useCallback(() => {
    saveWishlist([]);
    toast.info('Wishlist cleared');
  }, [saveWishlist]);

  return {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isWishlisted,
    isSaved: isWishlisted, // Export isSaved alias for backwards compatibility
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
