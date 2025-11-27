import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인용 탄소 계산기 - 이에스지요",
  description: "탄소중립포인트 계산 및 개인 탄소 발자국 확인",
};

export default function PersonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

