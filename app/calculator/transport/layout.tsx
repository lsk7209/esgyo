import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대중교통 vs 자차 비교 계산기 - 절약 금액과 탄소 감축량 | 이에스지요',
  description: '대중교통 이용 시 절약되는 비용과 탄소 감축량을 계산합니다. 자차 대신 대중교통을 이용하면 연간 상당한 금액을 절약하고 탄소 배출을 줄일 수 있습니다.',
  keywords: ['대중교통', '자차 비교', '교통비 절약', '탄소 감축', '친환경 교통'],
  alternates: {
    canonical: '/calculator/transport',
  },
  openGraph: {
    title: '대중교통 vs 자차 비교 계산기 - 절약 금액과 탄소 감축량',
    description: '대중교통 이용 시 절약되는 비용과 탄소 감축량을 계산합니다.',
    url: '/calculator/transport',
  },
};

export default function TransportCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

