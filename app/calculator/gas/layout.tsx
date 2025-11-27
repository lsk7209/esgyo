import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '가스요금 절약 계산기 - 연간 절약 금액 계산 | 이에스지요',
  description: '가스 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다. 보일러 온도 조절, 단열 개선 등으로 가스요금을 절감할 수 있습니다.',
  keywords: ['가스요금 절약', '가스비 절감', '연료 절약', '난방비 절약'],
  alternates: {
    canonical: '/calculator/gas',
  },
  openGraph: {
    title: '가스요금 절약 계산기 - 연간 절약 금액 계산',
    description: '가스 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다.',
    url: '/calculator/gas',
  },
};

export default function GasCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

