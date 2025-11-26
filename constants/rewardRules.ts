/**
 * 탄소중립포인트 보상 규칙
 * 환경부 기준 및 예상 포인트
 */

export const RewardRules = {
  // 텀블러 사용 1회당 포인트
  TUMBLER_POINT_PER_USE: 300,
  
  // 종이 영수증 미발급 1회당 포인트
  RECEIPT_POINT_PER_USE: 100,
  
  // 다회용 컵 리필/용기 사용 1회당 포인트
  REFILL_POINT_PER_USE: 2000,
  
  // 대중교통 이용 1km당 포인트
  TRANSIT_POINT_PER_KM: 5,
  
  // 연간 상한선 포인트
  MAX_ANNUAL_POINT: 70000,
  
  // 1포인트 = 1원 기준
  POINT_TO_CASH_RATIO: 1,
  
  // CO2 감축 계수 (kg CO2 / 포인트)
  CO2_REDUCTION_PER_POINT: 0.01, // 예시값
  
  // 나무 심기 효과 (그루 / 포인트)
  TREE_EQUIVALENT_PER_POINT: 0.0001, // 예시값
} as const;

