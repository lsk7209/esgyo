/**
 * BusinessState 타입 정의
 */

export type InputMode = 'usage' | 'cost';

export interface BusinessState {
  sessionId: string;       // UUID
  inputMode: InputMode;
  industry: string;
  
  // 입력값
  electricity: number;     // kWh 또는 원
  gas: number;             // MJ 또는 원
  fuel: number;            // Liter 또는 원
  
  // 계산된 값
  totalEmission: number;   // tCO2eq
  riskLevel: 1 | 2 | 3 | 4 | 5;
  
  // 메타데이터
  companyName?: string;
  createdAt?: string;
}

