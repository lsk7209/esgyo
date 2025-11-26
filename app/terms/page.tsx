/**
 * 이용약관 페이지
 */

import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="이용약관"
        description="ESGyo 서비스 이용약관"
      />

      <Card className="p-8">
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">제1조 (목적)</h2>
            <p className="text-gray-700">
              본 약관은 ESGyo(이하 "회사")가 제공하는 탄소중립포인트 계산 서비스(이하 "서비스")의 이용과 관련하여 
              회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">제2조 (정의)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>"서비스"란 회사가 제공하는 탄소중립포인트 계산 및 관련 정보 제공 서비스를 의미합니다.</li>
              <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 개인을 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">제3조 (서비스의 제공)</h2>
            <p className="text-gray-700">
              회사는 다음과 같은 서비스를 제공합니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>탄소중립포인트 계산 서비스</li>
              <li>탄소중립포인트 신청 가이드 제공</li>
              <li>절약 팁 및 관련 정보 제공</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">제4조 (면책사항)</h2>
            <p className="text-gray-700">
              본 서비스에서 제공하는 계산 결과는 참고용이며, 실제 받을 수 있는 포인트와는 차이가 있을 수 있습니다. 
              정확한 포인트는 환경부 공식 시스템을 통해 확인하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">제5조 (문의처)</h2>
            <p className="text-gray-700">
              서비스 이용과 관련된 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다.
            </p>
            <p className="text-gray-700 mt-4">
              이메일: support@esgyo.com
            </p>
          </section>
        </div>
      </Card>
    </PageContainer>
  );
}

