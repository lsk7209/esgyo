import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 대시보드 - 이에스지요',
  description: '사이트 통계 및 콘텐츠 관리',
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

