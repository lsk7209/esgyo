/**
 * 입력 검증 유틸리티
 */

import { VALIDATION } from './constants';

/**
 * 숫자 입력 검증
 * - 음수 방지
 * - NaN 방지
 * - 무한대 방지
 * - 최대값 제한
 */
export function validateNumber(value: number): boolean {
  if (isNaN(value)) return false;
  if (!isFinite(value)) return false;
  if (value < VALIDATION.minInputValue) return false;
  if (value > VALIDATION.maxInputValue) return false;
  return true;
}

/**
 * 안전한 숫자 변환
 * 음수나 NaN인 경우 0 반환, 최대값 제한
 */
export function safeNumber(value: string | number): number {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num) || !isFinite(num) || num < VALIDATION.minInputValue) {
    return 0;
  }
  if (num > VALIDATION.maxInputValue) {
    return VALIDATION.maxInputValue;
  }
  return num;
}

/**
 * 입력값 정규화
 * 사용자 입력을 안전한 숫자로 변환
 */
export function normalizeInput(value: string): number {
  // 빈 문자열이나 공백만 있는 경우 0
  if (!value || value.trim() === '') return 0;
  
  const num = parseFloat(value);
  return safeNumber(num);
}

/**
 * 소수점 자릿수 제한
 */
export function roundToDecimalPlaces(value: number, places: number = VALIDATION.maxDecimalPlaces): number {
  const factor = Math.pow(10, places);
  return Math.round(value * factor) / factor;
}

