import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESG 리포트 - ESGyo",
  description: "ESG 배출량 리포트",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

