import mongoose from 'mongoose';

const SystemSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'points', 'payments', 'notifications', 'security', 'telegram', 'ads', 'system'],
  },
  label: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    required: true,
    enum: ['string', 'number', 'boolean', 'json'],
  },
  validation: {
    min: Number,
    max: Number,
    pattern: String,
    options: [mongoose.Schema.Types.Mixed],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Update timestamp on save
SystemSettingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.SystemSetting || mongoose.model('SystemSetting', SystemSettingSchema);
