/**
 * 에러 핸들링 유틸리티
 * 에러 로깅 및 리포팅을 위한 중앙 관리
 */

import { isProduction } from './env';

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  path?: string;
  userAgent?: string;
  timestamp?: string;
}

/**
 * 에러 로깅 (실제 환경에서는 에러 리포팅 서비스로 전송)
 */
export function logError(
  error: Error,
  context?: ErrorContext
): void {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    context: {
      ...context,
      timestamp: context?.timestamp || new Date().toISOString(),
      userAgent: context?.userAgent || (typeof window !== 'undefined' ? window.navigator.userAgent : undefined),
      path: context?.path || (typeof window !== 'undefined' ? window.location.pathname : undefined),
    }
  };

  // 개발 환경에서는 콘솔 출력
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Handler]', errorInfo);
    return;
  }

  // 프로덕션 환경에서는 에러 리포팅 서비스로 전송
  // 예: Sentry, LogRocket, Datadog 등
  try {
    // 에러 리포팅 서비스 연동 예시:
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: errorInfo });
    // }
    
    // 현재는 콘솔에만 출력
    // 실제 환경에서는 에러 리포팅 서비스로 전송하도록 설정 필요
    if (isProduction) {
      console.error('[Production Error]', errorInfo);
    }
  } catch (reportingError) {
    // 에러 리포팅 실패해도 앱은 계속 동작
    console.warn('[Error Reporting Failed]', reportingError);
  }
}

/**
 * 안전한 에러 메시지 추출
 * 민감한 정보를 제거하고 사용자에게 안전한 메시지 반환
 */
export function getSafeErrorMessage(error: Error): string {
  // 프로덕션에서는 상세 에러 메시지를 숨김
  if (process.env.NODE_ENV === 'production') {
    return '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.';
  }
  
  // 개발 환경에서는 상세 메시지 반환
  return error.message || '알 수 없는 오류가 발생했습니다.';
}

