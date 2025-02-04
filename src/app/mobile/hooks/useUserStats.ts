'use client'

import { useState, useEffect } from 'react'

interface UserStats {
    username: string
    watchedAds: number
    earnedPoints: number
}

export function useUserStats() {
    const [stats, setStats] = useState<UserStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('/api/mobile/stats')
                if (!response.ok) throw new Error('Failed to fetch stats')
                const data = await response.json()
                setStats(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch stats')
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    return { stats, loading, error }
}
