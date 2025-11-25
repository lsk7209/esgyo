/**
 * robots.txt
 */

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/business/report',
          '/business/diagnosis',
          '/admin',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.com'}/sitemap.xml`, // env.ts 사용 시 클라이언트 컴포넌트에서만 가능
  };
}

