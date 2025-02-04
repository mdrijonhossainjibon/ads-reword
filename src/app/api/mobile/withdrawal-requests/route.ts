import { NextRequest, NextResponse } from 'next/server';

import { WithdrawalRequest } from '@/models/WithdrawalRequest';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongoose';

// GET /api/mobile/withdrawal-requests
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const search = searchParams.get('search') || '';
        const method = searchParams.get('method') || '';
        const status = searchParams.get('status') || 'pending';
        const itemsPerPage = 10;

        // Build query conditions
        const query: any = {};
        
        // Add status filter
        if (status !== 'all') {
            query.status = status;
        }
        
        // Add method filter
        if (method) {
            query.method = method;
        }

        // Get total count for pagination
        const total = await WithdrawalRequest.countDocuments(query);

        // Get paginated results with user populate
        const requests = await WithdrawalRequest.find(query)
            .populate('userId', 'username')
            .sort({ createdAt: -1 })
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        // If there's a search term, filter in memory (since we need to search in populated field)
        let filteredRequests = requests;
        if (search) {
            filteredRequests = requests.filter(request => 
                (request.userId as any).username.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Format the response
        const formattedRequests = filteredRequests.map(request => ({
            id: request._id.toString(),
            userId: request.userId._id.toString(),
            username: (request.userId as any).username,
            amount: request.amount,
            method: request.method,
            accountDetails: request.accountDetails,
            requestDate: request.createdAt,
            status: request.status,
            adminNote: request.adminNote
        }));

        return NextResponse.json({
            requests: formattedRequests,
            total: search ? filteredRequests.length : total
        });
    } catch (error) {
        console.error('Error fetching withdrawal requests:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT /api/mobile/withdrawal-requests/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();

        const { action, adminNote } = await request.json();
        const id = params.id;

        if (!['approve', 'reject'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action' },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid withdrawal request ID' },
                { status: 400 }
            );
        }

        const updatedRequest = await WithdrawalRequest.findByIdAndUpdate(
            id,
            {
                $set: {
                    status: action === 'approve' ? 'approved' : 'rejected',
                    adminNote: adminNote || undefined,
                    processedAt: new Date()
                }
            },
            { new: true }
        ).populate('userId', 'username');

        if (!updatedRequest) {
            return NextResponse.json(
                { error: 'Withdrawal request not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: updatedRequest._id.toString(),
            userId: updatedRequest.userId._id.toString(),
            username: (updatedRequest.userId as any).username,
            amount: updatedRequest.amount,
            method: updatedRequest.method,
            accountDetails: updatedRequest.accountDetails,
            requestDate: updatedRequest.createdAt,
            status: updatedRequest.status,
            adminNote: updatedRequest.adminNote
        });
    } catch (error) {
        console.error('Error processing withdrawal request:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
