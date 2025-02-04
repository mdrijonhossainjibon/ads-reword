"use client"

import React from 'react'
import { useWatchAd } from '../hooks/useWatchAd';

declare var window: any & {
    show_8876485?: () => Promise<void>;
};

const LoadingSkeleton = () => (
    <div className="w-full max-w-md">
        <div className="animate-pulse">
            <div className="w-full h-14 bg-gray-700 rounded-xl" />
        </div>
    </div>
)

export default function WatchAdButton() {
    const { watchAd, loading, error } = useWatchAd()
    const [isInitializing, setIsInitializing] = React.useState(true)

    React.useEffect(() => {
        if (window.show_8876485) {
            setIsInitializing(false)
            return
        }

        const tag = document.createElement('script')
        tag.src = '//whephiwums.com/vignette.min.js'
        tag.dataset.zone = '8876485'
        tag.dataset.sdk = 'show_8876485'

        tag.onload = () => setIsInitializing(false)
        document.body.appendChild(tag)
    }, [])

    const showAd = () => {
        window.show_8876485?.().then(() => {
            // add here the function that should be executed after viewing the ad
            alert('Ad watched successfully');
            watchAd()
        })
    }

    if (isInitializing) {
        return <LoadingSkeleton />
    }

    return (
        <div className="w-full max-w-md space-y-4">
            <button
                onClick={showAd}
                disabled={loading}
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-glow-blue ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {loading ? 'Loading...' : 'Watch Ad (+0.5 points)'}
            </button>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>
    )
}
