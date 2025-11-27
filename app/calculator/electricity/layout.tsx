import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전기요금 절약 계산기 - 연간 절약 금액 계산 | 이에스지요',
  description: '전기 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다. LED 전구 사용, 대기전력 차단 등으로 전기요금을 20-30% 절감할 수 있습니다.',
  keywords: ['전기요금 절약', '전기세 절약', '전력 절약', '에너지 절약', '전기비 절감'],
  alternates: {
    canonical: '/calculator/electricity',
  },
  openGraph: {
    title: '전기요금 절약 계산기 - 연간 절약 금액 계산',
    description: '전기 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다.',
    url: '/calculator/electricity',
  },
};

export default function ElectricityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

