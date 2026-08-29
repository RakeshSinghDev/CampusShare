const { z } = require('zod');
const { LISTING_TYPES, LISTING_STATUS, ITEM_CONDITIONS, RENTAL_UNITS } = require('../constants/enums');

// Helper to validate image URLs safely (supporting http, https, blob, and relative /uploads/ paths)
const safeUrlSchema = z.string().refine((url) => {
  if (!url || typeof url !== 'string') return false;
  const lower = url.toLowerCase().trim();
  if (lower.startsWith('javascript:') || lower.startsWith('data:')) return false;
  return lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('blob:') || lower.startsWith('/');
}, { message: 'Must be a valid image URL' });

const listingImageSchema = z.object({
  url: safeUrlSchema,
  publicId: z.string().optional().default(''),
  isPrimary: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
});

const rentalPricingSchema = z.object({
  unit: z.enum([RENTAL_UNITS.DAY, RENTAL_UNITS.WEEK, RENTAL_UNITS.MONTH, RENTAL_UNITS.SEMESTER]).default(RENTAL_UNITS.WEEK),
  price: z.coerce.number().min(0, 'Rental price must be non-negative'),
  securityDeposit: z.coerce.number().min(0).optional().default(0),
  minimumDuration: z.coerce.number().min(1).optional().default(1),
  maximumDuration: z.coerce.number().optional(),
});

const baseListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(120, 'Title cannot exceed 120 characters'),
  description: z.string().min(15, 'Description must be at least 15 characters').max(2000, 'Description too long'),
  category: z.string().min(1, 'Category reference is required'),
  condition: z.enum([ITEM_CONDITIONS.NEW, ITEM_CONDITIONS.LIKE_NEW, ITEM_CONDITIONS.GOOD, ITEM_CONDITIONS.FAIR]),
  listingType: z.enum([LISTING_TYPES.SALE, LISTING_TYPES.RENT, LISTING_TYPES.SALE_AND_RENT]),
  salePrice: z.coerce.number().min(0, 'Sale price cannot be negative').optional(),
  rentalPricing: rentalPricingSchema.optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  purchaseYear: z.string().optional(),
  usage: z.string().optional(),
  campus: z.string().min(2, 'Campus is required'),
  pickupLocation: z.string().min(2, 'Pickup location is required'),
  pickupAvailability: z.string().optional(),
  isNegotiable: z.boolean().optional().default(false),
  images: z.array(listingImageSchema).min(1, 'At least one image is required').max(10, 'Maximum 10 images allowed'),
});

const createListingSchema = baseListingSchema.superRefine((data, ctx) => {
  if (data.listingType === LISTING_TYPES.SALE || data.listingType === LISTING_TYPES.SALE_AND_RENT) {
    if (data.salePrice === undefined || data.salePrice === null || Number.isNaN(data.salePrice)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Sale price is required for sale listings',
        path: ['salePrice'],
      });
    }
  }
  if (data.listingType === LISTING_TYPES.RENT || data.listingType === LISTING_TYPES.SALE_AND_RENT) {
    if (!data.rentalPricing || data.rentalPricing.price === undefined || Number.isNaN(data.rentalPricing.price)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Rental price is required for rental listings',
        path: ['rentalPricing', 'price'],
      });
    }
  }
});

const updateListingSchema = baseListingSchema.partial();

const updateStatusSchema = z.object({
  status: z.enum([LISTING_STATUS.ACTIVE, LISTING_STATUS.PAUSED, LISTING_STATUS.SOLD, LISTING_STATUS.RENTED, LISTING_STATUS.UNAVAILABLE, LISTING_STATUS.DELETED]),
});

const queryListingsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
  search: z.string().optional(),
  category: z.string().optional(),
  condition: z.enum([ITEM_CONDITIONS.NEW, ITEM_CONDITIONS.LIKE_NEW, ITEM_CONDITIONS.GOOD, ITEM_CONDITIONS.FAIR]).optional(),
  listingType: z.enum([LISTING_TYPES.SALE, LISTING_TYPES.RENT, LISTING_TYPES.SALE_AND_RENT]).optional(),
  campus: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  status: z.enum([LISTING_STATUS.ACTIVE, LISTING_STATUS.PAUSED, LISTING_STATUS.SOLD, LISTING_STATUS.RENTED, LISTING_STATUS.DRAFT, LISTING_STATUS.DELETED]).default(LISTING_STATUS.ACTIVE),
  sort: z.enum(['newest', 'oldest', 'price_low_to_high', 'price_high_to_low', 'popular']).default('newest'),
});

module.exports = {
  createListingSchema,
  updateListingSchema,
  updateStatusSchema,
  queryListingsSchema,
};
