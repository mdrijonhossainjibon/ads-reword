import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import PaymentMethod from '@/models/PaymentMethod';

export async function GET() {
  try {
    await connectToDatabase();
    
    const methods = await PaymentMethod.find({})
      .sort({ type: 1 });

    const formattedMethods = methods.map(method => ({
      id: method._id.toString(),
      type: method.type,
      name: method.name,
      description: method.description,
      isEnabled: method.isEnabled,
      minAmount: method.minAmount,
      maxAmount: method.maxAmount,
      processingTime: method.processingTime,
      fee: method.fee,
      feeType: method.feeType,
      requiredFields: method.requiredFields,
      instructions: method.instructions,
      accountDetails: Object.fromEntries(method.accountDetails || new Map()),
    }));

    return NextResponse.json(formattedMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.type || !data.name || !data.minAmount || !data.maxAmount || !data.processingTime || !data.fee || !data.feeType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new payment method
    const method = new PaymentMethod(data);
    await method.save();

    return NextResponse.json({
      message: 'Payment method created successfully',
      method: {
        id: method._id.toString(),
        type: method.type,
        name: method.name,
      }
    });
  } catch (error) {
    console.error('Error creating payment method:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
