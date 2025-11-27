import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '친환경 쇼핑 포인트 계산기 - 포인트와 할인 혜택 계산 | 이에스지요',
  description: '친환경 제품 구매로 받을 수 있는 포인트와 할인 혜택을 계산합니다. 친환경 제품 구매로 포인트를 받고 환경을 보호할 수 있습니다.',
  keywords: ['친환경 쇼핑', '그린 포인트', '환경 제품', '친환경 구매'],
  alternates: {
    canonical: '/calculator/shopping',
  },
  openGraph: {
    title: '친환경 쇼핑 포인트 계산기 - 포인트와 할인 혜택 계산',
    description: '친환경 제품 구매로 받을 수 있는 포인트와 할인 혜택을 계산합니다.',
    url: '/calculator/shopping',
  },
};

export default function ShoppingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

