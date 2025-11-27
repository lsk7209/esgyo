/**
 * 계산기 메인 페이지
 * 확장 가능한 계산기 목록 및 선택 UI
 */

'use client';

import type { Metadata } from 'next';
import { useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { CALCULATORS, ACTIVE_CALCULATORS, CALCULATORS_BY_CATEGORY } from '@/constants/calculators';
import JSONLD from '@/components/seo/JSONLD';

export default function CalculatorMainPage() {
  // FAQ JSON-LD for AEO
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '어떤 계산기를 사용할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '탄소중립포인트 계산기, 전기요금 절약 계산기, 가스요금 절약 계산기, 대중교통 vs 자차 비교 계산기 등을 제공합니다. 각 계산기는 간단한 정보만 입력하면 즉시 결과를 확인할 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '계산 결과는 정확한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '본 서비스에서 제공하는 계산 결과는 참고용 예상치입니다. 환경부 공식 기준을 바탕으로 계산하지만, 실제 포인트나 절약 금액은 환경부 공식 시스템이나 실제 사용량을 통해 확인하시기 바랍니다.'
        }
      },
    ]
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        <PageHeader
          title="다양한 계산기로 절약 효과 확인하기"
          description="탄소중립포인트부터 전기·가스요금 절약까지, 일상 속 작은 실천으로 얼마나 절약할 수 있는지 계산해보세요"
        />

        {/* 메인 계산기 - 탄소중립포인트 (강조) */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">🌟 메인 계산기</h2>
            <Link href="/calculator/carbon-point">
              <Button className="bg-green-600 hover:bg-green-700 text-white min-h-[44px]">
                바로 계산하기 →
              </Button>
            </Link>
          </div>
          
          <Link href="/calculator/carbon-point">
            <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="text-4xl sm:text-5xl md:text-6xl flex-shrink-0" role="img" aria-label="탄소중립포인트 계산기">🌱</div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                    탄소중립포인트 계산기
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                    텀블러 사용, 대중교통 이용 등으로 받을 수 있는 포인트와 현금화 금액을 계산합니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                      연간 최대 7만원
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                      환경부 기준
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* 카테고리별 계산기 */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {/* 절약 계산기 */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-gray-900">💰 절약 계산기</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {CALCULATORS_BY_CATEGORY.saving.filter(calc => calc.status === 'active').map((calc) => (
                <Link key={calc.id} href={calc.route}>
                  <Card className="p-4 sm:p-5 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3" role="img" aria-label={`${calc.title} 아이콘`}>{calc.icon}</div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-gray-900">{calc.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{calc.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* 비교 계산기 */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-gray-900">⚖️ 비교 계산기</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {CALCULATORS_BY_CATEGORY.comparison.filter(calc => calc.status === 'active').map((calc) => (
                <Link key={calc.id} href={calc.route}>
                  <Card className="p-4 sm:p-5 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3" role="img" aria-label={`${calc.title} 아이콘`}>{calc.icon}</div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-gray-900">{calc.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{calc.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* 감축 계산기 */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-gray-900">♻️ 감축 계산기</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {CALCULATORS_BY_CATEGORY.reduction.filter(calc => calc.status === 'active').map((calc) => (
                <Link key={calc.id} href={calc.route}>
                  <Card className="p-4 sm:p-5 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3" role="img" aria-label={`${calc.title} 아이콘`}>{calc.icon}</div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-gray-900">{calc.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{calc.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
