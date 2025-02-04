import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
 
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { Withdrawal } from '@/models/withdrawal';
 

export async function POST(req: Request) {
    try {
        const session : any = await getServerSession(authOptions);

        console.log('Session:', session);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await req.json();
        const { amount, paymentMethod, paymentDetails } = body;

        // Validate amount
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount < 50) {
            return NextResponse.json(
                { error: 'Invalid withdrawal amount. Minimum withdrawal is 50 points.' },
                { status: 400 }
            );
        }

        // Get user and check balance using Google ID
        const user = await User.findOne({ email: session.user.email});
        console.log('User:', user);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.points < withdrawAmount) {
            return NextResponse.json(
                { error: 'Insufficient balance for withdrawal' },
                { status: 400 }
            );
        }

        // Create withdrawal record
        const withdrawal = new Withdrawal({
            userId: user._id, 
            amount: withdrawAmount,
            paymentMethod,
            accountDetails: {
                accountNumber: paymentDetails
            }
        });

        // Save withdrawal and update user balance
        await withdrawal.save();
        user.points -= withdrawAmount;
        await user.save();

        return NextResponse.json({
            message: 'Withdrawal request submitted successfully',
            withdrawal: {
                id: withdrawal._id,
                amount: withdrawal.amount,
                status: withdrawal.status
            }
        });

    } catch (error) {
        console.error('Withdrawal error:', error);
        return NextResponse.json(
            { error: 'Failed to process withdrawal request' },
            { status: 500 }
        );
    }
}