/**
 * 탄소중립포인트 신청 가이드 페이지
 * AEO/FAQ 최적화 구조
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import AdSenseSlot from '@/components/ads/AdSenseSlot';
import JSONLD from '@/components/seo/JSONLD';
import { useMemo } from 'react';

export default function GuidePage() {
  // FAQ JSON-LD for AEO
  const faqData = useMemo(() => ({
    mainEntity: [
      {
        '@type': 'Question',
        name: '탄소중립포인트는 어떻게 신청하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '환경부 탄소중립포인트 앱을 다운로드하거나 웹사이트에 접속하여 회원가입 후 신청할 수 있습니다. 텀블러 사용, 대중교통 이용 등 친환경 활동을 실천하고 관련 증빙 자료를 제출하면 자동으로 포인트가 적립됩니다.'
        }
      },
      {
        '@type': 'Question',
        name: '스타벅스 텀블러 할인과 중복되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 중복 가능합니다. 스타벅스에서 텀블러 할인을 받으면서 동시에 탄소중립포인트도 신청할 수 있습니다. 두 제도는 별개로 운영되므로 모두 혜택을 받을 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '탄소중립포인트는 어디서 사용할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '탄소중립포인트는 제휴 은행(국민은행, 신한은행 등)과 카드사(삼성카드, 신한카드 등)의 포인트로 전환하거나, 현금으로 환급받을 수 있습니다. 1포인트 = 1원 기준으로 환산됩니다.'
        }
      },
      {
        '@type': 'Question',
        name: '연간 최대 얼마까지 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '탄소중립포인트는 연간 최대 70,000포인트(70,000원)까지 받을 수 있습니다. 다양한 친환경 활동을 실천하면 상한선까지 포인트를 받을 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '대중교통 이용 거리는 어떻게 확인하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '대중교통 이용 거리는 교통카드 사용 내역이나 대중교통 앱의 이용 기록을 통해 확인할 수 있습니다. 환경부 앱에 이 정보를 연동하거나 수동으로 입력하여 신청할 수 있습니다.'
        }
      },
    ]
  }), []);

  return (
    <>
      <JSONLD type="FAQPage" data={faqData} />
      <PageContainer maxWidth="4xl">
        <PageHeader
          title="탄소중립포인트 신청 가이드"
          description="복잡한 정부 제도를 3분 요약으로 쉽게 이해하고 신청하는 방법"
        />

        {/* AdSense Slot 1 */}
        <AdSenseSlot slotId="guide-top" className="my-8" />

        {/* FAQ 섹션 */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">탄소중립포인트는 어떻게 신청하나요?</h2>
            <div className="text-gray-700 mb-4 space-y-3 leading-relaxed">
              <p>
                환경부 탄소중립포인트 앱을 다운로드하거나 웹사이트에 접속하여 회원가입 후 신청할 수 있습니다. 
                텀블러 사용, 대중교통 이용 등 친환경 활동을 실천하고 관련 증빙 자료를 제출하면 자동으로 포인트가 적립됩니다.
              </p>
              <p>
                신청 절차는 매우 간단합니다. 먼저 환경부 공식 앱이나 웹사이트에 접속하여 회원가입을 진행합니다. 
                이후 텀블러 사용, 대중교통 이용, 종이 영수증 미발급 등의 활동을 실천하고, 관련 증빙 자료를 제출하면 됩니다. 
                증빙 자료는 영수증, 교통카드 사용 내역, 텀블러 사용 사진 등이 될 수 있습니다.
              </p>
              <p>
                포인트는 활동 실천 후 약 1-2주 내에 자동으로 적립되며, 제휴 은행이나 카드사 포인트로 전환하거나 
                현금으로 환급받을 수 있습니다. 연간 최대 70,000원까지 받을 수 있으니, 꾸준히 실천하시면 좋습니다.
              </p>
            </div>
            <Link href="/calculator" className="text-green-600 hover:underline font-semibold">
              → 내가 받을 수 있는 포인트 계산하기
            </Link>
          </Card>

          <AdSenseSlot slotId="guide-middle-1" className="my-6" />

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">스타벅스 텀블러 할인과 중복되나요?</h2>
            <div className="text-gray-700 mb-4 space-y-3 leading-relaxed">
              <p>
                네, 중복 가능합니다. 스타벅스에서 텀블러 할인을 받으면서 동시에 탄소중립포인트도 신청할 수 있습니다. 
                두 제도는 별개로 운영되므로 모두 혜택을 받을 수 있습니다.
              </p>
              <p>
                스타벅스에서는 텀블러를 가져오면 음료 가격에서 일정 금액을 할인해주는 정책을 운영하고 있습니다. 
                이는 카페의 친환경 정책이며, 정부의 탄소중립포인트 제도와는 별개입니다. 
                따라서 스타벅스에서 텀블러 할인을 받으면서 동시에 환경부에 탄소중립포인트를 신청하면 
                할인 혜택과 포인트를 모두 받을 수 있습니다.
              </p>
              <p>
                다른 카페에서도 마찬가지로 텀블러 할인 정책이 있다면, 할인과 포인트를 동시에 받을 수 있습니다. 
                이는 친환경 실천을 장려하는 좋은 방법이므로 적극 활용하시기 바랍니다.
              </p>
            </div>
            <Link href="/tips" className="text-green-600 hover:underline font-semibold">
              → 더 많은 절약 팁 보기
            </Link>
          </Card>

          <AdSenseSlot slotId="guide-middle-2" className="my-6" />

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">탄소중립포인트는 어디서 사용할 수 있나요?</h2>
            <p className="text-gray-700 mb-4">
              탄소중립포인트는 제휴 은행(국민은행, 신한은행 등)과 카드사(삼성카드, 신한카드 등)의 포인트로 전환하거나, 
              현금으로 환급받을 수 있습니다. 1포인트 = 1원 기준으로 환산됩니다.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">연간 최대 얼마까지 받을 수 있나요?</h2>
            <p className="text-gray-700 mb-4">
              탄소중립포인트는 연간 최대 70,000포인트(70,000원)까지 받을 수 있습니다. 
              다양한 친환경 활동을 실천하면 상한선까지 포인트를 받을 수 있습니다.
            </p>
            <Link href="/calculator" className="text-green-600 hover:underline font-semibold">
              → 내 예상 포인트 계산하기
            </Link>
          </Card>

          <AdSenseSlot slotId="guide-middle-3" className="my-6" />

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">대중교통 이용 거리는 어떻게 확인하나요?</h2>
            <p className="text-gray-700 mb-4">
              대중교통 이용 거리는 교통카드 사용 내역이나 대중교통 앱의 이용 기록을 통해 확인할 수 있습니다. 
              환경부 앱에 이 정보를 연동하거나 수동으로 입력하여 신청할 수 있습니다.
            </p>
          </Card>

          {/* 제휴 은행/카드사 안내 */}
          <Card className="p-6 bg-blue-50">
            <h2 className="text-2xl font-bold mb-4">제휴 은행 및 카드사</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">제휴 은행</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• 국민은행</li>
                  <li>• 신한은행</li>
                  <li>• 우리은행</li>
                  <li>• 하나은행</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">제휴 카드사</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• 삼성카드</li>
                  <li>• 신한카드</li>
                  <li>• KB국민카드</li>
                  <li>• 하나카드</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              * 제휴 기관은 변경될 수 있으니 환경부 공식 사이트에서 최신 정보를 확인하세요.
            </p>
          </Card>
        </div>

        {/* AdSense Slot 2 - 하단 */}
        <AdSenseSlot slotId="guide-bottom" className="my-8" />

        {/* CTA */}
        <div className="mt-12 text-center space-y-4">
          <Link href="/calculator">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              내 포인트 계산하기
            </Button>
          </Link>
          <Link href="/tips">
            <Button variant="outline" size="lg" className="ml-4">
              절약 팁 보기
            </Button>
          </Link>
        </div>
      </PageContainer>
    </>
  );
}

