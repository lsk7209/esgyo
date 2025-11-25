/**
 * Type Guards
 * 런타임 타입 검증을 위한 유틸리티
 */

/**
 * 숫자 타입 가드
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * 양수 타입 가드
 */
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value >= 0;
}

/**
 * 문자열 타입 가드
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 빈 문자열이 아닌 문자열 타입 가드
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0;
}

/**
 * 객체 타입 가드
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * 배열 타입 가드
 */
export function isArray<T>(value: unknown, itemGuard?: (item: unknown) => item is T): value is T[] {
  if (!Array.isArray(value)) return false;
  if (itemGuard) {
    return value.every(itemGuard);
  }
  return true;
}

