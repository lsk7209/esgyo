/**
 * 개인용 탄소중립포인트 계산기 상태 모델
 */

export interface PersonalState {
  // 텀블러 사용 (주 단위)
  tumblerPerWeek: number;
  
  // 종이 영수증 미발급 (월 단위)
  receiptPerMonth: number;
  
  // 다회용 컵 리필/다회용 용기 사용 (월 단위)
  refillPerMonth: number;
  
  // 승용차 대신 대중교통 이용 거리 (월 단위, km)
  publicTransitKmPerMonth: number;
  
  // 계산 결과
  annualPoint: number;
  expectedCash: number;
  co2Reduction: number; // kg CO2
  treeEquivalent: number; // 나무 그루 수
}

