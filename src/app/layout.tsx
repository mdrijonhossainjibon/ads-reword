import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import SessionWrapper from '@/components/NextAuthProvider';
import { Redux_Provaider } from '@/modules/Redux_Provaide';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

const LiveChatButton = dynamic(() => import('@/components/LiveChatButton'), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Ad Reward System',
  description: 'Earn rewards by completing ad-related tasks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Redux_Provaider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <SessionWrapper>
              <main className="pt-16">
                {children}
              </main>
              <LiveChatButton />
            </SessionWrapper>
          </ThemeProvider>
        </Redux_Provaider>
      </body>
    </html>
  );
}
