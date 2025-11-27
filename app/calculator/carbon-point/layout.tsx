import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '탄소중립포인트 계산기 - 올해 내가 받을 수 있는 금액은? | 이에스지요',
  description: '탄소중립포인트 계산기로 올해 내가 받을 수 있는 포인트와 현금화 금액을 3분만에 계산하세요. 텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 최대 7만원까지 받을 수 있습니다.',
  keywords: ['탄소중립포인트', '탄소중립 포인트 계산기', '환경부 포인트', '탄소 포인트 현금', '환경 앱테크', '텀블러 할인', '전기요금 절약', '대중교통 탄소 절감'],
  alternates: {
    canonical: '/calculator/carbon-point',
  },
  openGraph: {
    title: '탄소중립포인트 계산기 - 올해 내가 받을 수 있는 금액은?',
    description: '탄소중립포인트 계산기로 올해 내가 받을 수 있는 포인트와 현금화 금액을 3분만에 계산하세요.',
    url: '/calculator/carbon-point',
  },
};

export default function CarbonPointCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

