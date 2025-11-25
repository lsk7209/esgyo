import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "기업용 ESG 진단 - ESGyo",
  description: "Scope 1·2 배출량 계산 및 ESG 진단 리포트",
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

