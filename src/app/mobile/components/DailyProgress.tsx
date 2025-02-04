"use client"

import { useProgress } from '../hooks/useProgress'

export default function DailyProgress() {
    const { progress, loading, error } = useProgress()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!progress) return null

    return (
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Daily Progress</h3>
                <span className="text-sm text-gray-400">
                    {progress.dailyLimit - progress.watchedToday} ads left today
                </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress.progressPercentage}%` }}
                >
                    <span className="absolute -top-6 right-0 text-xs text-blue-400">
                        {progress.progressPercentage}%
                    </span>
                </div>
            </div>
        </div>
    )
}
