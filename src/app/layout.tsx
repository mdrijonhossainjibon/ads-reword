import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import dynamic from 'next/dynamic';
import { WrapperProvider } from './WrapperProvider';


const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Ad Reward System',
  description: 'Earn rewards by completing ad-related tasks',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        < WrapperProvider>
          <main className="pt-16">
            {children}
          </main>
        </WrapperProvider>

      </body>
    </html>
  );
}
