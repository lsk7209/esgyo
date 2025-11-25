/**
 * 리스크 레벨 계산 알고리즘
 */

export type RiskLevel = 1 | 2 | 3 | 4 | 5;

export interface RiskLevelInfo {
  level: RiskLevel;
  label: string;
  color: string;
  description: string;
}

/**
 * 배출량과 업종 평균을 비교하여 리스크 레벨 계산
 * Edge case 처리 포함
 */
export function calculateRiskLevel(
  totalEmission: number,
  industryAvg: number
): RiskLevel {
  // Edge case: 유효하지 않은 입력값 처리
  if (!isFinite(totalEmission) || totalEmission < 0) {
    return 3; // 기본값
  }
  
  if (!isFinite(industryAvg) || industryAvg <= 0) {
    return 3; // 기본값
  }
  
  // Edge case: 0으로 나누기 방지
  const ratio = totalEmission / industryAvg;
  
  if (!isFinite(ratio)) {
    return 3; // 기본값
  }
  
  if (ratio < 0.5) return 1;
  if (ratio < 0.8) return 2;
  if (ratio <= 1.2) return 3;
  if (ratio <= 1.5) return 4;
  return 5;
}

/**
 * 리스크 레벨 정보
 */
export function getRiskLevelInfo(level: RiskLevel): RiskLevelInfo {
  const infoMap: Record<RiskLevel, RiskLevelInfo> = {
    1: {
      level: 1,
      label: "매우 낮음",
      color: "green",
      description: "업종 평균 대비 매우 낮은 배출량"
    },
    2: {
      level: 2,
      label: "낮음",
      color: "blue",
      description: "업종 평균 대비 낮은 배출량"
    },
    3: {
      level: 3,
      label: "보통",
      color: "yellow",
      description: "업종 평균 수준의 배출량"
    },
    4: {
      level: 4,
      label: "높음",
      color: "orange",
      description: "업종 평균 대비 높은 배출량"
    },
    5: {
      level: 5,
      label: "매우 높음",
      color: "red",
      description: "규제 대상 위험 수준"
    }
  };
  
  return infoMap[level];
}

