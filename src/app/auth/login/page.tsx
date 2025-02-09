 "use client";

import LoadingSpinner from "@/app/mobile/components/LoadingSpinner";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import { isMobileOnly } from "mobile-device-detect";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const TelegramAccessPage = dynamic(() => import("./tg"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const AuthLoginPage = dynamic(() => import("./original"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export default function AuthPage() {

  const {   isLoaded } = useTelegramUser();

  const {  data : session, status } = useSession();
 
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || '';
  const router = useRouter();

 
  useEffect(() =>{
    if(status === 'authenticated') {
        if(isMobileOnly){
          return router.push(callbackUrl || '/mobile');
        }
        return router.push(callbackUrl || '/');
    }
 } ,[ callbackUrl  , router , status ])

 
  return isMobileOnly &&  isLoaded ? <TelegramAccessPage /> : <AuthLoginPage />;
}