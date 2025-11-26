/**
 * Next.js Middleware
 * 보안 헤더 및 요청 검증
 * 
 * Note: Next.js 14+에서는 proxy 함수를 사용하는 것이 권장되지만,
 * 현재는 middleware 함수를 사용하여 호환성 유지
 */

/**
 * Next.js Middleware
 * 보안 헤더 및 요청 검증
 * 
 * Note: Edge Runtime에서 실행되므로 Node.js 전용 모듈 사용 불가
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Edge Runtime 호환 UUID 생성 함수
 * Web Crypto API 사용
 */
function generateRequestId(): string {
  // Edge Runtime에서는 crypto.randomUUID() 사용 가능 (Web Crypto API)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback: 간단한 랜덤 ID 생성
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 보안 헤더 추가 (next.config.ts와 중복되지만 추가 보안)
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // HSTS 헤더 (HTTPS 환경에서만)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // POST 요청에 대한 기본 검증 (실제 환경에서는 CSRF 토큰 검증 추가)
  if (request.method === 'POST') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    // Origin 헤더 검증 (개발 환경에서는 완화)
    if (origin && host && process.env.NODE_ENV === 'production') {
      try {
        const originHost = new URL(origin).hostname;
        const requestHost = host.split(':')[0];
        if (!originHost.includes(requestHost) && originHost !== requestHost) {
          return new NextResponse('Forbidden', { status: 403 });
        }
      } catch (error) {
        // 잘못된 Origin URL인 경우 차단
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
  }

  // Rate limiting을 위한 기본 헤더 (실제 구현은 별도 서비스 필요)
  const requestId = generateRequestId();
  response.headers.set('X-Request-ID', requestId);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap|robots).*)',
  ],
};

