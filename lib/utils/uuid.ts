/**
 * UUID 생성 유틸리티
 * Edge Runtime 호환 (crypto.randomUUID 사용)
 */

/**
 * UUID 생성 (Edge Runtime 호환)
 * crypto.randomUUID()는 Edge Runtime에서 사용 가능
 * Fallback: 브라우저 호환성을 위한 대체 구현
 */
export function generateUUID(): string {
  // Edge Runtime 및 최신 브라우저
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback for older browsers or Node.js < 19
  // RFC4122 version 4 compliant UUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

