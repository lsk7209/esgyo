/**
 * 블로그 포스트 상세 페이지
 * 동적 라우팅으로 확장 가능한 구조
 * SEO/GenEO/AEO 최적화 템플릿 적용
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import BlogTemplate from '@/components/blog/BlogTemplate';
import { getContent, getRelatedContent, getAllContentSlugs } from '@/lib/content';
import { CONTENT_CATEGORIES } from '@/constants/contentCategories';
import JSONLD from '@/components/seo/JSONLD';
import type { Metadata } from 'next';
import type { BlogPost } from '@/types/content';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getContent(params.slug);
  
  if (!post || post.type !== 'blog') {
    return {
      title: '글을 찾을 수 없습니다',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.kr';
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.image ? [post.image] : [],
      url: `${baseUrl}/blog/${post.slug}`,
    },
  };
}

// 정적 경로 생성 (SSG)
export async function generateStaticParams() {
  const slugs = getAllContentSlugs('blog');
  return slugs.map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getContent(params.slug);

  if (!post || post.type !== 'blog') {
    notFound();
  }

  const categoryConfig = CONTENT_CATEGORIES[post.category];
  const relatedPosts = getRelatedContent(post.id, 3);

  // BlogTemplate에 필요한 데이터 변환
  // post 데이터에 summary와 sections가 있으면 사용, 없으면 기본 구조 사용
  const hasStructuredData = 'summary' in post && 'sections' in post;
  
  const templateData = {
    title: post.title,
    metaDescription: post.metaDescription || post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readingTime: post.readingTime,
    category: categoryConfig ? {
      name: categoryConfig.name,
      icon: categoryConfig.icon,
    } : undefined,
    summary: hasStructuredData && post.summary ? post.summary : {
      question: post.title.includes('?') ? post.title : `${post.title}?`,
      answer: post.excerpt || post.description,
    },
    sections: hasStructuredData && post.sections ? post.sections : [
      {
        title: '상세 내용',
        content: post.content,
      },
    ],
    faq: hasStructuredData && post.faq ? post.faq : [],
    internalLinks: post.internalLinks || [],
    externalLinks: post.externalLinks || [],
    cta: {
      title: '탄소중립포인트를 받아보세요',
      description: '일상 속 작은 실천으로 연간 최대 7만원까지 받을 수 있습니다',
      primaryButton: {
        text: '포인트 계산하기',
        url: '/calculator/carbon-point',
      },
      secondaryButton: {
        text: '신청 가이드 보기',
        url: '/guide',
      },
    },
  };

  // Article JSON-LD
  const articleData = {
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || '이에스지요',
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

        <BlogTemplate {...templateData} />

        {/* 관련 글 */}
        {relatedPosts.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">관련 글</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((related) => {
                if (related.type !== 'blog') return null;
                const relatedCategoryConfig = CONTENT_CATEGORIES[related.category];
                return (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <div className="p-4 sm:p-5 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer h-full">
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
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </PageContainer>
    </>
  );
}
