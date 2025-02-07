"use client";

import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import SessionWrapper from '@/components/NextAuthProvider';
import { Redux_Provaider } from '@/modules/Redux_Provaide';
import dynamic from 'next/dynamic';
import { isMobile, isMobileOnly, mobileModel, mobileVendor, osName ,  } from 'mobile-device-detect';
  
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
 



const LiveChatButton = dynamic(() => import('@/components/LiveChatButton'), {
    ssr: false
  });



export const WrapperProvider = ({ children }: { children: React.ReactNode; }) => {
   
   const router = useRouter();
 
 console.log(osName)

 useEffect(() => {
    if (isMobile && isMobileOnly  && (osName === 'iOS' ||   osName === 'android')) {
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