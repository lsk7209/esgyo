import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Next.js 및 개발 환경을 위한 설정
              process.env.NODE_ENV === 'development'
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" // 개발 환경: Next.js HMR 필요
                : "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com", // 프로덕션: AdSense 허용
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com",
              "frame-src 'self' https://googleads.g.doubleclick.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; ')
          }
        ],
      },
    ];
  },
};

export default nextConfig;
