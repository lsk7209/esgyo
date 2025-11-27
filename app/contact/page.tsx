/**
 * Contact 페이지
 * AdSense 검수: 연락처 정보 제공
 */

import type { Metadata } from 'next';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '문의하기 - 이에스지요 서비스 문의 및 연락처',
  description: '이에스지요 서비스에 대한 문의사항을 남겨주세요. 탄소중립포인트 계산기, 신청 가이드, 절약 팁 등에 대한 질문을 받고 있습니다.',
  keywords: ['이에스지요 문의', '탄소중립포인트 문의', '서비스 문의', '연락처'],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: '문의하기 - 이에스지요 서비스 문의 및 연락처',
    description: '이에스지요 서비스에 대한 문의사항을 남겨주세요.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="문의하기"
        description="이에스지요 서비스에 대한 문의사항을 남겨주세요"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <Card className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 leading-tight">연락처 정보</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">이메일</h3>
              <p className="text-sm sm:text-base text-gray-700 break-words">
                <a href="mailto:support@esgyo.com" className="text-green-600 hover:underline">
                  support@esgyo.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">응답 시간</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                평일 기준 1-2일 이내 답변드립니다.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 leading-tight">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-2">계산 결과가 실제와 다를 수 있나요?</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                네, 본 서비스는 참고용 예상치를 제공합니다. 실제 포인트는 환경부 공식 시스템을 통해 확인하시기 바랍니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-2">신청은 어떻게 하나요?</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                <a href="/guide" className="text-green-600 hover:underline">
                  신청 가이드 페이지
                </a>에서 자세한 방법을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 sm:p-6 md:p-8 mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">다른 페이지 둘러보기</h2>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a href="/calculator" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto min-h-[44px]">
              포인트 계산기
            </Button>
          </a>
          <a href="/guide" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto min-h-[44px]">
              신청 가이드
            </Button>
          </a>
          <a href="/tips" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto min-h-[44px]">
              절약 팁
            </Button>
          </a>
          <a href="/blog" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto min-h-[44px]">
              블로그
            </Button>
          </a>
        </div>
      </Card>
    </PageContainer>
  );
}
