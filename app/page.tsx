/**
 * 홈페이지 - 랜딩 + 메인 계산기 요약
 * 개인용 탄소중립포인트 계산기
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import AdSenseSlot from '@/components/ads/AdSenseSlot';

export default function Home() {
  return (
    <PageContainer maxWidth="4xl">
      {/* Hero Section */}
      <div className="text-center space-y-4 sm:space-y-6 py-6 sm:py-8 md:py-12">
        <PageHeader
          title="올해 내가 받을 수 있는 탄소중립포인트는?"
          description="3분만 투자하면 1년 동안 받을 수 있는 포인트와 현금화 금액을 확인할 수 있습니다"
        />
        
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-center mb-3">
            <span className="text-3xl sm:text-4xl md:text-5xl">🌱</span>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
            연간 최대 70,000원까지 받을 수 있어요!
          </p>
          <p className="text-green-50 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            텀블러 사용, 대중교통 이용 등 일상 속 작은 실천으로 포인트를 받아보세요
          </p>
        </div>
      </div>

      {/* AdSense Slot 1 - 상단 */}
      <AdSenseSlot slotId="home-top" className="my-8" />

      {/* 메인 계산기 요약 */}
      <Card className="p-5 sm:p-7 md:p-9 shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-7 text-gray-900">
          빠른 계산기
        </h2>
        <div className="space-y-5 mb-6 sm:mb-8">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            간단한 정보만 입력하면 바로 예상 포인트를 확인할 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md active:scale-[0.98] transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl sm:text-2xl">☕</span>
                <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">텀블러 사용</p>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-1">주 3회</p>
              <p className="text-xs sm:text-sm text-gray-600">→ 연간 약 46,800원</p>
            </div>
            <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md active:scale-[0.98] transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl sm:text-2xl">🚇</span>
                <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">대중교통 이용</p>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1">월 100km</p>
              <p className="text-xs sm:text-sm text-gray-600">→ 연간 약 6,000원</p>
            </div>
          </div>
        </div>
        
        <Link href="/calculator" className="block">
          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-base sm:text-lg font-semibold py-5 sm:py-6 md:py-7 min-h-[48px] sm:min-h-[52px] rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            자세히 계산하기 →
          </Button>
        </Link>
      </Card>

      {/* AdSense Slot 2 - 중단 */}
      <AdSenseSlot slotId="home-middle" className="my-8" />

      {/* 주요 기능 소개 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-14">
        <Card className="p-4 sm:p-5 md:p-6 lg:p-7 text-center hover:shadow-xl active:scale-[0.98] transition-all duration-300 border-0 bg-white group">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 md:mb-5 transform group-hover:scale-110 transition-transform duration-300">🧮</div>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">정확한 계산</h3>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
            환경부 기준으로 실제 받을 수 있는 포인트를 정확히 계산해드립니다. 
            텀블러 사용, 대중교통 이용 등 다양한 활동을 입력하면 즉시 예상 포인트를 확인할 수 있습니다.
          </p>
        </Card>
        
        <Card className="p-4 sm:p-5 md:p-6 lg:p-7 text-center hover:shadow-xl active:scale-[0.98] transition-all duration-300 border-0 bg-white group">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 md:mb-5 transform group-hover:scale-110 transition-transform duration-300">📖</div>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">신청 가이드</h3>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
            복잡한 정부 제도를 3분 요약으로 쉽게 이해하고 신청할 수 있습니다. 
            자주 묻는 질문과 답변을 통해 신청 과정을 단계별로 안내해드립니다.
          </p>
        </Card>
        
        <Card className="p-4 sm:p-5 md:p-6 lg:p-7 text-center hover:shadow-xl active:scale-[0.98] transition-all duration-300 border-0 bg-white group sm:col-span-2 lg:col-span-1">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 md:mb-5 transform group-hover:scale-110 transition-transform duration-300">💡</div>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900">절약 팁</h3>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
            일상 속에서 쉽게 실천할 수 있는 절약 팁과 추가 포인트 받는 방법을 알려드립니다. 
            전기요금, 가스요금 절약 계산기도 함께 제공합니다.
          </p>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="mt-10 sm:mt-14 text-center space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/guide" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-green-50 hover:border-green-300 transition-all duration-200">
              신청 방법 알아보기
            </Button>
          </Link>
          <Link href="/tips" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 border-2 hover:bg-green-50 hover:border-green-300 transition-all duration-200">
              절약 팁 보기
            </Button>
          </Link>
        </div>
      </div>

      {/* AdSense Slot 3 - 하단 */}
      <AdSenseSlot slotId="home-bottom" className="my-8" />
    </PageContainer>
  );
}
