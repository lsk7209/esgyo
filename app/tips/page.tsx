/**
 * 절약 팁 메인 페이지
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
import { TIP_CATEGORIES, CONTENT_CATEGORIES } from '@/constants/contentCategories';
import { getContentList, getAllTags } from '@/lib/content';
import type { ContentCategory } from '@/types/content';
import JSONLD from '@/components/seo/JSONLD';

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // 절약 팁 목록
  const tips = useMemo(() => {
    return getContentList({
      type: 'tip',
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      tag: selectedTag || undefined,
      search: searchQuery || undefined,
      limit: 12,
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const tags = useMemo(() => getAllTags('tip'), []);

  // FAQ JSON-LD
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '어떤 절약 팁이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '전기, 가스, 수도, 교통, 쇼핑, 음식, 폐기물 등 다양한 카테고리별 절약 팁을 제공합니다. 각 팁은 실천 난이도와 예상 절약 금액을 포함하여 제공됩니다.'
        }
      },
    ]
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        <PageHeader
          title="절약 팁 - 일상 속 작은 실천으로 큰 절약"
          description="전기, 가스, 수도 등 생활비 절약 팁과 친환경 실천 방법을 확인하세요"
        />

        {/* AdSense Slot 1 */}
        <AdSenseSlot slotId="tips-top" className="my-4 sm:my-5" />

        {/* 검색 및 필터 */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-5">
          <div className="space-y-4">
            {/* 검색 */}
            <div>
              <Input
                type="text"
                placeholder="절약 팁 검색..."
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
                {TIP_CATEGORIES.map((category) => {
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
        <AdSenseSlot slotId="tips-middle" className="my-4 sm:my-5" />

        {/* 절약 팁 목록 */}
        {tips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tips.map((tip) => {
              if (tip.type !== 'tip') return null;
              const categoryConfig = CONTENT_CATEGORIES[tip.category];
              return (
                <Link key={tip.id} href={`/tips/${tip.slug}`}>
                  <Card className="p-4 sm:p-5 hover:shadow-xl transition-all duration-300 cursor-pointer h-full group border hover:border-green-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{categoryConfig.icon}</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-${categoryConfig.color}-100 text-${categoryConfig.color}-700`}>
                        {categoryConfig.name}
                      </span>
                      {tip.difficulty && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tip.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          tip.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {tip.difficulty === 'easy' ? '쉬움' : tip.difficulty === 'medium' ? '보통' : '어려움'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {tip.description}
                    </p>
                    {tip.estimatedSaving && (
                      <div className="p-3 bg-green-50 rounded-lg mb-3">
                        <p className="text-xs text-gray-600 mb-1">예상 절약</p>
                        <p className="text-lg font-bold text-green-600">
                          {tip.estimatedSaving.amount.toLocaleString()}{tip.estimatedSaving.unit} / {tip.estimatedSaving.period === 'month' ? '월' : '년'}
                        </p>
                      </div>
                    )}
                    {tip.calculatorId && (
                      <Link href={`/calculator/${tip.calculatorId}`}>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          관련 계산기 보기
                        </Button>
                      </Link>
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
                : '아직 등록된 팁이 없습니다.'}
            </p>
          </Card>
        )}

        {/* AdSense Slot 3 */}
        <AdSenseSlot slotId="tips-bottom" className="my-4 sm:my-5" />

        {/* 미니 계산기 섹션 (기존 유지) */}
        <div className="mt-5 sm:mt-6 md:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">빠른 계산기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/calculator/electricity">
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">전기요금 절약 계산기</h3>
                <p className="text-sm text-gray-600">
                  전기 사용량을 줄여서 절약할 수 있는 금액을 계산합니다
                </p>
              </Card>
            </Link>
            <Link href="/calculator/gas">
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl mb-2">🔥</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">가스요금 절약 계산기</h3>
                <p className="text-sm text-gray-600">
                  가스 사용량을 줄여서 절약할 수 있는 금액을 계산합니다
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
