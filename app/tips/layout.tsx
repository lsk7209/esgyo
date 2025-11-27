import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '절약 팁 - 일상 속 작은 실천으로 큰 절약 | 이에스지요',
  description: '전기, 가스, 수도 등 생활비 절약 팁과 친환경 실천 방법을 확인하세요. 쉬운 난이도부터 높은 절약 효과까지 다양한 팁을 제공합니다.',
  keywords: ['절약 팁', '생활비 절감', '전기 절약', '가스 절약', '수도 절약', '친환경 팁'],
  alternates: {
    canonical: '/tips',
  },
  openGraph: {
    title: '절약 팁 - 일상 속 작은 실천으로 큰 절약',
    description: '전기, 가스, 수도 등 생활비 절약 팁과 친환경 실천 방법을 확인하세요.',
    url: '/tips',
  },
};

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

