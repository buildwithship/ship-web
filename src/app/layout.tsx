import type { Metadata } from 'next';

import { Noto_Sans_KR } from 'next/font/google';

import AppShell from '@/components/layout/AppShell';

import './globals.css';

const notoSansKr = Noto_Sans_KR({
  weight: [
    '400',
    '500',
    '600',
    '700',
    '800',
  ],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SHIP',
  description:
    '만든 프로젝트를 보여주고, 새로운 사람과 연결되는 메이커 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.variable}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}