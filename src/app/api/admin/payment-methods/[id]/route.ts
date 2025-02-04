import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import PaymentMethod from '@/models/PaymentMethod';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.minAmount || !data.maxAmount || !data.processingTime || !data.fee || !data.feeType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const method = await PaymentMethod.findByIdAndUpdate(
      params.id,
      {
        name: data.name,
        description: data.description,
        minAmount: data.minAmount,
        maxAmount: data.maxAmount,
        processingTime: data.processingTime,
        fee: data.fee,
        feeType: data.feeType,
        requiredFields: data.requiredFields,
        instructions: data.instructions,
        accountDetails: new Map(Object.entries(data.accountDetails || {})),
      },
      { new: true }
    );

    if (!method) {
      return NextResponse.json(
        { error: 'Payment method not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Payment method updated successfully',
      method: {
        id: method._id.toString(),
        name: method.name,
      }
    });
  } catch (error) {
    console.error('Error updating payment method:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const method = await PaymentMethod.findByIdAndDelete(params.id);
    
    if (!method) {
      return NextResponse.json(
        { error: 'Payment method not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Payment method deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting payment method:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
