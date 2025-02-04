import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { Withdrawal } from '@/models/withdrawal';
 

export async function GET() {
  try {
    await connectToDatabase();

    // Get total users count
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Get active users (users who logged in within the last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const activeUsers = await User.countDocuments({
      role: 'user',
      lastLoginAt: { $gte: oneDayAgo },
    });

    // Get withdrawal stats
    const totalWithdrawals = await Withdrawal.countDocuments();
    const pendingWithdrawals = await Withdrawal.countDocuments({ status: 'pending' });

    return NextResponse.json({
      totalUsers,
      activeUsers,
      totalWithdrawals,
      pendingWithdrawals,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
