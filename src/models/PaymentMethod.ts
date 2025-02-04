import mongoose from 'mongoose';

const PaymentMethodSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['bank', 'crypto', 'paypal'],
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  isEnabled: {
    type: Boolean,
    default: true
  },
  minAmount: {
    type: Number,
    required: true,
    min: 0
  },
  maxAmount: {
    type: Number,
    required: true,
    min: 0
  },
  processingTime: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true,
    min: 0
  },
  feeType: {
    type: String,
    enum: ['fixed', 'percentage'],
    required: true
  },
  requiredFields: [{
    name: String,
    label: String,
    type: String,
    required: Boolean,
    placeholder: String
  }],
  instructions: String,
  accountDetails: {
    type: Map,
    of: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
PaymentMethodSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.PaymentMethod || mongoose.model('PaymentMethod', PaymentMethodSchema);
