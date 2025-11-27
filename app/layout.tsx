import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
// 샘플 포스트 자동 등록
import '@/lib/content/samplePosts';

// Viewport 설정 (모바일 최적화)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // 접근성을 위해 확대 허용
  userScalable: true,
  viewportFit: 'cover', // 노치 디스플레이 지원
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "이에스지요 - 탄소중립포인트 계산기",
    template: "%s | 이에스지요"
  },
  description: "올해 내가 받을 수 있는 탄소중립포인트를 3분만에 계산하세요. 텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 최대 7만원까지 받을 수 있습니다.",
  keywords: ["탄소중립포인트", "탄소중립 포인트 계산기", "환경부 포인트", "탄소 포인트 현금", "환경 앱테크", "텀블러 할인", "전기요금 절약", "대중교통 탄소 절감"],
  authors: [{ name: "이에스지요" }],
  creator: "이에스지요",
  publisher: "이에스지요",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr'),
  alternates: {
    canonical: '/',
  },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr',
      siteName: '이에스지요',
      title: '이에스지요 - 탄소중립포인트 계산기',
      description: '올해 내가 받을 수 있는 탄소중립포인트를 3분만에 계산하세요. 텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 최대 7만원까지 받을 수 있습니다.',
    },
    twitter: {
      card: 'summary_large_image',
      title: '이에스지요 - 탄소중립포인트 계산기',
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
        <head>
          {/* Pretendard 폰트 CDN */}
          <link
            rel="stylesheet"
            as="style"
            crossOrigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
          />
          {/* RSS Feed */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="이에스지요 RSS 피드"
            href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr'}/rss.xml`}
          />
          {/* 네이버 사이트 인증 */}
          <meta name="naver-site-verification" content="185f598fcbac0e203a862c1e797574d9b59a059e" />
          {/* Google 사이트 인증 */}
          <meta name="google-site-verification" content="Yh_pTZKAOioue4NeTTjAaKFaqsvYRaAvqkapNTBOy9k" />
          {/* Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736"
            crossOrigin="anonymous"
          />
        </head>
      <body
        className="antialiased"
        style={{ fontFamily: 'Pretendard, var(--font-sans), -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
