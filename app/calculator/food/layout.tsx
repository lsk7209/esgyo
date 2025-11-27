import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '음식물 쓰레기 감량 계산기 - 절약되는 비용 계산 | 이에스지요',
  description: '음식물 쓰레기를 줄여서 절약되는 비용을 계산합니다. 음식물 쓰레기 감량으로 처리 비용을 절감하고 환경을 보호할 수 있습니다.',
  keywords: ['음식물 쓰레기', '음쓰 감량', '식비 절약', '음식물 쓰레기 처리'],
  alternates: {
    canonical: '/calculator/food',
  },
  openGraph: {
    title: '음식물 쓰레기 감량 계산기 - 절약되는 비용 계산',
    description: '음식물 쓰레기를 줄여서 절약되는 비용을 계산합니다.',
    url: '/calculator/food',
  },
};

export default function FoodCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

