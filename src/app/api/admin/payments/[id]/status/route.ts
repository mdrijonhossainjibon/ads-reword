import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Payment from '@/models/Payment';
import User from '@/models/User';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { status } = await request.json();
    
    if (!['pending', 'completed', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const payment = await Payment.findById(params.id).populate('userId');
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // If payment is being completed, update user's points
    if (status === 'completed' && payment.status !== 'completed') {
      const user = await User.findById(payment.userId);
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Update user's points based on payment amount
      // You might want to adjust this calculation based on your business logic
      const pointsToAdd = Math.floor(payment.amount * 100); // Example: $1 = 100 points
      user.points += pointsToAdd;
      await user.save();
    }

    // Update payment status
    payment.status = status;
    payment.updatedAt = new Date();
    await payment.save();

    return NextResponse.json({
      message: 'Payment status updated successfully',
      payment: {
        id: payment._id.toString(),
        status: payment.status,
        updatedAt: payment.updatedAt,
      }
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
