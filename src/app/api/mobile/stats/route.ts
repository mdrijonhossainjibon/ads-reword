import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
 

export async function GET() {
    const session = await getServerSession(authOptions)
    
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // TODO: Get actual user stats from database
        const userStats = {
            username: session.user?.name || 'User',
            watchedAds: 150,
            earnedPoints: 75.00
        }

        return NextResponse.json(userStats)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 })
    }
}
