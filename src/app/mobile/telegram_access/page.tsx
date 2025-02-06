"use client";


import { useTelegramUser } from '@/hooks/useTelegramUser';
import { QRCode } from 'antd';
import { signIn  } from 'next-auth/react';
import { useRouter } from 'next/navigation';



export default function TelegramAccessPage() {
  const telegramBotUrl = 'https://t.me/your_bot_username'; // Replace with your actual Telegram bot URL
  const router = useRouter();

  const { id, username, firstName, lastName, isLoaded } = useTelegramUser();


  const handleSignIn =  async  () => {
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/mobile',
      first_name : firstName,
      userId:  id ,
      last_name: lastName,
      username 
    });
 
     console.log(result);

     if (result?.ok) {
      router.push(result?.url as any );
     }
  }



  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-glow">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.73-1.18 3.3-1.39 3.67-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
                </svg>
              </span>
              <span className="text-lg font-bold text-blue-500">Access Telegram</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
        <div className="w-full max-w-md space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Join Our Telegram Community</h2>
            <div className="bg-white p-4 rounded-xl mb-4">
              <QRCode
                value={telegramBotUrl}
                size={200}
                level="H"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <a
                href={telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors w-full"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.73-1.18 3.3-1.39 3.67-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
                </svg>
                Join Telegram Channel
              </a>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl w-full"

                onClick={handleSignIn}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Connect Telegram Account
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Benefits of Connecting</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-200">Instant Notifications</h4>
                  <p className="text-sm text-gray-400">Get real-time updates about your earnings and tasks</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-200">Exclusive Content</h4>
                  <p className="text-sm text-gray-400">Access special offers and premium content</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-200">Community Support</h4>
                  <p className="text-sm text-gray-400">Join our active community and get help when needed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
