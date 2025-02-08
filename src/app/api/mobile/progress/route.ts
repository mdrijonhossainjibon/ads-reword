import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
 
import { Activity } from '@/models/Activity'
import SystemSetting from '@/models/SystemSetting'
import { connectToDatabase } from '@/lib/mongoose'
import User from '@/models/User'
import { authOptions } from '@/lib/auth'

export async function GET() {
    const session : any= await getServerSession(authOptions)
    
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await connectToDatabase()

        // Find the user by their Google ID
        const user = await User.findOne({ _id : session.user?.id })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Get daily limit from system settings
        const dailyLimitSetting = await SystemSetting.findOne({ key: 'daily_ads_limit', category: 'ads' })
        const dailyLimit = dailyLimitSetting?.value || 200 // Default to 200 if not set

        // Get today's start and end
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        // Count today's activities for the user using MongoDB _id
        const watchedToday = await Activity.countDocuments({
            user: user._id, // Use MongoDB _id instead of Google ID
            action: 'watch_ad',
            createdAt: {
                $gte: today,
                $lt: tomorrow
            }
        })

        // Calculate progress percentage
        const progressPercentage = Math.min(Math.round((watchedToday / dailyLimit) * 100), 100)

        return NextResponse.json({
            dailyLimit,
            watchedToday,
            progressPercentage
        })
    } catch (error) {
        console.error('Error fetching progress:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
