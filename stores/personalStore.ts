/**
 * 개인용 탄소중립포인트 계산기 Zustand Store
 */

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { PersonalState } from '@/types/personal';
import { calculateAll } from '@/lib/pointCalculator';
import { isPositiveNumber } from '@/lib/types/guards';

interface PersonalStore extends PersonalState {
  sessionId: string;
  createdAt: string;
  
  // Actions
  setTumblerPerWeek: (value: number) => void;
  setReceiptPerMonth: (value: number) => void;
  setRefillPerMonth: (value: number) => void;
  setPublicTransitKmPerMonth: (value: number) => void;
  calculate: () => void;
  reset: () => void;
}

const initialState: Omit<PersonalState, 'annualPoint' | 'expectedCash' | 'co2Reduction' | 'treeEquivalent'> & { sessionId: string; createdAt: string } = {
  sessionId: uuidv4(),
  tumblerPerWeek: 0,
  receiptPerMonth: 0,
  refillPerMonth: 0,
  publicTransitKmPerMonth: 0,
  createdAt: new Date().toISOString(),
};

export const usePersonalStore = create<PersonalStore>((set, get) => {
  // 초기 계산
  const initialCalc = calculateAll({
    tumblerPerWeek: 0,
    receiptPerMonth: 0,
    refillPerMonth: 0,
    publicTransitKmPerMonth: 0,
  });
  
  return {
    ...initialState,
    ...initialCalc,
    
    setTumblerPerWeek: (value) => {
      const safeValue = isPositiveNumber(value) ? value : 0;
      set({ tumblerPerWeek: safeValue });
      get().calculate();
    },
    
    setReceiptPerMonth: (value) => {
      const safeValue = isPositiveNumber(value) ? value : 0;
      set({ receiptPerMonth: safeValue });
      get().calculate();
    },
    
    setRefillPerMonth: (value) => {
      const safeValue = isPositiveNumber(value) ? value : 0;
      set({ refillPerMonth: safeValue });
      get().calculate();
    },
    
    setPublicTransitKmPerMonth: (value) => {
      const safeValue = isPositiveNumber(value) ? value : 0;
      set({ publicTransitKmPerMonth: safeValue });
      get().calculate();
    },
    
    calculate: () => {
      const state = get();
      const result = calculateAll({
        tumblerPerWeek: state.tumblerPerWeek,
        receiptPerMonth: state.receiptPerMonth,
        refillPerMonth: state.refillPerMonth,
        publicTransitKmPerMonth: state.publicTransitKmPerMonth,
      });
      
      set(result);
    },
    
    reset: () => {
      const newSessionId = uuidv4();
      const resetCalc = calculateAll({
        tumblerPerWeek: 0,
        receiptPerMonth: 0,
        refillPerMonth: 0,
        publicTransitKmPerMonth: 0,
      });
      
      set({
        ...initialState,
        sessionId: newSessionId,
        createdAt: new Date().toISOString(),
        ...resetCalc,
      });
    },
  };
});

