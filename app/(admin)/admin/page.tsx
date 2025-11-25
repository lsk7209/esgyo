/**
 * Admin Dashboard Page
 * KPI Dashboard
 */

'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { messages } from '@/constants/messages';
import { getKPIData } from '@/lib/logging';

export default function AdminPage() {
  const [kpiData, setKpiData] = useState({
    totalSessions: 0,
    diagnosisRate: 0,
    pdfDownloadRate: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // 실제 환경에서는 API로 조회
    const data = getKPIData();
    setKpiData(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {messages.ADMIN_TITLE}
          </h1>
          <p className="text-gray-600">
            {messages.ADMIN_DESCRIPTION}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Sessions
            </h3>
            <div className="text-3xl font-bold text-blue-600">
              {kpiData.totalSessions.toLocaleString()}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Diagnosis Rate
            </h3>
            <div className="text-3xl font-bold text-green-600">
              {kpiData.diagnosisRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              diagnosis_view / calculator_view
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              PDF Download Rate
            </h3>
            <div className="text-3xl font-bold text-purple-600">
              {kpiData.pdfDownloadRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              pdf_download / diagnosis_view
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Conversion Rate
            </h3>
            <div className="text-3xl font-bold text-orange-600">
              {kpiData.conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              cta_click / pdf_download
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">로그 보존 정책</h2>
          <p className="text-sm text-gray-600">
            모든 로그는 12개월 보존 후 자동 삭제되거나 통계 데이터만 남깁니다.
            개인정보 보호를 위해 원본 로그는 장기 보관하지 않습니다.
          </p>
        </Card>
      </div>
    </div>
  );
}

