"use client"

import { signOut } from "next-auth/react"
import { useTelegramUser } from "@/hooks/useTelegramUser"

export default function Header() {
    const telegramUser = useTelegramUser();
    
    const Handel = () => {
        signOut({ callbackUrl: '/auth/login'})
    }
    
    return (
        <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
            <div className="px-4 py-4">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-glow">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                        </span>
                        <span className="text-lg font-bold text-blue-500">Home</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2">
                            <span id="header-user-name" className="text-sm font-medium text-gray-200">
                                {telegramUser.username || telegramUser.firstName || 'User'}
                            </span>
                        </div>
                        <button 
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-xl p-2 transition-colors"
                            onClick={Handel}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
