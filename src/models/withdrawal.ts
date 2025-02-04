import mongoose, { Schema, Document } from 'mongoose';

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentMethod: string;
  accountDetails: {
    accountNumber?: string;
    accountName?: string;
    bankName?: string;
    walletAddress?: string;
  };
  reason?: string;
  processedBy?: mongoose.Types.ObjectId;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const withdrawalSchema = new Schema<IWithdrawal>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  accountDetails: {
    accountNumber: String,
    accountName: String,
    bankName: String,
    walletAddress: String
  },
  reason: String,
  processedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  processedAt: Date
}, {
  timestamps: true
});

// Create indexes for better query performance
withdrawalSchema.index({ status: 1, createdAt: -1 });
withdrawalSchema.index({ userId: 1, status: 1 });

export const Withdrawal = mongoose.models.Withdrawal || mongoose.model<IWithdrawal>('Withdrawal', withdrawalSchema);
