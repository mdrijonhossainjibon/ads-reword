import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
 

export async function GET() {
    const session = await getServerSession(authOptions)
    
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // TODO: Get actual tasks from database
        const tasks = [
            {
                id: 1,
                title: 'Watch 10 ads',
                progress: 5,
                total: 10,
                reward: 5.00
            },
            {
                id: 2,
                title: 'Complete daily login',
                progress: 1,
                total: 1,
                reward: 1.00,
                completed: true
            }
        ]

        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
    }
}
