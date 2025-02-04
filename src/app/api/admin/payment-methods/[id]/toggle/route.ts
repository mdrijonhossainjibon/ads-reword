import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import PaymentMethod from '@/models/PaymentMethod';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { isEnabled } = await request.json();
    
    if (typeof isEnabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid isEnabled value' },
        { status: 400 }
      );
    }

    const method = await PaymentMethod.findByIdAndUpdate(
      params.id,
      { isEnabled },
      { new: true }
    );

    if (!method) {
      return NextResponse.json(
        { error: 'Payment method not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Payment method toggled successfully',
      method: {
        id: method._id.toString(),
        isEnabled: method.isEnabled,
      }
    });
  } catch (error) {
    console.error('Error toggling payment method:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
