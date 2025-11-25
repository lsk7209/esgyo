/**
 * Next.js Middleware
 * 보안 헤더 및 요청 검증
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 보안 헤더 추가 (next.config.ts와 중복되지만 추가 보안)
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // POST 요청에 대한 기본 검증 (실제 환경에서는 CSRF 토큰 검증 추가)
  if (request.method === 'POST') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    // Origin 헤더 검증 (개발 환경에서는 완화)
    if (origin && host && process.env.NODE_ENV === 'production') {
      const originHost = new URL(origin).hostname;
      if (!originHost.includes(host.split(':')[0])) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
  }

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

