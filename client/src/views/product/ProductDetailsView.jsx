import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { listingService } from '@/services/listingService';
import { chatService } from '@/services/chatService';
import { productData } from '@/data/productData';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';

import { PageContainer } from '@/components/layout/PageContainer';
import { ProductImageGallery } from '@/components/common/ImageGallery';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, Heart, MapPin, Calendar, ShieldCheck, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailsView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleWishlist } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const [isStartingChat, setIsStartingChat] = useState(false);

  // Fetch real listing from API
  const { data: apiListing, isLoading, isError } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getListingById(id),
    enabled: Boolean(id) && !id.startsWith('prod_'),
    retry: 1,
  });

  // Record view count on mount
  useEffect(() => {
    if (id && !id.startsWith('prod_')) {
      listingService.recordListingView(id);
    }
  }, [id]);

  // Fallback to mock product data if mock ID or API fails
  const mockProduct = productData.find((p) => p.id === id);
  const product = apiListing || mockProduct;

  if (isLoading) {
    return (
      <PageContainer className="space-y-6">
        <Skeleton className="h-8 w-32 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <Skeleton className="h-6 w-1/3 rounded-xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!product && !isLoading) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          title="Resource Not Found"
          description="The academic resource listing you are looking for has been sold, removed, or is no longer available."
          actionLabel="Browse Available Listings"
          onAction={() => navigate('/search')}
        />
      </PageContainer>
    );
  }

  const categoryName = typeof product?.category === 'object'
    ? (product.category?.name || product.category?.slug || 'Academic Resource')
    : (product?.category || 'Academic Resource');

  const conditionText = typeof product?.condition === 'object'
    ? (product.condition?.name || 'Good Condition')
    : (product?.condition ? String(product.condition).replace('_', ' ') : 'Good Condition');

  const isWishlisted = typeof isSaved === 'function' ? isSaved(product._id || product.id) : false;
  const seller = typeof product.seller === 'object' ? product.seller : {
    name: 'Verified Student',
    college: 'Stanford University',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    verificationStatus: 'verified',
  };

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images.map((img) => typeof img === 'string' ? img : img.url)
    : [product.primaryImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Listing link copied to clipboard!');
    }
  };

  const handleChatSeller = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to message student sellers.', {
        action: { label: 'Sign In', onClick: () => navigate('/login') },
      });
      return;
    }

    const currentUserId = user?._id || user?.id;
    const sellerId = seller?._id || seller?.id || seller;

    if (currentUserId && sellerId && String(currentUserId) === String(sellerId)) {
      toast.info('You cannot chat with yourself about your own listing.');
      return;
    }

    try {
      setIsStartingChat(true);
      const conversation = await chatService.startConversation(product._id || product.id, sellerId);
      const convId = conversation._id || conversation.id;
      if (convId) {
        navigate(`/chats/${convId}`);
      }
    } catch (err) {
      if (err.data?.code === 'SELF_CHAT_NOT_ALLOWED') {
        toast.info('You cannot chat with yourself about your own listing.');
      } else {
        toast.error(err.data?.message || err.message || 'Failed to start conversation with seller.');
      }
    } finally {
      setIsStartingChat(false);
    }
  };

  return (
    <PageContainer className="space-y-6 pb-16">
      {/* Back Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Listings
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-2xs transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" /> Share Listing
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductImageGallery images={images} altTitle={product.title} />
        </div>

        {/* Right Column: Listing Meta & Seller Action CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              {categoryName}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 leading-snug">{product.title}</h1>
            
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-medium">
              <span>Condition: <strong className="text-slate-800">{conditionText}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-slate-400" /> {product.viewsCount || '1 view'}</span>
            </div>
          </div>

          {/* Pricing Summary */}
          <Card className="p-4 rounded-2xl border-slate-200 bg-slate-50/50">
            <PriceDisplay
              buyPrice={product.salePrice || product.buyPrice}
              rentPrice={product.rentalPricing?.price || product.rentPrice}
              rentPeriod={product.rentalPricing?.unit || product.rentPeriod}
              listingType={product.listingType}
              size="lg"
            />
          </Card>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Resource Description</h3>
            <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{product.description}</p>
          </div>

          {/* Pickup Location Details */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <h3 className="font-bold text-slate-900 text-sm">Campus Pickup Location</h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">{product.campus || 'Main Campus'}</p>
                <p className="text-slate-600">{product.pickupLocation}</p>
                {product.pickupAvailability && (
                  <p className="text-slate-400 mt-0.5">Availability: {product.pickupAvailability}</p>
                )}
              </div>
            </div>
          </div>

          {/* Seller Profile Summary */}
          <Card className="p-4 rounded-2xl border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={seller.name || 'Verified Student'}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm">{seller.name || 'Verified Student'}</span>
                    <VerifiedBadge size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500">{seller.college || 'Stanford University'}</p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Verified Student
              </span>
            </div>
          </Card>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <PrimaryButton
              onClick={handleChatSeller}
              disabled={isStartingChat}
              leftIcon={isStartingChat ? Loader2 : MessageSquare}
              className="flex-1 h-12 text-sm font-bold rounded-2xl"
            >
              {isStartingChat ? 'Connecting...' : 'Chat Seller'}
            </PrimaryButton>
            
            <SecondaryButton
              onClick={() => toggleWishlist(product)}
              leftIcon={Heart}
              className={`h-12 px-4 rounded-2xl ${isWishlisted ? 'text-red-600 bg-red-50' : ''}`}
            >
              {isWishlisted ? 'Saved' : 'Save'}
            </SecondaryButton>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
