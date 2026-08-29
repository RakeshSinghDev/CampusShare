import React, { useState } from 'react';
import { ProductHeader } from '@/pages/Product/components/ProductHeader';
import { ProductGallery } from '@/pages/Product/components/ProductGallery';
import { BuyRentSelector } from '@/pages/Product/components/BuyRentSelector';
import { RentalDurationOptions } from '@/pages/Product/components/RentalDurationOptions';
import { SellerCard } from '@/pages/Product/components/SellerCard';
import { ItemDetails } from '@/pages/Product/components/ItemDetails';
import { PickupSection } from '@/pages/Product/components/PickupSection';
import { TrustSafety } from '@/pages/Product/components/TrustSafety';
import { Edit3, Eye, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

/**
 * Step 5 — Live Product Listing Preview.
 * Reuses Product Details visual components cleanly with step-edit triggers.
 */
export function PreviewStep({ formData, onGoToStep }) {
  const [previewMode, setPreviewMode] = useState(
    formData.listingType === 'buy' ? 'buy' : 'rent'
  );
  const [selectedDuration, setSelectedDuration] = useState('1_week');

  const previewProduct = {
    id: 'preview',
    title: formData.title || 'Untitled Resource',
    category: formData.category || 'Textbooks',
    condition: formData.condition || 'Like New',
    brand: formData.brand || 'Pearson',
    model: formData.model || 'Standard Edition',
    usage: formData.usage || '1 Semester',
    age: formData.age || 'Recent',
    buyPrice: Number(formData.buyPrice) || 45,
    originalPrice: Number(formData.originalPrice) || 160,
    listingType: formData.listingType || 'both',
    status: 'available',
    description: formData.description || 'No description provided.',
    images: formData.images && formData.images.length > 0 ? formData.images : [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
    ],
    rentPricing: {
      '1_week': Number(formData.rentPriceWeek) || 8,
      'semester': Number(formData.rentPriceSemester) || 35,
    },
    securityDeposit: Number(formData.securityDeposit) || 25,
    seller: {
      name: 'Jordan Lee',
      isVerified: true,
      major: 'Computer Science \'25',
      department: 'School of Engineering',
      university: formData.campus || 'State University',
      rating: '5.0',
      reviewCount: 1,
      successfulExchanges: 1,
    },
    pickup: {
      campus: formData.campus || 'State University',
      locationName: formData.locationName || 'Science Quad',
      timingWindow: formData.timingWindow || 'Mon - Fri, 10 AM – 6 PM',
      isAvailableToday: true,
    },
    verification: {
      isStudentVerified: true,
      isListingVerified: true,
      isCampusPickup: true,
    },
  };

  const currentRentFee = previewProduct.rentPricing[selectedDuration] || previewProduct.rentPricing['1_week'];
  const totalRentDue = currentRentFee + previewProduct.securityDeposit;

  return (
    <div className="space-y-6">
      {/* Banner Indicator */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 text-white shadow-xs">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          <div>
            <span className="font-bold text-sm block">Live Listing Preview</span>
            <span className="text-xs text-blue-100 opacity-90">This is exactly how buyers on campus will see your listing.</span>
          </div>
        </div>
      </div>

      {/* Grid Layout Reusing Product Details Page Components */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-7 space-y-5">
          <div className="relative">
            <div className="absolute top-3 right-3 z-20">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onGoToStep(1)}
                className="rounded-lg text-xs bg-white/95 shadow-md"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit Photos
              </Button>
            </div>
            <ProductGallery images={previewProduct.images} />
          </div>

          <div className="relative">
            <div className="absolute top-3 right-3 z-20">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onGoToStep(2)}
                className="rounded-lg text-xs bg-white/95 shadow-md"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit Details
              </Button>
            </div>
            <ItemDetails product={previewProduct} />
          </div>

          <div className="relative">
            <div className="absolute top-3 right-3 z-20">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onGoToStep(4)}
                className="rounded-lg text-xs bg-white/95 shadow-md"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit Pickup
              </Button>
            </div>
            <PickupSection pickup={previewProduct.pickup} />
          </div>
        </div>

        {/* Right Column: Pricing & Controls */}
        <div className="lg:col-span-5 space-y-5">
          <ProductHeader product={previewProduct} isWishlisted={false} />

          <div className="relative">
            <div className="absolute -top-2 right-0 z-20">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onGoToStep(3)}
                className="rounded-lg text-xs bg-white/95 shadow-md"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit Pricing
              </Button>
            </div>
            <BuyRentSelector
              mode={previewMode}
              onChange={setPreviewMode}
              buyPrice={previewProduct.buyPrice}
              rentStartPrice={previewProduct.rentPricing['1_week']}
            />
          </div>

          {previewMode === 'rent' ? (
            <RentalDurationOptions
              selectedDuration={selectedDuration}
              onSelectDuration={setSelectedDuration}
              rentPricing={previewProduct.rentPricing}
              securityDeposit={previewProduct.securityDeposit}
            />
          ) : (
            <div className="p-4 rounded-2xl border border-slate-200 bg-white">
              <span className="text-xs font-bold text-slate-500 block">Outright Sale Price</span>
              <span className="text-2xl font-extrabold text-slate-900">{formatCurrency(previewProduct.buyPrice)}</span>
            </div>
          )}

          <SellerCard seller={previewProduct.seller} />
        </div>
      </div>
    </div>
  );
}
