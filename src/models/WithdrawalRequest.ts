import mongoose from 'mongoose';

const withdrawalRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ['binance', 'bkash', 'nagad', 'xrocket']
    },
    accountDetails: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adminNote: String,
    processedAt: Date
}, {
    timestamps: true
});

// Add indexes for better query performance
withdrawalRequestSchema.index({ userId: 1 });
withdrawalRequestSchema.index({ status: 1 });
withdrawalRequestSchema.index({ createdAt: -1 });

export const WithdrawalRequest = mongoose.models.WithdrawalRequest || 
    mongoose.model('WithdrawalRequest', withdrawalRequestSchema);
