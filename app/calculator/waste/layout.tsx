import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '폐기물 감량 계산기 - 재활용으로 절약되는 비용 | 이에스지요',
  description: '재활용과 분리수거로 절약되는 비용과 환경 효과를 계산합니다. 종이, 플라스틱, 캔, 유리병 등을 재활용하면 처리 비용을 절감하고 환경을 보호할 수 있습니다.',
  keywords: ['재활용', '분리수거', '폐기물 감량', '환경 보호', '재활용 수익'],
  alternates: {
    canonical: '/calculator/waste',
  },
  openGraph: {
    title: '폐기물 감량 계산기 - 재활용으로 절약되는 비용',
    description: '재활용과 분리수거로 절약되는 비용과 환경 효과를 계산합니다.',
    url: '/calculator/waste',
  },
};

export default function WasteCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

