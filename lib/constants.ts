/**
 * 애플리케이션 상수
 */

export const APP_CONFIG = {
  name: 'ESGyo',
  description: '탄소 배출량 계산 및 진단 서비스',
  version: '1.0.0',
  supportEmail: 'support@esgyo.com',
} as const;

export const ROUTES = {
  home: '/',
  personal: {
    calculator: '/personal/calculator',
    guide: '/personal/guide',
  },
  business: {
    calculator: '/business/calculator',
    diagnosis: '/business/diagnosis',
    report: '/business/report',
  },
  admin: '/admin',
} as const;

export const VALIDATION = {
  maxInputValue: 1000000000, // 10억
  minInputValue: 0,
  maxDecimalPlaces: 2,
} as const;

