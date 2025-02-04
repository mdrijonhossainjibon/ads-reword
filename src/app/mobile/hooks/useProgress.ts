'use client'

import { useState, useEffect } from 'react'

interface Progress {
    dailyLimit: number
    watchedToday: number
    progressPercentage: number
}

export function useProgress() {
    const [progress, setProgress] = useState<Progress | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProgress() {
            try {
                const response = await fetch('/api/mobile/progress')
                if (!response.ok) throw new Error('Failed to fetch progress')
                const data = await response.json()
                setProgress(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch progress')
            } finally {
                setLoading(false)
            }
        }

        fetchProgress()
    }, [])

    return { progress, loading, error }
}
