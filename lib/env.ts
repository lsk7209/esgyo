/**
 * 환경 변수 타입 안전 관리
 */

/**
 * 공개 환경 변수 (클라이언트에서 접근 가능)
 */
export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr',
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

/**
 * 환경 변수 검증
 */
export function validateEnv() {
  const required = ['NEXT_PUBLIC_SITE_URL'] as const;
  const missing: string[] = [];

  required.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }

  return missing.length === 0;
}

/**
 * 개발 환경 여부
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * 프로덕션 환경 여부
 */
export const isProduction = env.NODE_ENV === 'production';

