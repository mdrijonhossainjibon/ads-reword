import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Payment from '@/models/Payment';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    const payments = await Payment.find({})
      .sort({ createdAt: -1 })
      .populate('userId', 'username');

    const formattedPayments = payments.map(payment => ({
      id: payment._id.toString(),
      userId: payment.userId._id.toString(),
      username: payment.userId.username,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      details: {
        accountInfo: payment.details?.accountInfo,
        transactionId: payment.details?.transactionId,
        notes: payment.details?.notes,
      },
    }));

    return NextResponse.json(formattedPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
