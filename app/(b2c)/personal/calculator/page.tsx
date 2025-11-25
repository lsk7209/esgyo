/**
 * B2C Personal Calculator Page
 * 탄소중립포인트 계산기
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { messages } from '@/constants/messages';
import { normalizeInput } from '@/lib/validation';
import { formatEmission, formatNumber } from '@/lib/formatting';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';

export default function PersonalCalculatorPage() {
  const [electricity, setElectricity] = useState(0);
  const [gas, setGas] = useState(0);
  const [fuel, setFuel] = useState(0);
  
  const handleElectricityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setElectricity(normalizeInput(e.target.value));
  }, []);
  
  const handleGasChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGas(normalizeInput(e.target.value));
  }, []);
  
  const handleFuelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFuel(normalizeInput(e.target.value));
  }, []);
  
  // useMemo로 계산 최적화
  const totalEmission = useMemo(() => {
    return (
      electricity * 0.4781 +
      gas * 0.056 +
      fuel * 2.097
    ) / 1000; // tCO2eq
  }, [electricity, gas, fuel]);
  
  const points = useMemo(() => {
    return Math.floor(totalEmission * 100); // 예시: 1tCO2eq = 100포인트
  }, [totalEmission]);

  return (
    <PageContainer maxWidth="2xl">
      <PageHeader
        title={messages.PERSONAL_CALCULATOR_TITLE}
        description={messages.PERSONAL_CALCULATOR_DESCRIPTION}
      />

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="electricity">전기 사용량 (kWh/월)</Label>
              <Input
                id="electricity"
                type="number"
                min="0"
                step="0.01"
                value={electricity || ''}
                onChange={handleElectricityChange}
                placeholder="0"
                aria-label="전기 사용량 입력"
              />
            </div>
            
            <div>
              <Label htmlFor="gas">가스 사용량 (MJ/월)</Label>
              <Input
                id="gas"
                type="number"
                min="0"
                step="0.01"
                value={gas || ''}
                onChange={handleGasChange}
                placeholder="0"
                aria-label="가스 사용량 입력"
              />
            </div>
            
            <div>
              <Label htmlFor="fuel">연료 사용량 (L/월)</Label>
              <Input
                id="fuel"
                type="number"
                min="0"
                step="0.01"
                value={fuel || ''}
                onChange={handleFuelChange}
                placeholder="0"
                aria-label="연료 사용량 입력"
              />
            </div>
          </div>
        </Card>

        {totalEmission > 0 && (
          <Card className="p-6 bg-green-50">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">탄소 배출량</h2>
                <div className="text-3xl font-bold text-green-600">
                  {formatEmission(totalEmission)}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">예상 포인트</h2>
                <div className="text-3xl font-bold text-blue-600">
                  {formatNumber(points)} P
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  * 실제 포인트는 정부 정책에 따라 변동될 수 있습니다.
                </p>
              </div>
            </div>
          </Card>
        )}
    </PageContainer>
  );
}

