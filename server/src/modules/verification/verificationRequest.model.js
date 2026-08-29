const mongoose = require('mongoose');

const verificationRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
      index: true,
    },
    college: {
      type: String,
      required: [true, 'College / University is required'],
    },
    studentIdentifier: {
      type: String,
      trim: true,
    },
    documents: [
      {
        url: { type: String, required: true },
        type: { type: String, default: 'student_id' },
      },
    ],
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const VerificationRequest = mongoose.model(
  'VerificationRequest',
  verificationRequestSchema
);

module.exports = VerificationRequest;
