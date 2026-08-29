const mongoose = require('mongoose');

const listingImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    isPrimary: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const rentalPricingSchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      enum: ['day', 'week', 'month', 'semester'],
      default: 'week',
    },
    price: { type: Number, min: 0 },
    securityDeposit: { type: Number, min: 0, default: 0 },
    minimumDuration: { type: Number, default: 1 },
    maximumDuration: { type: Number },
  },
  { _id: false }
);

const listingSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller reference is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Listing title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [15, 'Description must be at least 15 characters'],
    },
    images: {
      type: [listingImageSchema],
      validate: [
        (val) => val.length > 0,
        'At least one listing image is required',
      ],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
      index: true,
    },
    condition: {
      type: String,
      enum: ['new', 'like_new', 'good', 'fair'],
      required: [true, 'Item condition is required'],
    },
    listingType: {
      type: String,
      enum: ['sale', 'rent', 'sale_and_rent'],
      required: [true, 'Listing type is required'],
    },
    salePrice: {
      type: Number,
      min: [0, 'Sale price cannot be negative'],
    },
    rentalPricing: {
      type: rentalPricingSchema,
    },
    brand: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    purchaseYear: {
      type: String,
    },
    usage: {
      type: String,
    },
    campus: {
      type: String,
      required: [true, 'Campus location is required'],
      trim: true,
      index: true,
    },
    pickupLocation: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true,
    },
    pickupAvailability: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'paused', 'sold', 'rented', 'unavailable', 'deleted'],
      default: 'active',
      index: true,
    },
    isNegotiable: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    wishlistCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// MongoDB Text Search Index
listingSchema.index(
  {
    title: 'text',
    description: 'text',
    brand: 'text',
    model: 'text',
    campus: 'text',
  },
  {
    weights: {
      title: 10,
      brand: 5,
      model: 5,
      campus: 3,
      description: 1,
    },
    name: 'listing_text_search',
  }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
