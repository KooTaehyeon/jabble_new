import type { Metadata } from 'next';

import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { ReactQueryProvider } from '@/components/ReactQueryProvider';
import HeaderBanner from '@/components/HeaderBanner';
import { OverlayProvider } from '@/hook/useOverlay/OverlayProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <ReactQueryProvider>
          <OverlayProvider>
            <HeaderBanner />
            <Header />
            {children}
            <Footer />
          </OverlayProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
