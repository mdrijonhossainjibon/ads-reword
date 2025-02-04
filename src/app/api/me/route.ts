import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
 
import User from '@/models/User';
 
import { connectToDatabase } from '@/lib/mongoose';
import { authOptions } from '@/lib/auth';
 

export async function GET(req: NextRequest) {
  try {
    const session : any = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: { message: 'Unauthorized', status: 401, code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }

    await  connectToDatabase();

    const user = await User.findOne({ email: session.user.email })
      .select('-password') // Exclude password field
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: 'User not found', status: 404, code: 'NOT_FOUND' } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data:  user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          message: 'Internal server error', 
          status: 500, 
          code: 'INTERNAL_SERVER_ERROR' 
        } 
      },
      { status: 500 }
    );
  }
}
