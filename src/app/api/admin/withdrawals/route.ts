import { NextRequest, NextResponse } from 'next/server';
 
import { Withdrawal } from '@/models/withdrawal';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongoose';

// GET /api/admin/withdrawals
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const session : any = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    // Parse query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'pending';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const search = searchParams.get('search') || '';

    // Connect to database
    await connectToDatabase();
    // Build query
    const query: any = { status };
    
    // Add search functionality
    if (search) {
      query.$or = [
        { 'accountDetails.accountNumber': { $regex: search, $options: 'i' } },
        { 'accountDetails.accountName': { $regex: search, $options: 'i' } },
        { 'accountDetails.bankName': { $regex: search, $options: 'i' } },
        { 'accountDetails.walletAddress': { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await Withdrawal.countDocuments(query);

    // Fetch withdrawals with pagination and sorting
    const withdrawals = await Withdrawal.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email username')
      .populate('processedBy', 'name email')
      .lean();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      withdrawals,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error) {
    console.error('Error fetching withdrawals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch withdrawals' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/withdrawals
export async function PUT(req: NextRequest) {
  try {
    // Check admin authentication
    const session : any = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { withdrawalId, status, reason } = body;

    if (!withdrawalId || !status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Connect to database
    await  connectToDatabase();

    // Find and update withdrawal
    const withdrawal = await Withdrawal.findById(withdrawalId);
    
    if (!withdrawal) {
      return NextResponse.json(
        { error: 'Withdrawal not found' },
        { status: 404 }
      );
    }

    if (withdrawal.status !== 'pending') {
      return NextResponse.json(
        { error: 'Withdrawal has already been processed' },
        { status: 400 }
      );
    }

    // Update withdrawal status
    withdrawal.status = status;
    withdrawal.reason = reason;
    withdrawal.processedBy = session.user.id;
    withdrawal.processedAt = new Date();
    
    await withdrawal.save();

    // TODO: If status is approved, process the actual withdrawal
    // This would involve integrating with payment gateways or other services
    
    // TODO: Send notification to user about withdrawal status

    return NextResponse.json({
      message: `Withdrawal ${status} successfully`,
      withdrawal
    });

  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    );
  }
}
