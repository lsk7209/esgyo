/**
 * 절약 팁 상세 페이지
 * 동적 라우팅으로 확장 가능한 구조
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import { getContent, getRelatedContent } from '@/lib/content';
import { CONTENT_CATEGORIES } from '@/constants/contentCategories';
import JSONLD from '@/components/seo/JSONLD';
import type { Metadata } from 'next';

interface TipPostPageProps {
  params: {
    slug: string;
  };
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: TipPostPageProps): Promise<Metadata> {
  const tip = getContent(params.slug);
  
  if (!tip || tip.type !== 'tip') {
    return {
      title: '팁을 찾을 수 없습니다',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esgyo.com';
  
  return {
    title: tip.metaTitle || tip.title,
    description: tip.metaDescription || tip.description,
    keywords: tip.keywords,
    alternates: {
      canonical: `${baseUrl}/tips/${tip.slug}`,
    },
    openGraph: {
      title: tip.metaTitle || tip.title,
      description: tip.metaDescription || tip.description,
      type: 'article',
      publishedTime: tip.publishedAt,
      modifiedTime: tip.updatedAt,
      url: `${baseUrl}/tips/${tip.slug}`,
    },
  };
}

export default function TipPostPage({ params }: TipPostPageProps) {
  const tip = getContent(params.slug);

  if (!tip || tip.type !== 'tip') {
    notFound();
  }

  const categoryConfig = CONTENT_CATEGORIES[tip.category];
  const relatedTips = getRelatedContent(tip.id, 3);

  // HowTo JSON-LD (절약 팁은 HowTo 스키마 적합)
  const howToData = {
    name: tip.title,
    description: tip.description,
    step: [
      {
        '@type': 'HowToStep',
        text: tip.content,
      },
    ],
  };

  return (
    <>
      <JSONLD type="HowTo" data={howToData} />
      <PageContainer maxWidth="4xl">
        {/* 뒤로가기 버튼 */}
        <div className="mb-4 sm:mb-6">
          <Link href="/tips">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              ← 절약 팁 목록으로
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
            {tip.difficulty && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                tip.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                tip.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {tip.difficulty === 'easy' ? '쉬움' : tip.difficulty === 'medium' ? '보통' : '어려움'}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {tip.title}
          </h1>
          {tip.estimatedSaving && (
            <div className="p-4 bg-green-50 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-1">예상 절약</p>
              <p className="text-2xl font-bold text-green-600">
                {tip.estimatedSaving.amount.toLocaleString()}{tip.estimatedSaving.unit} / {tip.estimatedSaving.period === 'month' ? '월' : '년'}
              </p>
            </div>
          )}
        </div>


        {/* 본문 */}
        <Card className="p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
          <div 
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: tip.content }}
          />
        </Card>

        {/* 관련 계산기 */}
        {tip.calculatorId && (
          <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">관련 계산기</h3>
                <p className="text-sm text-gray-600">이 팁의 절약 효과를 계산해보세요</p>
              </div>
              <Link href={`/calculator/${tip.calculatorId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  계산하기 →
                </Button>
              </Link>
            </div>
          </Card>
        )}


        {/* 태그 */}
        {tip.tags.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-gray-700">태그</h3>
            <div className="flex flex-wrap gap-2">
              {tip.tags.map((tag) => (
                <Link key={tag} href={`/tips?tag=${tag}`}>
                  <Button variant="outline" size="sm" className="min-h-[36px]">
                    #{tag}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 관련 팁 */}
        {relatedTips.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">관련 팁</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedTips.map((related) => {
                const relatedCategoryConfig = CONTENT_CATEGORIES[related.category];
                return (
                  <Link key={related.id} href={`/tips/${related.slug}`}>
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


        {/* CTA */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              더 많은 절약 팁을 확인하세요
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/tips">
                <Button className="bg-green-600 hover:bg-green-700 text-white min-h-[48px] px-6 sm:px-8">
                  모든 절약 팁 보기
                </Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline" className="min-h-[48px] px-6 sm:px-8">
                  계산기 보기
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}

