import { NextResponse } from 'next/server';
import { connectToDatabase }from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    const users = await User.find({})
      .select('username email points status createdAt lastActive')
      .sort({ createdAt: -1 });

    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      points: user.points,
      status: user.status,
      joinedAt: user.createdAt,
      lastActive: user.lastActive || user.createdAt,
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
