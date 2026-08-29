import { z } from 'zod';

export const photoStepSchema = z.object({
  images: z.array(z.string()).min(1, 'At least 1 photo of your resource is required'),
});

export const detailsStepSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(90, 'Title cannot exceed 90 characters'),
  category: z.string().min(1, 'Please select an academic category'),
  condition: z.string().min(1, 'Please select item condition'),
  description: z
    .string()
    .min(15, 'Description must be at least 15 characters to help buyers understand condition')
    .max(1000, 'Description cannot exceed 1000 characters'),
  brand: z.string().optional(),
  model: z.string().optional(),
  usage: z.string().optional(),
  age: z.string().optional(),
});

export const pricingStepSchema = z
  .object({
    listingType: z.enum(['buy', 'rent', 'both']),
    buyPrice: z.coerce.number().optional(),
    originalPrice: z.coerce.number().optional(),
    isNegotiable: z.boolean().optional(),
    rentPriceWeek: z.coerce.number().optional(),
    rentPriceMonth: z.coerce.number().optional(),
    rentPriceSemester: z.coerce.number().optional(),
    securityDeposit: z.coerce.number().optional(),
  })
  .refine(
    (data) => {
      if (data.listingType === 'buy' || data.listingType === 'both') {
        return data.buyPrice !== undefined && data.buyPrice > 0;
      }
      return true;
    },
    { message: 'Selling price must be greater than $0', path: ['buyPrice'] }
  )
  .refine(
    (data) => {
      if (data.listingType === 'rent' || data.listingType === 'both') {
        return (
          (data.rentPriceWeek !== undefined && data.rentPriceWeek > 0) ||
          (data.rentPriceSemester !== undefined && data.rentPriceSemester > 0)
        );
      }
      return true;
    },
    { message: 'At least one rental rate (weekly or semester) is required', path: ['rentPriceWeek'] }
  );

export const pickupStepSchema = z.object({
  campus: z.string().min(2, 'Campus name is required'),
  locationName: z.string().min(3, 'Pickup building or quad location is required'),
  timingWindow: z.string().min(3, 'Preferred pickup timing window is required'),
});

export const masterListingSchema = photoStepSchema
  .merge(detailsStepSchema)
  .merge(pricingStepSchema)
  .merge(pickupStepSchema);
