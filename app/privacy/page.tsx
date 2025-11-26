/**
 * 개인정보처리방침 페이지
 */

import PageContainer from '@/components/layout/PageContainer';
import PageHeader from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <PageContainer maxWidth="4xl">
      <PageHeader
        title="개인정보처리방침"
        description="ESGyo 서비스 개인정보 처리 방침"
      />

      <Card className="p-8">
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-gray-700">
              ESGyo는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
              이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>탄소중립포인트 계산 서비스 제공</li>
              <li>서비스 이용 통계 및 분석</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. 개인정보의 처리 및 보유기간</h2>
            <p className="text-gray-700">
              ESGyo는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 
              개인정보를 처리·보유합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700">
              ESGyo는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 
              정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. 정보주체의 권리·의무 및 행사방법</h2>
            <p className="text-gray-700">
              정보주체는 ESGyo에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>개인정보 처리정지 요구</li>
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정·삭제 요구</li>
              <li>개인정보 처리정지 요구</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. 개인정보의 파기</h2>
            <p className="text-gray-700">
              ESGyo는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
              지체 없이 해당 개인정보를 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. 문의처</h2>
            <p className="text-gray-700">
              개인정보 처리에 관한 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다.
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

