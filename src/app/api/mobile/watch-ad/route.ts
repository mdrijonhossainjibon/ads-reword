import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
 
import User from '@/models/User'
import { connectToDatabase } from '@/lib/mongoose'
import SystemSetting from '@/models/SystemSetting'
import { authOptions } from '@/lib/auth'

export async function POST() {
    const session : any = await getServerSession(authOptions)
    
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await connectToDatabase()

        // Get user and settings
        const user = await User.findOne({ email: session.user?.email })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Check daily limit
        if (user.watchedAds >= user.dailyLimit) {
            return NextResponse.json({ 
                error: 'Daily ad limit reached', 
                watchedAds: user.watchedAds,
                dailyLimit: user.dailyLimit 
            }, { status: 429 })
        }

        // Get points per ad from system settings
        const pointsSetting = await SystemSetting.findOne({ 
            key: 'points_per_ad',
            category: 'points'
        })
        const pointsPerAd = pointsSetting?.value || 0.5 // Default to 0.5 if not set

        // Update user stats
        user.watchedAds += 1
        user.earnedPoints += pointsPerAd
        user.points += pointsPerAd

        // Check and update tasks
        const watchAdTasks = user.tasks.filter((task : any )=> 
            task.type === 'watchAds' && !task.completed
        )

        for (const task of watchAdTasks) {
            task.progress += 1
            if (task.progress >= task.totalRequired) {
                task.completed = true
                task.completedAt = new Date()
                user.points += task.reward // Add bonus points for completing task
            }
        }

        // Check daily target task
        const dailyTargetTask = user.tasks.find((task : any)=> 
            task.type === 'dailyTarget' && 
            !task.completed && 
            user.watchedAds >= user.dailyLimit
        )

        if (dailyTargetTask) {
            dailyTargetTask.completed = true
            dailyTargetTask.completedAt = new Date()
            user.points += dailyTargetTask.reward
        }

        await user.save()

        return NextResponse.json({
            success: true,
            pointsEarned: pointsPerAd,
            newTotal: user.points,
            watchedAds: user.watchedAds,
            dailyLimit: user.dailyLimit,
            message: 'Successfully watched ad'
        })
    } catch (error) {
        console.error('Error processing ad watch:', error)
        return NextResponse.json({ error: 'Failed to process ad watch' }, { status: 500 })
    }
}
