import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그 - 친환경 라이프스타일 가이드 | 이에스지요',
  description: '탄소중립포인트, 절약 팁, 환경 정보 등 유용한 콘텐츠를 만나보세요. 최신 트렌드와 실천 사례를 통해 지속가능한 삶을 위한 영감을 얻으세요.',
  keywords: ['친환경 블로그', '탄소중립 블로그', '환경 정보', '절약 정보', '라이프스타일 블로그'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: '블로그 - 친환경 라이프스타일 가이드',
    description: '탄소중립포인트, 절약 팁, 환경 정보 등 유용한 콘텐츠를 만나보세요.',
    url: '/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

