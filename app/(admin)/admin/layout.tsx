import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 대시보드 - ESGyo",
  description: "KPI 지표 및 사용자 행동 분석",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

