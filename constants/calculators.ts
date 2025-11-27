/**
 * 계산기 설정 및 메타데이터
 * 확장 가능한 계산기 목록 관리
 */

import type { CalculatorConfig } from '@/types/calculator';

export const CALCULATORS: CalculatorConfig[] = [
  {
    id: 'carbon-point',
    title: '탄소중립포인트 계산기',
    description: '텀블러 사용, 대중교통 이용 등으로 받을 수 있는 포인트와 현금화 금액을 계산합니다',
    icon: '🌱',
    category: 'point',
    status: 'active',
    route: '/calculator/carbon-point',
    keywords: ['탄소중립포인트', '환경부 포인트', '친환경 실천', '포인트 현금화'],
  },
  {
    id: 'electricity',
    title: '전기요금 절약 계산기',
    description: '전기 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다',
    icon: '⚡',
    category: 'saving',
    status: 'active',
    route: '/calculator/electricity',
    keywords: ['전기요금 절약', '전력 절약', '에너지 절약', '전기비 절감'],
  },
  {
    id: 'gas',
    title: '가스요금 절약 계산기',
    description: '가스 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다',
    icon: '🔥',
    category: 'saving',
    status: 'active',
    route: '/calculator/gas',
    keywords: ['가스요금 절약', '가스비 절감', '연료 절약'],
  },
  {
    id: 'transport',
    title: '대중교통 vs 자차 비교 계산기',
    description: '대중교통 이용 시 절약되는 비용과 탄소 감축량을 계산합니다',
    icon: '🚇',
    category: 'comparison',
    status: 'active',
    route: '/calculator/transport',
    keywords: ['대중교통', '자차 비교', '교통비 절약', '탄소 감축'],
  },
  {
    id: 'waste',
    title: '폐기물 감량 계산기',
    description: '재활용과 분리수거로 절약되는 비용과 환경 효과를 계산합니다',
    icon: '♻️',
    category: 'reduction',
    status: 'active',
    route: '/calculator/waste',
    keywords: ['재활용', '분리수거', '폐기물 감량', '환경 보호'],
  },
  {
    id: 'water',
    title: '수도요금 절약 계산기',
    description: '물 사용량을 줄여서 연간 절약할 수 있는 금액을 계산합니다',
    icon: '💧',
    category: 'saving',
    status: 'active',
    route: '/calculator/water',
    keywords: ['수도요금 절약', '물 절약', '수도비 절감'],
  },
  {
    id: 'food',
    title: '음식물 쓰레기 감량 계산기',
    description: '음식물 쓰레기를 줄여서 절약되는 비용을 계산합니다',
    icon: '🍽️',
    category: 'reduction',
    status: 'active',
    route: '/calculator/food',
    keywords: ['음식물 쓰레기', '음쓰 감량', '식비 절약'],
  },
  {
    id: 'shopping',
    title: '친환경 쇼핑 포인트 계산기',
    description: '친환경 제품 구매로 받을 수 있는 포인트와 할인 혜택을 계산합니다',
    icon: '🛒',
    category: 'point',
    status: 'active',
    route: '/calculator/shopping',
    keywords: ['친환경 쇼핑', '그린 포인트', '환경 제품'],
  },
];

export const ACTIVE_CALCULATORS = CALCULATORS.filter(calc => calc.status === 'active');

export const CALCULATORS_BY_CATEGORY = {
  point: CALCULATORS.filter(calc => calc.category === 'point'),
  saving: CALCULATORS.filter(calc => calc.category === 'saving'),
  comparison: CALCULATORS.filter(calc => calc.category === 'comparison'),
  reduction: CALCULATORS.filter(calc => calc.category === 'reduction'),
} as const;

export function getCalculatorById(id: string): CalculatorConfig | undefined {
  return CALCULATORS.find(calc => calc.id === id);
}

