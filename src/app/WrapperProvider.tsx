"use client";

import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import SessionWrapper from '@/components/NextAuthProvider';
import { Redux_Provaider } from '@/modules/Redux_Provaide';
import dynamic from 'next/dynamic';
import { isMobile } from 'mobile-device-detect';
 
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
 



const LiveChatButton = dynamic(() => import('@/components/LiveChatButton'), {
    ssr: false
  });



export const WrapperProvider = ({ children }: { children: React.ReactNode; }) => {
   
   const router = useRouter();
 
 

 useEffect(() => {
    if (isMobile) {
      router.push('/mobile');
    }
  }, [   isMobile  , router ]);

    return (
        <Redux_Provaider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <SessionWrapper>
            
            { children }
            
          { isMobile ? null : <LiveChatButton /> }
          </SessionWrapper>
        </ThemeProvider>
      </Redux_Provaider>
    )
}