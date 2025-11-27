/**
 * BusinessState Zustand Store
 */

import { create } from 'zustand';
import type { BusinessState, InputMode } from '@/types/business';
import { calculateTotalEmission } from '@/constants/emissionFactors';
import { costToUsage } from '@/constants/unitPrices';
import { getIndustryBenchmark } from '@/constants/industryData';
import { calculateRiskLevel } from '@/constants/riskLevel';
import { isPositiveNumber, isNonEmptyString } from '@/lib/types/guards';
import { generateUUID } from '@/lib/utils/uuid';

interface BusinessStore extends BusinessState {
  // Actions
  setInputMode: (mode: InputMode) => void;
  setIndustry: (industry: string) => void;
  setElectricity: (value: number) => void;
  setGas: (value: number) => void;
  setFuel: (value: number) => void;
  setCompanyName: (name: string) => void;
  calculate: () => void;
  reset: () => void;
}

const initialState: BusinessState = {
  sessionId: generateUUID(),
  inputMode: 'usage',
  industry: '',
  electricity: 0,
  gas: 0,
  fuel: 0,
  totalEmission: 0,
  riskLevel: 3,
  companyName: '',
  createdAt: new Date().toISOString()
};

export const useBusinessStore = create<BusinessStore>((set, get) => ({
  ...initialState,
  
  setInputMode: (mode) => {
    set({ inputMode: mode });
    get().calculate();
  },
  
  setIndustry: (industry) => {
    set({ industry });
    get().calculate();
  },
  
  setElectricity: (value) => {
    const safeValue = isPositiveNumber(value) ? value : 0;
    set({ electricity: safeValue });
    get().calculate();
  },
  
  setGas: (value) => {
    const safeValue = isPositiveNumber(value) ? value : 0;
    set({ gas: safeValue });
    get().calculate();
  },
  
  setFuel: (value) => {
    const safeValue = isPositiveNumber(value) ? value : 0;
    set({ fuel: safeValue });
    get().calculate();
  },
  
  setCompanyName: (name) => {
    const safeName = isNonEmptyString(name) ? name : '';
    set({ companyName: safeName });
  },
  
  calculate: () => {
    const state = get();
    const { inputMode, electricity, gas, fuel, industry } = state;
    
    // 비용 모드인 경우 사용량으로 변환
    let elecUsage = electricity;
    let gasUsage = gas;
    let fuelUsage = fuel;
    
    if (inputMode === 'cost') {
      elecUsage = costToUsage(electricity, 'electricity');
      gasUsage = costToUsage(gas, 'gas');
      fuelUsage = costToUsage(fuel, 'fuel');
    }
    
    // 총 배출량 계산
    const totalEmission = calculateTotalEmission(elecUsage, gasUsage, fuelUsage);
    
    // 리스크 레벨 계산
    const benchmark = getIndustryBenchmark(industry);
    const riskLevel = benchmark
      ? calculateRiskLevel(totalEmission, benchmark.avgEmission)
      : 3;
    
    set({ totalEmission, riskLevel });
  },
  
  reset: () => {
    set({
      ...initialState,
      sessionId: generateUUID(),
      createdAt: new Date().toISOString()
    });
  }
}));

