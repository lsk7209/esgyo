/**
 * Next.js Instrumentation
 * 전역 에러 핸들링 및 모니터링 설정
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 서버 사이드 에러 핸들링
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // 프로덕션에서는 에러 리포팅 서비스로 전송
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      // 프로덕션에서는 에러 리포팅 서비스로 전송
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge Runtime에서는 다른 방식으로 처리
    // Edge Runtime은 process.on을 지원하지 않음
  }
}

