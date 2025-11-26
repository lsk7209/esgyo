/**
 * Contact 페이지
 * AdSense 검수: 연락처 정보 제공
 */

import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="문의하기"
        description="ESGyo 서비스에 대한 문의사항을 남겨주세요"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">이메일</h3>
              <p className="text-gray-700">
                <a href="mailto:support@esgyo.com" className="text-green-600 hover:underline">
                  support@esgyo.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">응답 시간</h3>
              <p className="text-gray-700">
                평일 기준 1-2일 이내 답변드립니다.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">계산 결과가 실제와 다를 수 있나요?</h3>
              <p className="text-gray-700 text-sm">
                네, 본 서비스는 참고용 예상치를 제공합니다. 실제 포인트는 환경부 공식 시스템을 통해 확인하시기 바랍니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">신청은 어떻게 하나요?</h3>
              <p className="text-gray-700 text-sm">
                <a href="/guide" className="text-green-600 hover:underline">
                  신청 가이드 페이지
                </a>에서 자세한 방법을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">다른 페이지 둘러보기</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/calculator">
            <Button variant="outline">포인트 계산기</Button>
          </a>
          <a href="/guide">
            <Button variant="outline">신청 가이드</Button>
          </a>
          <a href="/tips">
            <Button variant="outline">절약 팁</Button>
          </a>
          <a href="/blog">
            <Button variant="outline">블로그</Button>
          </a>
        </div>
      </Card>
    </PageContainer>
  );
}

