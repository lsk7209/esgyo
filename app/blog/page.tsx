/**
 * 블로그 메인 페이지
 * 확장 가능한 콘텐츠 관리 구조
 */

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import AdSenseSlot from '@/components/ads/AdSenseSlot';
import { BLOG_CATEGORIES, CONTENT_CATEGORIES } from '@/constants/contentCategories';
import { getContentList, getAllTags } from '@/lib/content';
import type { ContentCategory } from '@/types/content';
import JSONLD from '@/components/seo/JSONLD';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // 블로그 포스트 목록 (실제로는 서버 컴포넌트에서 가져오거나 API 호출)
  const posts = useMemo(() => {
    return getContentList({
      type: 'blog',
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      tag: selectedTag || undefined,
      search: searchQuery || undefined,
      limit: 12,
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const tags = useMemo(() => getAllTags('blog'), []);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
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
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        <PageHeader
          title="블로그 - 친환경 라이프스타일 가이드"
          description="탄소중립포인트, 절약 팁, 환경 정보 등 유용한 콘텐츠를 만나보세요"
        />

        {/* AdSense Slot 1 */}
        <AdSenseSlot slotId="blog-top" className="my-8" />

        {/* 검색 및 필터 */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="space-y-4">
            {/* 검색 */}
            <div>
              <Input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 sm:h-12 text-base"
              />
            </div>

            {/* 카테고리 필터 */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-gray-700">카테고리</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className="min-h-[36px]"
                >
                  전체
                </Button>
                {BLOG_CATEGORIES.map((category) => {
                  const config = CONTENT_CATEGORIES[category];
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedTag('');
                      }}
                      className="min-h-[36px]"
                    >
                      {config.icon} {config.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* 태그 필터 */}
            {tags.length > 0 && (
              <div>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-gray-700">태그</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={!selectedTag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag('')}
                    className="min-h-[36px]"
                  >
                    전체
                  </Button>
                  {tags.slice(0, 10).map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTag(tag)}
                      className="min-h-[36px]"
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* AdSense Slot 2 */}
        <AdSenseSlot slotId="blog-middle" className="my-8" />

        {/* 블로그 포스트 목록 */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post) => {
              const categoryConfig = CONTENT_CATEGORIES[post.category];
              return (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="p-4 sm:p-5 hover:shadow-xl transition-all duration-300 cursor-pointer h-full group border hover:border-green-300">
                    {post.image && (
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{categoryConfig.icon}</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-${categoryConfig.color}-100 text-${categoryConfig.color}-700`}>
                        {categoryConfig.name}
                      </span>
                      {post.featured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                          추천
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span>{new Date(post.publishedAt).toLocaleDateString('ko-KR')}</span>
                      {post.readingTime && (
                        <span>읽는 시간 {post.readingTime}분</span>
                      )}
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 sm:p-12 text-center">
            <p className="text-gray-600 text-base sm:text-lg">
              {searchQuery || selectedCategory !== 'all' || selectedTag
                ? '검색 결과가 없습니다.'
                : '아직 등록된 글이 없습니다.'}
            </p>
          </Card>
        )}

        {/* AdSense Slot 3 */}
        <AdSenseSlot slotId="blog-bottom" className="my-8" />

        {/* 인기 글 추천 */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">인기 글</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* 인기 글은 별도 컴포넌트로 분리 가능 */}
            <Card className="p-4 sm:p-6">
              <p className="text-sm text-gray-600">인기 글 기능은 콘텐츠가 추가되면 자동으로 표시됩니다.</p>
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
