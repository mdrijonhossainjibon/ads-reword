"use client";

import Script from 'next/script';
import Header from './components/Header'
import BottomNavigation from './components/BottomNavigation'
import UserStats from './components/UserStats'
import DailyProgress from './components/DailyProgress'
import TaskOverview from './components/TaskOverview'
import WatchAdButton from './components/WatchAdButton'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { useTelegramUser } from '@/hooks/useTelegramUser';
import { useSession } from 'next-auth/react';

export default function MobilePage() {
    const router = useRouter();
    const user = useTelegramUser();
    const {  status } = useSession();

     if(status === 'unauthenticated') {
         router.push('/mobile/telegram_access');
     }


    useEffect(() => {
        // Only redirect if we're not in Telegram WebApp context
        if (!window.Telegram?.WebApp) {
            router.push('/mobile/telegram');
        }
    }, [router , /* window.Telegram?.WebApp */ ]);

 
     
    return (
        <>
           
            <div className="m-0 p-0 bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen">
                <Header />

                <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
                    {user.isLoaded && (
                        <>
                            <UserStats />
                            <DailyProgress />
                            <TaskOverview />
                            <WatchAdButton />
                        </>
                    )}
                </div>

                <BottomNavigation />
            </div>
        </>
    );
}