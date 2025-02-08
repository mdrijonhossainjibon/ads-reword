 "use client";

import LoadingSpinner from "@/app/mobile/components/LoadingSpinner";
import { isMobileOnly } from "mobile-device-detect";
import dynamic from "next/dynamic";

const TelegramAccessPage = dynamic(() => import("./tg"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const AuthLoginPage = dynamic(() => import("./original"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export default function AuthPage() {
 
  return isMobileOnly ? <TelegramAccessPage /> : <AuthLoginPage />;
}