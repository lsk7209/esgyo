/**
 * 계산기 메인 페이지
 * 확장 가능한 계산기 목록 및 선택 UI
 */

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import AdSenseSlot from '@/components/ads/AdSenseSlot';
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

        {/* AdSense Slot 1 - 상단 */}
        <AdSenseSlot slotId="calculator-top" className="my-4 sm:my-5" />

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
            <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="text-5xl sm:text-6xl md:text-7xl">{CALCULATORS[0].icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors">
                    {CALCULATORS[0].title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    {CALCULATORS[0].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CALCULATORS[0].keywords.slice(0, 3).map((keyword, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-white/80 rounded-full text-xs sm:text-sm text-gray-600 font-medium"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* AdSense Slot 2 - 중단 */}
        <AdSenseSlot slotId="calculator-middle" className="my-4 sm:my-5" />

        {/* 다른 계산기 목록 */}
        <div className="mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">📊 다른 계산기</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ACTIVE_CALCULATORS.slice(1).map((calculator) => (
              <Link key={calculator.id} href={calculator.route}>
                <Card className="p-5 sm:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer h-full group border hover:border-green-300">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{calculator.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors">
                    {calculator.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                    {calculator.description}
                  </p>
                  <div className="flex items-center text-green-600 font-semibold text-sm sm:text-base group-hover:text-green-700 transition-colors">
                    계산하기 <span className="ml-1">→</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* 카테고리별 계산기 */}
        <div className="space-y-6 sm:space-y-8">
          {/* 절약 계산기 */}
          {CALCULATORS_BY_CATEGORY.saving.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">💰 절약 계산기</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {CALCULATORS_BY_CATEGORY.saving.map((calculator) => (
                  <Link key={calculator.id} href={calculator.route}>
                    <Card className={`p-5 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${calculator.status === 'coming-soon' ? 'opacity-60' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className="text-3xl sm:text-4xl">{calculator.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{calculator.title}</h3>
                            {calculator.status === 'coming-soon' && (
                              <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">준비중</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{calculator.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 비교 계산기 */}
          {CALCULATORS_BY_CATEGORY.comparison.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">⚖️ 비교 계산기</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {CALCULATORS_BY_CATEGORY.comparison.map((calculator) => (
                  <Link key={calculator.id} href={calculator.route}>
                    <Card className={`p-5 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${calculator.status === 'coming-soon' ? 'opacity-60' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className="text-3xl sm:text-4xl">{calculator.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{calculator.title}</h3>
                            {calculator.status === 'coming-soon' && (
                              <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">준비중</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{calculator.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 감량 계산기 */}
          {CALCULATORS_BY_CATEGORY.reduction.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">♻️ 감량 계산기</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {CALCULATORS_BY_CATEGORY.reduction.map((calculator) => (
                  <Link key={calculator.id} href={calculator.route}>
                    <Card className={`p-5 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${calculator.status === 'coming-soon' ? 'opacity-60' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className="text-3xl sm:text-4xl">{calculator.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{calculator.title}</h3>
                            {calculator.status === 'coming-soon' && (
                              <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">준비중</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{calculator.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AdSense Slot 3 - 하단 */}
        <AdSenseSlot slotId="calculator-bottom" className="my-4 sm:my-5" />

        {/* 관련 가이드 섹션 */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">더 알아보기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/guide">
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="text-lg sm:text-xl font-bold mb-2">📖 신청 가이드</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  탄소중립포인트 신청 방법과 제휴 은행·카드사 안내
                </p>
              </Card>
            </Link>
            <Link href="/tips">
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h3 className="text-lg sm:text-xl font-bold mb-2">💡 절약 팁</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  일상 속에서 쉽게 실천할 수 있는 절약 팁과 추가 포인트 받는 방법
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
