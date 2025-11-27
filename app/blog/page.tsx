/**
 * 블로그 메인 페이지
 * 확장 가능한 콘텐츠 관리 구조
 */

import type { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { getContentList, getAllTags } from '@/lib/content';
import BlogPostList from '@/components/blog/BlogPostList';
import JSONLD from '@/components/seo/JSONLD';
import BlogPageClient from './BlogPageClient';
import type { BlogPost } from '@/types/content';

export const metadata: Metadata = {
  title: '블로그 - 친환경 라이프스타일 가이드',
  description: '탄소중립포인트, 절약 팁, 환경 정보 등 유용한 콘텐츠를 만나보세요',
  keywords: ['블로그', '탄소중립포인트', '절약 팁', '환경', '친환경 라이프스타일'],
};

export default function BlogPage() {
  // 서버에서 모든 블로그 포스트 가져오기
  const allPosts = getContentList({
    type: 'blog',
    limit: 1000, // 모든 포스트 가져오기
  }) as BlogPost[]; // type: 'blog' 필터로 BlogPost만 반환됨

  const tags = getAllTags('blog');

  // FAQ JSON-LD
  const faqData = {
    mainEntity: [
      {
        '@type': 'Question',
        name: '어떤 주제의 블로그 글이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '탄소중립포인트, 절약, 환경, 라이프스타일, 뉴스/트렌드, 후기/사례 등 다양한 주제의 블로그 글을 제공합니다. 카테고리별로 분류되어 있어 원하는 주제를 쉽게 찾을 수 있습니다.'
        }
      },
    ]
  };

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        <PageHeader
          title="블로그 - 친환경 라이프스타일 가이드"
          description="탄소중립포인트, 절약 팁, 환경 정보 등 유용한 콘텐츠를 만나보세요"
        />

        <BlogPageClient initialPosts={allPosts} initialTags={tags} />

        {/* 인기 글 추천 */}
        <div className="mt-5 sm:mt-6 md:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">인기 글</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* 인기 글은 별도 컴포넌트로 분리 가능 */}
            <div className="p-4 sm:p-6 border rounded-lg">
              <p className="text-sm text-gray-600">인기 글 기능은 콘텐츠가 추가되면 자동으로 표시됩니다.</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
