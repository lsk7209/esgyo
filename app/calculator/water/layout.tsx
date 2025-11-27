import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '수도요금 절약 계산기 - 연간 절약 금액 계산 | 이에스지요',
  description: '물 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다. 물 절약으로 수도요금을 절감하고 환경을 보호할 수 있습니다.',
  keywords: ['수도요금 절약', '물 절약', '수도비 절감', '물 사용량 절감'],
  alternates: {
    canonical: '/calculator/water',
  },
  openGraph: {
    title: '수도요금 절약 계산기 - 연간 절약 금액 계산',
    description: '물 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다.',
    url: '/calculator/water',
  },
};

export default function WaterCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

