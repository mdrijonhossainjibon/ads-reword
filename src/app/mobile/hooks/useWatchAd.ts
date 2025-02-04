'use client'

import { useState } from 'react'

interface WatchAdResult {
    success: boolean
    pointsEarned: number
    newTotal: number
    message: string
}

export function useWatchAd() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const watchAd = async (): Promise<WatchAdResult | null> => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/mobile/watch-ad', {
                method: 'POST',
            })
            if (!response.ok) throw new Error('Failed to process ad watch')
            const data = await response.json()
            return data
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to watch ad')
            return null
        } finally {
            setLoading(false)
        }
    }

    return { watchAd, loading, error }
}
