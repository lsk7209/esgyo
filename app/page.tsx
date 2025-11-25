/**
 * Root Page - Gateway (Intent Splitter)
 * Green = 개인 / Navy = 기업
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            ESGyo
          </h1>
          <p className="text-lg text-gray-600">
            탄소 배출량 계산 및 진단 서비스
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* B2C - 개인용 */}
          <Card className="p-8 bg-green-50 border-green-200 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                개인용
              </h2>
              <p className="text-gray-600">
                탄소중립포인트 계산 및 개인 탄소 발자국 확인
              </p>
              <Link href="/personal/calculator">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  시작하기
                </Button>
              </Link>
            </div>
          </Card>
          
          {/* B2B - 기업용 */}
          <Card className="p-8 bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                기업용
              </h2>
              <p className="text-gray-600">
                Scope 1·2 배출량 계산 및 ESG 진단 리포트
              </p>
              <Link href="/business/calculator">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  시작하기
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
