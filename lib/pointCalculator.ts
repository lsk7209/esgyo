/**
 * 탄소중립포인트 계산 로직
 */

import { RewardRules } from '@/constants/rewardRules';
import type { PersonalState } from '@/types/personal';

/**
 * 연간 포인트 계산
 */
export function calculateAnnualPoint(state: Omit<PersonalState, 'annualPoint' | 'expectedCash' | 'co2Reduction' | 'treeEquivalent'>): number {
  // 주 단위를 연 단위로 환산
  const tumblerAnnual = state.tumblerPerWeek * 52 * RewardRules.TUMBLER_POINT_PER_USE;
  
  // 월 단위를 연 단위로 환산
  const receiptAnnual = state.receiptPerMonth * 12 * RewardRules.RECEIPT_POINT_PER_USE;
  const refillAnnual = state.refillPerMonth * 12 * RewardRules.REFILL_POINT_PER_USE;
  const transitAnnual = state.publicTransitKmPerMonth * 12 * RewardRules.TRANSIT_POINT_PER_KM;
  
  // 총 포인트 합산
  const totalPoint = tumblerAnnual + receiptAnnual + refillAnnual + transitAnnual;
  
  // 연간 상한선 적용
  return Math.min(totalPoint, RewardRules.MAX_ANNUAL_POINT);
}

/**
 * 예상 현금화 금액 계산
 */
export function calculateExpectedCash(annualPoint: number): number {
  return annualPoint * RewardRules.POINT_TO_CASH_RATIO;
}

/**
 * CO2 감축량 계산 (kg)
 */
export function calculateCO2Reduction(annualPoint: number): number {
  return annualPoint * RewardRules.CO2_REDUCTION_PER_POINT;
}

/**
 * 나무 심기 효과 계산 (그루)
 */
export function calculateTreeEquivalent(annualPoint: number): number {
  return Math.round(annualPoint * RewardRules.TREE_EQUIVALENT_PER_POINT);
}

/**
 * 전체 계산 수행
 */
export function calculateAll(state: Omit<PersonalState, 'annualPoint' | 'expectedCash' | 'co2Reduction' | 'treeEquivalent'>): Pick<PersonalState, 'annualPoint' | 'expectedCash' | 'co2Reduction' | 'treeEquivalent'> {
  const annualPoint = calculateAnnualPoint(state);
  const expectedCash = calculateExpectedCash(annualPoint);
  const co2Reduction = calculateCO2Reduction(annualPoint);
  const treeEquivalent = calculateTreeEquivalent(annualPoint);
  
  return {
    annualPoint,
    expectedCash,
    co2Reduction,
    treeEquivalent,
  };
}

