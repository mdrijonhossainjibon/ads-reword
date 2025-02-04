import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
 
import { Activity } from '@/models/Activity';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    // Get total users
    const totalUsers = await User.countDocuments();

    // Get total points
    const usersWithPoints = await User.aggregate([
      {
        $group: {
          _id: null,
          totalPoints: { $sum: '$points' }
        }
      }
    ]);
    const totalPoints = usersWithPoints[0]?.totalPoints || 0;

    // Get pending withdrawals count
    const pendingWithdrawals = await User.countDocuments({
      'withdrawalRequests.status': 'pending'
    });

    // Get today's active users
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeUsers = await Activity.distinct('user', {
      createdAt: { $gte: today }
    }).countDocuments();

    return NextResponse.json({
      totalUsers,
      totalPoints,
      pendingWithdrawals,
      activeUsers
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
