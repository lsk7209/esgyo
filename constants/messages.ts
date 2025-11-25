/**
 * 법적 문구 및 모든 사용자 메시지 중앙 관리
 * 컴포넌트에서 하드코딩 금지
 */

export const messages = {
  // 법적 경고 및 Disclaimer
  LEGAL_DISCLAIMER: `본 리포트는 입력값과 평균 단가 기반의 '추정치'이며 법적·회계적 효력을 갖지 않습니다. 정확한 산정은 환경부 인증 시스템을 통해 진행해야 합니다.`,
  
  COST_TO_USAGE_WARNING: "2025 평균 단가 기반 추정치(정확도↓). 실제 사용량 입력을 권장합니다.",
  
  RISK_LEVEL_5_WARNING: "규제 대상 위험. 즉시 감축 전략 검토 필요",
  
  // B2B Calculator
  CALCULATOR_TITLE: "Scope 1·2 배출량 계산기",
  CALCULATOR_DESCRIPTION: "전기, 가스, 연료 사용량 또는 비용을 입력하여 탄소 배출량을 계산합니다.",
  
  // B2B Diagnosis
  DIAGNOSIS_TITLE: "배출량 진단",
  DIAGNOSIS_DESCRIPTION: "업종 평균 대비 배출량을 비교하고 리스크 수준을 확인하세요.",
  
  // B2B Report
  REPORT_TITLE: "ESG 배출량 리포트",
  REPORT_CTA: "절감 컨설팅 받기",
  
  // B2C Personal
  PERSONAL_CALCULATOR_TITLE: "탄소중립포인트 계산기",
  PERSONAL_CALCULATOR_DESCRIPTION: "개인 생활에서 발생하는 탄소 배출량을 계산하고 포인트를 확인하세요.",
  
  // Admin
  ADMIN_TITLE: "관리자 대시보드",
  ADMIN_DESCRIPTION: "KPI 지표 및 사용자 행동 분석",
  
  // Error Messages
  ERROR_NO_STATE: "계산 데이터가 없습니다. 계산기 페이지로 이동합니다.",
  ERROR_INVALID_INPUT: "올바른 값을 입력해주세요.",
  ERROR_PDF_GENERATION: "PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
  ERROR_SESSION_STORAGE: "브라우저 저장소에 접근할 수 없습니다. 일부 기능이 제한될 수 있습니다.",
  
  // Success Messages
  SUCCESS_PDF_GENERATED: "PDF 리포트가 생성되었습니다.",
  
  // Loading Messages
  LOADING_PDF_GENERATION: "PDF 생성 중...",
} as const;

