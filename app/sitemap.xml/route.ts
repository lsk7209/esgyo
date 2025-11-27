/**
 * 메인 sitemap.xml 생성
 * 개인용 탄소중립포인트 계산기 사이트맵
 * 동적 콘텐츠 포함
 */

import { getContentList } from '@/lib/content';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.com';
  
  // 정적 라우트
  const staticRoutes = [
    '',
    '/calculator',
    '/calculator/carbon-point',
    '/calculator/electricity',
    '/calculator/gas',
    '/calculator/transport',
    '/calculator/waste',
    '/calculator/water',
    '/calculator/food',
    '/calculator/shopping',
    '/guide',
    '/tips',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  // 동적 콘텐츠 라우트 (블로그, 절약 팁)
  const blogPosts = getContentList({ type: 'blog', limit: 1000 });
  const tipPosts = getContentList({ type: 'tip', limit: 1000 });

  const dynamicRoutes = [
    ...blogPosts.map(post => `/blog/${post.slug}`),
    ...tipPosts.map(tip => `/tips/${tip.slug}`),
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => {
      const isHome = route === '';
      const isCalculator = route.startsWith('/calculator');
      const isBlog = route.startsWith('/blog');
      const isTip = route.startsWith('/tips');
      
      let priority = '0.8';
      let changefreq = 'weekly';
      
      if (isHome) {
        priority = '1.0';
        changefreq = 'daily';
      } else if (isCalculator) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (isBlog || isTip) {
        priority = '0.7';
        changefreq = 'monthly';
      }
      
      return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
