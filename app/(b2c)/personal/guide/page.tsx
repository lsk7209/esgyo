/**
 * B2C Guide Page
 * AEO 최적화: 질문형 H2 + 직답 구조
 */

'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import JSONLD from '@/components/seo/JSONLD';

export default function PersonalGuidePage() {
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '탄소중립포인트는 어떻게 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '탄소중립포인트는 전기, 가스, 연료 사용량을 줄이거나 친환경 제품을 구매할 때 받을 수 있습니다. 정부 앱이나 웹사이트를 통해 신청하고, 사용량 데이터를 제출하면 자동으로 포인트가 적립됩니다.'
        }
      },
      {
        '@type': 'Question',
        name: '탄소중립포인트는 어떻게 사용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '탄소중립포인트는 현금으로 전환하거나, 대중교통 할인, 친환경 제품 구매 시 할인 등 다양한 혜택에 사용할 수 있습니다.'
        }
      }
    ]
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            탄소중립포인트란 무엇인가?
          </h1>
          <p className="text-lg text-gray-600">
            탄소중립포인트는 개인이 탄소 배출을 줄이는 행동을 할 때 받을 수 있는 인센티브 포인트입니다.
            환경부에서 운영하는 제도로, 포인트는 현금으로 전환하거나 다양한 혜택에 사용할 수 있습니다.
          </p>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            탄소중립포인트는 어떻게 받을 수 있나요?
          </h2>
          <p className="text-gray-700 mb-4">
            탄소중립포인트는 전기, 가스, 연료 사용량을 줄이거나 친환경 제품을 구매할 때 받을 수 있습니다.
            정부 앱이나 웹사이트를 통해 신청하고, 사용량 데이터를 제출하면 자동으로 포인트가 적립됩니다.
          </p>
          
          <div className="space-y-3 mt-6">
            <div>
              <h3 className="font-semibold text-lg">1. 전기 사용량 절감</h3>
              <p className="text-gray-600">전월 대비 전기 사용량을 줄이면 포인트를 받을 수 있습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">2. 가스 사용량 절감</h3>
              <p className="text-gray-600">가스 사용량을 줄이면 추가 포인트를 받을 수 있습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">3. 친환경 제품 구매</h3>
              <p className="text-gray-600">친환경 인증 제품을 구매하면 포인트가 적립됩니다.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            탄소중립포인트는 어떻게 사용하나요?
          </h2>
          <p className="text-gray-700">
            탄소중립포인트는 현금으로 전환하거나, 대중교통 할인, 친환경 제품 구매 시 할인 등 다양한 혜택에 사용할 수 있습니다.
            포인트 사용 방법은 정부 앱에서 확인할 수 있으며, 매월 사용 가능한 혜택이 업데이트됩니다.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Q: 포인트는 언제 적립되나요?</h3>
              <p className="text-gray-600">
                A: 사용량 데이터 제출 후 약 1-2주 내에 포인트가 적립됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Q: 포인트는 얼마나 받을 수 있나요?</h3>
              <p className="text-gray-600">
                A: 절감량에 따라 다르지만, 월 최대 수만 원 상당의 포인트를 받을 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Q: 포인트는 만료되나요?</h3>
              <p className="text-gray-600">
                A: 포인트는 적립 후 1년간 유효하며, 기간 내에 사용하지 않으면 소멸됩니다.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}

