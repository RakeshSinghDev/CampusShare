import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

import { listingController } from '@/controllers/listingController';
import { listingService } from '@/services/listingService';
import { ListingProgress } from '@/pages/Sell/components/ListingProgress';
import { PhotoStep } from '@/pages/Sell/components/PhotoStep';
import { DetailsStep } from '@/pages/Sell/components/DetailsStep';
import { PricingStep } from '@/pages/Sell/components/PricingStep';
import { PickupStep } from '@/pages/Sell/components/PickupStep';
import { PreviewStep } from '@/pages/Sell/components/PreviewStep';
import { ListingFormActions } from '@/pages/Sell/components/ListingFormActions';

export default function SellView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoError, setPhotoError] = useState('');

  // Selected photo objects array: [{ id, file: File | null, url: string, isDemo: boolean }]
  const [photos, setPhotos] = useState([]);

  // React Hook Form instance for wizard steps 2-4
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: 'Textbooks',
      condition: 'Like New',
      listingType: 'buy',
      buyPrice: '',
      originalPrice: '',
      rentPriceWeek: '',
      rentPriceSemester: '',
      securityDeposit: '',
      brand: '',
      model: '',
      usage: '',
      age: '',
      campus: 'Main Campus',
      locationName: '',
      timingWindow: 'Mon - Fri, 10 AM – 6 PM',
      isNegotiable: false,
    },
  });

  // Track uploaded server image URLs
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleNext = async () => {
    // Step 1: PhotoStep Validation & Processing
    if (currentStep === 1) {
      setPhotoError('');
      if (photos.length === 0) {
        setPhotoError('Please select or add at least one resource photo to continue');
        toast.error('Please select or add at least one resource photo');
        return;
      }

      const filesToUpload = photos.filter((p) => p.file instanceof File).map((p) => p.file);

      if (filesToUpload.length > 0) {
        try {
          setIsSubmitting(true);
          const uploadRes = await listingService.uploadListingPhotos(filesToUpload);
          const uploadedServerImages = uploadRes?.images || [];

          let uploadIndex = 0;
          const finalImageObjects = photos.map((p, idx) => {
            if (p.file instanceof File && uploadedServerImages[uploadIndex]) {
              const serverImg = uploadedServerImages[uploadIndex];
              uploadIndex += 1;
              return {
                url: serverImg.url,
                isPrimary: idx === 0,
                order: idx,
              };
            }
            return {
              url: p.url,
              isPrimary: idx === 0,
              order: idx,
            };
          });

          setUploadedImages(finalImageObjects);
          toast.success('Photos uploaded successfully!');
          setCurrentStep(2);
        } catch (err) {
          console.error('[Listing Upload] Error response:', err.data || err);
          const msg = err.data?.message || err.message || 'Failed to upload photos. Please try again.';
          setPhotoError(msg);
          toast.error(msg);
          return;
        } finally {
          setIsSubmitting(false);
        }
      } else {
        const finalImageObjects = photos.map((p, idx) => ({
          url: p.url,
          isPrimary: idx === 0,
          order: idx,
        }));
        setUploadedImages(finalImageObjects);
        setCurrentStep(2);
      }
      return;
    }

    // Step 2: Details Validation
    if (currentStep === 2) {
      const values = getValues();
      if (!values.title || values.title.trim().length < 5) {
        toast.error('Please enter a descriptive title (at least 5 characters)');
        return;
      }
      if (!values.description || values.description.trim().length < 15) {
        toast.error('Please provide a detailed description (at least 15 characters)');
        return;
      }
      setCurrentStep(3);
      return;
    }

    // Step 3: Pricing Validation
    if (currentStep === 3) {
      const values = getValues();
      const type = values.listingType || 'buy';
      if (type === 'buy' || type === 'both') {
        if (!values.buyPrice || Number(values.buyPrice) <= 0) {
          toast.error('Please enter a valid asking price');
          return;
        }
      }
      if (type === 'rent' || type === 'both') {
        if (!values.rentPriceWeek || Number(values.rentPriceWeek) <= 0) {
          toast.error('Please enter a valid weekly rental price');
          return;
        }
      }
      setCurrentStep(4);
      return;
    }

    // Step 4: Pickup Validation
    if (currentStep === 4) {
      const values = getValues();
      if (!values.locationName || values.locationName.trim().length < 2) {
        toast.error('Please enter a campus pickup location (e.g. Library or Student Center)');
        return;
      }
      setCurrentStep(5);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getCombinedFormData = () => {
    const values = getValues();
    return {
      ...values,
      images: uploadedImages.length > 0 ? uploadedImages.map((img) => (typeof img === 'string' ? img : img.url)) : photos.map((p) => p.url),
    };
  };

  const handlePublish = async () => {
    try {
      setIsSubmitting(true);
      const values = getValues();

      const payloadImages = uploadedImages.length > 0
        ? uploadedImages
        : photos.map((p, idx) => ({
            url: p.url,
            isPrimary: idx === 0,
            order: idx,
          }));

      const payload = {
        title: values.title,
        description: values.description,
        category: values.category,
        condition: values.condition,
        listingType: values.listingType === 'buy' ? 'sale' : values.listingType === 'rent' ? 'rent' : 'sale_and_rent',
        salePrice: values.buyPrice ? Number(values.buyPrice) : undefined,
        rentalPricing: (values.listingType === 'rent' || values.listingType === 'both')
          ? {
              unit: values.rentPriceSemester ? 'semester' : 'week',
              price: Number(values.rentPriceWeek || values.rentPriceSemester || 0),
              securityDeposit: Number(values.securityDeposit || 0),
              minimumDuration: 1,
            }
          : undefined,
        brand: values.brand || undefined,
        model: values.model || undefined,
        usage: values.usage || undefined,
        age: values.age || undefined,
        campus: values.campus || 'Main Campus',
        pickupLocation: values.locationName || 'Main Campus',
        pickupAvailability: values.timingWindow || undefined,
        isNegotiable: Boolean(values.isNegotiable),
        images: payloadImages,
      };

      await listingController.handleCreateListing(payload, navigate, queryClient);
    } catch (error) {
      // Handled in controller via toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer className="max-w-3xl space-y-6 pb-20">
      <SectionHeader
        title="Create a Campus Listing"
        subtitle="List your academic resources for sale or rent to verified students in under 2 minutes"
      />

      <ListingProgress currentStep={currentStep} totalSteps={5} />

      <Card className="p-6 rounded-2xl border-slate-200 bg-white shadow-subtle space-y-6">
        {currentStep === 1 && (
          <PhotoStep
            photos={photos}
            setPhotos={setPhotos}
            error={photoError}
          />
        )}
        {currentStep === 2 && (
          <DetailsStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}
        {currentStep === 3 && (
          <PricingStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}
        {currentStep === 4 && (
          <PickupStep
            register={register}
            errors={errors}
          />
        )}
        {currentStep === 5 && (
          <PreviewStep
            formData={getCombinedFormData()}
            onGoToStep={setCurrentStep}
          />
        )}

        <ListingFormActions
          currentStep={currentStep}
          totalSteps={5}
          onBack={handleBack}
          onNext={handleNext}
          onPublish={handlePublish}
          isSubmitting={isSubmitting}
        />
      </Card>
    </PageContainer>
  );
}
