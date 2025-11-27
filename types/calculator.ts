/**
 * 계산기 타입 정의
 * 확장 가능한 계산기 구조
 */

export type CalculatorType = 
  | 'carbon-point'      // 탄소중립포인트 계산기 (메인)
  | 'electricity'       // 전기요금 절약 계산기
  | 'gas'               // 가스요금 절약 계산기
  | 'transport'         // 대중교통 vs 자차 비교 계산기
  | 'waste'             // 폐기물 감량 계산기
  | 'water'             // 수도요금 절약 계산기
  | 'food'              // 음식물 쓰레기 감량 계산기
  | 'shopping';         // 친환경 쇼핑 포인트 계산기

export interface CalculatorConfig {
  id: CalculatorType;
  title: string;
  description: string;
  icon: string;
  category: 'point' | 'saving' | 'comparison' | 'reduction';
  status: 'active' | 'coming-soon';
  route: string;
  keywords: string[];
}

export interface CalculatorResult {
  mainValue: number;
  mainUnit: string;
  subValues?: Array<{
    label: string;
    value: number;
    unit: string;
  }>;
  description?: string;
}

