/**
 * About 페이지
 * AdSense 검수: 사이트 소개 및 신뢰성 구축
 */

import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="ESGyo 소개"
        description="탄소중립포인트 계산 및 신청 가이드를 제공하는 서비스입니다"
      />

      <div className="space-y-6 sm:space-y-8">
        <Card className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">ESGyo는 무엇인가요?</h2>
          <div className="prose max-w-none space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              ESGyo는 개인 소비자를 위한 탄소중립포인트 계산 및 신청 가이드 서비스입니다. 
              복잡한 정부 제도를 3분 요약으로 쉽게 이해하고, 내가 받을 수 있는 포인트를 정확히 계산할 수 있도록 도와드립니다.
            </p>
            <p>
              환경부에서 운영하는 탄소중립포인트 제도는 텀블러 사용, 대중교통 이용, 종이 영수증 미발급 등 
              일상 속 작은 친환경 실천을 통해 연간 최대 70,000원까지 포인트를 받을 수 있는 제도입니다.
            </p>
            <p>
              ESGyo는 이러한 제도를 더 많은 사람들이 쉽게 이해하고 활용할 수 있도록 돕기 위해 만들어졌습니다.
            </p>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">주요 기능</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">📊 정확한 포인트 계산</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                환경부 기준으로 실제 받을 수 있는 포인트를 정확히 계산해드립니다. 
                텀블러 사용, 대중교통 이용, 종이 영수증 미발급 등 다양한 활동을 입력하면 
                연간 예상 포인트와 현금화 금액을 즉시 확인할 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">📖 쉬운 신청 가이드</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                복잡한 정부 제도를 3분 요약으로 쉽게 이해할 수 있도록 정리했습니다. 
                신청 방법, 제휴 은행 및 카드사 안내, 자주 묻는 질문 등을 한눈에 볼 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">💡 실용적인 절약 팁</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                일상 속에서 쉽게 실천할 수 있는 절약 팁과 추가 포인트를 받는 방법을 알려드립니다. 
                전기요금 절약, 가스요금 절약 등 다양한 절약 방법을 계산기와 함께 제공합니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">📝 유용한 정보 공유</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                실제 사용자 후기, 사례, 트렌드 등 유용한 정보를 블로그를 통해 공유합니다. 
                다른 사람들의 경험을 통해 더 많은 포인트를 받는 방법을 배울 수 있습니다.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 md:p-8 bg-green-50">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight">면책사항</h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            본 서비스에서 제공하는 계산 결과는 참고용이며, 환경부 공식 기준을 바탕으로 한 예상치입니다. 
            실제 받을 수 있는 포인트는 환경부 공식 시스템을 통해 확인하시기 바랍니다. 
            포인트 계산 결과와 실제 적립 포인트는 차이가 있을 수 있으며, 이에 대한 책임은 지지 않습니다.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}

