'use client'

import { useState, useEffect } from 'react'

interface Task {
    id: number
    title: string
    progress: number
    total: number
    reward: number
    completed?: boolean
}

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch('/api/mobile/tasks')
                if (!response.ok) throw new Error('Failed to fetch tasks')
                const data = await response.json()
                setTasks(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    return { tasks, loading, error }
}
