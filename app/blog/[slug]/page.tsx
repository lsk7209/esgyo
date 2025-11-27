/**
 * 블로그 포스트 상세 페이지
 * 동적 라우팅으로 확장 가능한 구조
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import AdSenseSlot from '@/components/ads/AdSenseSlot';
import { getContent, getRelatedContent } from '@/lib/content';
import { CONTENT_CATEGORIES } from '@/constants/contentCategories';
import JSONLD from '@/components/seo/JSONLD';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // 실제로는 DB 또는 CMS에서 조회
  const post = getContent(params.slug);
  
  if (!post || post.type !== 'blog') {
    return {
      title: '글을 찾을 수 없습니다',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getContent(params.slug);

  if (!post || post.type !== 'blog') {
    notFound();
  }

  const categoryConfig = CONTENT_CATEGORIES[post.category];
  const relatedPosts = getRelatedContent(post.id, 3);

  // Article JSON-LD
  const articleData = {
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: '이에스지요',
    },
    publisher: {
      '@type': 'Organization',
      name: '이에스지요',
    },
  };

  return (
    <>
      <JSONLD type="Article" data={articleData} />
      <PageContainer maxWidth="4xl">
        {/* 뒤로가기 버튼 */}
        <div className="mb-4 sm:mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              ← 블로그 목록으로
            </Button>
          </Link>
        </div>

        {/* 헤더 */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-xl">{categoryConfig.icon}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${categoryConfig.color}-100 text-${categoryConfig.color}-700`}>
              {categoryConfig.name}
            </span>
            {post.featured && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                추천
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600">
            <span>{new Date(post.publishedAt).toLocaleDateString('ko-KR')}</span>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>읽는 시간 {post.readingTime}분</span>
              </>
            )}
            {post.viewCount !== undefined && (
              <>
                <span>•</span>
                <span>조회 {post.viewCount.toLocaleString()}</span>
              </>
            )}
          </div>
        </div>

        {/* AdSense Slot 1 */}
        <AdSenseSlot slotId="blog-post-top" className="my-8" />

        {/* 본문 */}
        <Card className="p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
          <div 
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Card>

        {/* AdSense Slot 2 */}
        <AdSenseSlot slotId="blog-post-middle" className="my-8" />

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-gray-700">태그</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag}`}>
                  <Button variant="outline" size="sm" className="min-h-[36px]">
                    #{tag}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 관련 글 */}
        {relatedPosts.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">관련 글</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((related) => {
                const relatedCategoryConfig = CONTENT_CATEGORIES[related.category];
                return (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <Card className="p-4 sm:p-5 hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span>{relatedCategoryConfig.icon}</span>
                        <span className="text-xs text-gray-600">{relatedCategoryConfig.name}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.description}
                      </p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* AdSense Slot 3 */}
        <AdSenseSlot slotId="blog-post-bottom" className="my-8" />

        {/* CTA */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              탄소중립포인트를 받아보세요
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              일상 속 작은 실천으로 연간 최대 7만원까지 받을 수 있습니다
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/calculator/carbon-point">
                <Button className="bg-green-600 hover:bg-green-700 text-white min-h-[48px] px-6 sm:px-8">
                  포인트 계산하기
                </Button>
              </Link>
              <Link href="/guide">
                <Button variant="outline" className="min-h-[48px] px-6 sm:px-8">
                  신청 가이드 보기
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}

