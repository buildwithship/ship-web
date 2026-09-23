import type { Metadata } from 'next';

import Header from '@/components/layout/Header';

import './globals.css';

export const metadata: Metadata = {
  title: 'SHIP',
  description:
    '프로젝트를 발견하고, 만든 사람과 연결되는 메이커 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}