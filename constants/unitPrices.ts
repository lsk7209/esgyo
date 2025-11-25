/**
 * 단가 정보 (2025년 기준)
 * 버전 관리 및 출처 명시
 */

export interface UnitPrice {
  value: number;
  lastUpdated: string;
  source: string;
}

export const UnitPrices: Record<'electricity' | 'gas' | 'fuel', UnitPrice> = {
  electricity: {
    value: 153, // 원/kWh
    lastUpdated: "2025-01-01",
    source: "KEPCO Industrial Avg"
  },
  gas: {
    value: 22, // 원/MJ
    lastUpdated: "2025-01-01",
    source: "City Gas Avg"
  },
  fuel: {
    value: 1650, // 원/Liter
    lastUpdated: "2025-01-01",
    source: "Opinet Gasoline Avg"
  }
};

/**
 * 비용 → 사용량 역계산
 * Edge case 처리 포함
 */
export function costToUsage(cost: number, type: keyof typeof UnitPrices): number {
  // Edge case: 유효하지 않은 입력값 처리
  if (!isFinite(cost) || cost < 0) return 0;
  
  const unitPrice = UnitPrices[type];
  if (!unitPrice || !isFinite(unitPrice.value) || unitPrice.value <= 0) {
    return 0;
  }
  
  const usage = cost / unitPrice.value;
  
  // Edge case: 결과가 유효한지 확인
  if (!isFinite(usage) || usage < 0) {
    return 0;
  }
  
  return usage;
}

