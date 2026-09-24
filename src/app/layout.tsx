import type {
  Metadata,
} from 'next';

import {
  Noto_Sans_KR,
} from 'next/font/google';

import AppShell from '@/components/layout/AppShell';
import {
  AuthProvider,
} from '@/contexts/AuthContext';

import './globals.css';

const notoSansKr =
  Noto_Sans_KR({
    subsets: ['latin'],
    weight: [
      '400',
      '500',
      '600',
      '700',
      '800',
    ],
    variable:
      '--font-noto-sans-kr',
    display: 'swap',
  });

export const metadata: Metadata = {
  title: 'SHIP',
  description:
    '프로젝트와 메이커를 발견하고 연결하는 공간',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={
          notoSansKr.className
        }
      >
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}