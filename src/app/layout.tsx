import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { BreakpointIndicator } from '@/components/provider/BreakPoints';
import AppTheme from '@/components/provider/AppTheme';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  preload: false, // Page initial render event fast ga aye process lo console warning rakunda chestadhi
});
const bebasNeue = Bebas_Neue({
  weight: '400', // Bebas Neue comes in 400 weight standard
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SphereLine',
  description: 'Devloped by sphereline solutions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        'font-sans',
        inter.variable,
        bebasNeue.variable,
      )}
    >
      <body className="relative flex min-h-full flex-col">
        <AppTheme>{children}</AppTheme>
        <BreakpointIndicator />
      </body>
    </html>
  );
}
