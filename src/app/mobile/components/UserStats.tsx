"use client"

import { useUserStats } from '../hooks/useUserStats';
import { Skeleton } from "antd";

export default function UserStats() {
    const { stats, loading, error } = useUserStats()

    if (loading) return  <Skeleton active />
    if (error) return <div>Error: {error}</div>
    if (!stats) return null


    return (
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">{stats.username}</h2>
                    <p className="text-sm text-gray-400">Welcome back!</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-sm text-gray-400 mb-1">Watched Ads</p>
                    <p className="text-2xl font-bold text-blue-400">{stats.watchedAds}</p>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-sm text-gray-400 mb-1">Earned Points</p>
                    <p className="text-2xl font-bold text-green-400">{stats.earnedPoints.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}
