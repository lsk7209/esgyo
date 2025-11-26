import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ESGyo - 탄소중립포인트 계산기",
    template: "%s | ESGyo"
  },
  description: "올해 내가 받을 수 있는 탄소중립포인트를 3분만에 계산하세요. 텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 최대 7만원까지 받을 수 있습니다.",
  keywords: ["탄소중립포인트", "탄소중립 포인트 계산기", "환경부 포인트", "탄소 포인트 현금", "환경 앱테크", "텀블러 할인", "전기요금 절약", "대중교통 탄소 절감"],
  authors: [{ name: "ESGyo" }],
  creator: "ESGyo",
  publisher: "ESGyo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.com'),
  alternates: {
    canonical: '/',
  },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.com',
      siteName: 'ESGyo',
      title: 'ESGyo - 탄소중립포인트 계산기',
      description: '올해 내가 받을 수 있는 탄소중립포인트를 3분만에 계산하세요. 텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 최대 7만원까지 받을 수 있습니다.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ESGyo - 탄소중립포인트 계산기',
      description: '올해 내가 받을 수 있는 탄소중립포인트를 3분만에 계산하세요. 텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 최대 7만원까지 받을 수 있습니다.',
    },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
