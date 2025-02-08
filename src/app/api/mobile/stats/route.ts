import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import User from '@/models/User'
import { connectToDatabase } from '@/lib/mongoose'

export async function GET() {
    const session = await getServerSession(authOptions)
    
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
 
   

  await connectToDatabase()
 

    try {
        const user = await User.findOne({ 
           $or : [{ email: session.user?.email }, { telegramId: session.user?.telegramId }]
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        

         
        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching user stats:', error)
        return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 })
    }
}