/**
 * 계산기 레이아웃
 * 확장 가능한 계산기 구조를 위한 공통 레이아웃
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "탄소중립포인트 계산기 및 절약 계산기 모음 | 이에스지요",
  description: "탄소중립포인트 계산기, 전기요금 절약 계산기, 가스요금 절약 계산기 등 다양한 계산기를 제공합니다. 일상 속 작은 실천으로 얼마나 절약할 수 있는지 계산해보세요.",
  keywords: ['탄소중립포인트 계산기', '전기요금 절약 계산기', '가스요금 절약 계산기', '절약 계산기', '환경 계산기'],
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    title: '탄소중립포인트 계산기 및 절약 계산기 모음',
    description: '탄소중립포인트 계산기, 전기요금 절약 계산기 등 다양한 계산기를 제공합니다.',
    url: '/calculator',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

