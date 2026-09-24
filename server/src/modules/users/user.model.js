const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Campus email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: function () {
        return this.authProvider === 'local';
      },
      select: false,
    },
    googleId: {
      type: String,
      sparse: true,
      index: true,
    },
    samlId: {
      type: String,
      sparse: true,
      index: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google', 'saml'],
      default: 'local',
    },
    avatar: {
      type: String,
      default: '',
    },
    college: {
      type: String,
      required: [true, 'College / University is required'],
      trim: true,
      default: 'Kurukshetra University',
    },
    course: {
      type: String,
      trim: true,
      default: 'General Studies',
    },
    branch: {
      type: String,
      trim: true,
    },
    academicYear: {
      type: String,
      trim: true,
    },
    campus: {
      type: String,
      required: [true, 'Campus location is required'],
      trim: true,
      default: 'Main Campus',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationTokenExpires: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Method to compare entered password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.passwordHash) return false;
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static helper to hash passwords
userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Transform JSON output to remove sensitive fields
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    delete ret.verificationToken;
    delete ret.resetPasswordToken;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
