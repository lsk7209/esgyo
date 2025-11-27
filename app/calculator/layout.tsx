/**
 * 계산기 레이아웃
 * 확장 가능한 계산기 구조를 위한 공통 레이아웃
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "계산기 - 이에스지요",
  description: "탄소중립포인트, 전기요금 절약, 가스요금 절약 등 다양한 계산기를 제공합니다",
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

