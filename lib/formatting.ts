/**
 * 포맷팅 유틸리티
 * 숫자, 날짜, 통화 등 포맷팅 함수
 */

/**
 * 배출량 포맷팅 (tCO₂eq)
 */
export function formatEmission(value: number, decimals: number = 2): string {
  if (!isFinite(value) || value < 0) return '0.00';
  return `${value.toFixed(decimals)} tCO₂eq`;
}

/**
 * 숫자 포맷팅 (천 단위 구분)
 */
export function formatNumber(value: number, decimals: number = 0): string {
  if (!isFinite(value)) return '0';
  return value.toLocaleString('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * 퍼센트 포맷팅
 */
export function formatPercent(value: number, decimals: number = 1): string {
  if (!isFinite(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
}

/**
 * 날짜 포맷팅 (한국어)
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

