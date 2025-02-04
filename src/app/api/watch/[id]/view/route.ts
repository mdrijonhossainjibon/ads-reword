import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
 


 

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Here you would typically:
    // 1. Check if the user has already viewed this video recently
    // 2. Update the view count in the database
    // 3. Record the view in a views table with timestamp and user info
    
    return NextResponse.json({
      success: true,
      message: 'View counted successfully'
    });
  } catch (error) {
    console.error('Error counting view:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to count view' },
      { status: 500 }
    );
  }
}



export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'View counted successfully'
    });
  } catch (error) {
    console.error('Error counting view:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to count view' },
      { status: 500 }
    );
  }
}