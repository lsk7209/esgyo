/**
 * 메인 sitemap.xml 생성
 * 개인용 탄소중립포인트 계산기 사이트맵
 */

import { env } from '@/lib/env';

export async function GET() {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  
  const routes = [
    '',
    '/calculator',
    '/guide',
    '/tips',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' || route === '/calculator' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
