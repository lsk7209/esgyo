/**
 * RSS 피드 생성
 * 블로그 포스트와 절약 팁을 RSS 형식으로 제공
 */

import { getContentList } from '@/lib/content';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.com';
  
  // 블로그 포스트와 절약 팁 가져오기
  const blogPosts = getContentList({ type: 'blog', limit: 20 });
  const tipPosts = getContentList({ type: 'tip', limit: 20 });
  
  // 최신순으로 정렬 (발행일 기준)
  const allPosts = [...blogPosts, ...tipPosts].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>이에스지요 - 탄소중립포인트 계산기</title>
    <link>${baseUrl}</link>
    <description>탄소중립포인트 계산기, 절약 팁, 친환경 라이프스타일 가이드</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/favicon.ico</url>
      <title>이에스지요</title>
      <link>${baseUrl}</link>
    </image>
${allPosts
  .map((post) => {
    const postUrl = `${baseUrl}/${post.type === 'blog' ? 'blog' : 'tips'}/${post.slug}`;
    const pubDate = new Date(post.publishedAt).toUTCString();
    const description = post.metaDescription || post.description || '';
    const content = post.type === 'blog' && 'content' in post ? post.content : '';
    
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      ${content ? `<content:encoded><![CDATA[${content}]]></content:encoded>` : ''}
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

