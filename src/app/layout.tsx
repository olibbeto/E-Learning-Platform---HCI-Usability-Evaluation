import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'LearnEase — Learn smarter. Navigate easier.',
  description: 'A simpler e-learning experience designed around the way students actually learn.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <ToastProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
