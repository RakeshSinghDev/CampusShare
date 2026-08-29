const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Renter reference is required'],
      index: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller reference is required'],
      index: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: [true, 'Listing reference is required'],
      index: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'active', 'completed', 'overdue', 'cancelled'],
      default: 'upcoming',
      index: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    rentalUnit: {
      type: String,
      enum: ['day', 'week', 'month', 'semester'],
      default: 'week',
    },
    rentalPrice: {
      type: Number,
      required: [true, 'Rental price is required'],
      min: 0,
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: 0,
    },
    pickup: {
      campus: String,
      locationName: String,
      timingWindow: String,
    },
    returnDetails: {
      locationName: String,
      timingWindow: String,
      instructions: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
