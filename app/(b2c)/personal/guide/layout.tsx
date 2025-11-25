import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "탄소중립포인트 가이드 - ESGyo",
  description: "탄소중립포인트란 무엇인가? 어떻게 받을 수 있는가? 자주 묻는 질문과 답변",
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

