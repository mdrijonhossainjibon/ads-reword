interface NavbarProps {
    userName: string;
}

export default function Navbar({ userName }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
            <div className="px-4 py-4">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-glow">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span className="text-lg font-bold text-yellow-500">Withdraw</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2">
                            <span className="text-sm font-medium text-gray-200">{userName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
