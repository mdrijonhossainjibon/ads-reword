"use client"

import { useSession } from "next-auth/react";

export default function Header() {

    const {  status } = useSession();
 

    return (
        <nav className={"md:hidden  fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg" + (status === "authenticated" ? "" : "hidden")}>
            <div className="px-4 py-4">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-glow">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </span>
                        <span className="text-lg font-bold text-blue-500">Home</span>
                    </div>

                </div>
            </div>
        </nav>
    )
}
