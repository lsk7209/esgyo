/**
 * B2B Calculator Page
 * Scope 1·2 배출량 계산기
 */

'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useBusinessStore } from '@/stores/businessStore';
import { messages } from '@/constants/messages';
import { logFunnel } from '@/lib/logging';
import { normalizeInput } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert } from '@/components/ui/alert';
import { IndustryBenchmarks } from '@/constants/industryData';
import { costToUsage } from '@/constants/unitPrices';
import { formatEmission } from '@/lib/formatting';
import PageHeader from '@/components/layout/PageHeader';
import PageContainer from '@/components/layout/PageContainer';
import dynamic from 'next/dynamic';
import JSONLD from '@/components/seo/JSONLD';

// Recharts 동적 import (ssr: false)
const EmissionChart = dynamic(
  () => import('@/components/business/EmissionChart'),
  { 
    ssr: false,
    loading: () => <EmissionChartSkeleton />
  }
);

// 스켈레톤도 동적 import
const EmissionChartSkeleton = dynamic(
  () => import('@/components/business/EmissionChartSkeleton'),
  { ssr: false }
);

export default function BusinessCalculatorPage() {
  const router = useRouter();
  const {
    inputMode,
    industry,
    electricity,
    gas,
    fuel,
    totalEmission,
    setInputMode,
    setIndustry,
    setElectricity,
    setGas,
    setFuel,
    calculate
  } = useBusinessStore();

  useEffect(() => {
    logFunnel('calculator_view', { industry });
  }, [industry]);

  const handleNext = useCallback(() => {
    if (totalEmission > 0) {
      router.push('/business/diagnosis');
    }
  }, [totalEmission, router]);

  const handleElectricityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setElectricity(value);
  }, [setElectricity]);

  const handleGasChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setGas(value);
  }, [setGas]);

  const handleFuelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);
    setFuel(value);
  }, [setFuel]);

  // useMemo로 계산 최적화
  const isCostMode = useMemo(() => inputMode === 'cost', [inputMode]);
  
  const elecUsage = useMemo(() => {
    return isCostMode ? costToUsage(electricity, 'electricity') : electricity;
  }, [isCostMode, electricity]);
  
  const gasUsage = useMemo(() => {
    return isCostMode ? costToUsage(gas, 'gas') : gas;
  }, [isCostMode, gas]);
  
  const fuelUsage = useMemo(() => {
    return isCostMode ? costToUsage(fuel, 'fuel') : fuel;
  }, [isCostMode, fuel]);

  // JSONLD 데이터 메모이제이션
  const softwareAppData = useMemo(() => ({
    name: '이에스지요 Scope 1·2 배출량 계산기',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: '전기, 가스, 연료 사용량 또는 비용을 입력하여 탄소 배출량을 계산하는 도구',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW'
    }
  }), []);

  return (
    <>
      <JSONLD type="SoftwareApplication" data={softwareAppData} />
      <PageContainer maxWidth="4xl">
        <PageHeader
          title={messages.CALCULATOR_TITLE}
          description={messages.CALCULATOR_DESCRIPTION}
        />

        <Card className="p-6">
          <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as 'usage' | 'cost')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="usage">사용량 입력</TabsTrigger>
              <TabsTrigger value="cost">비용 입력</TabsTrigger>
            </TabsList>
            
            <TabsContent value="usage" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="electricity">전기 사용량 (kWh)</Label>
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
                  <Label htmlFor="gas">가스 사용량 (MJ)</Label>
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
                  <Label htmlFor="fuel">연료 사용량 (L)</Label>
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
            </TabsContent>
            
            <TabsContent value="cost" className="space-y-4 mt-6">
              <Alert>
                <p className="text-sm">{messages.COST_TO_USAGE_WARNING}</p>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="electricity-cost">전기 비용 (원)</Label>
                  <Input
                    id="electricity-cost"
                    type="number"
                    min="0"
                    step="1"
                    value={electricity || ''}
                    onChange={handleElectricityChange}
                    placeholder="0"
                    aria-label="전기 비용 입력"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gas-cost">가스 비용 (원)</Label>
                  <Input
                    id="gas-cost"
                    type="number"
                    min="0"
                    step="1"
                    value={gas || ''}
                    onChange={handleGasChange}
                    placeholder="0"
                    aria-label="가스 비용 입력"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fuel-cost">연료 비용 (원)</Label>
                  <Input
                    id="fuel-cost"
                    type="number"
                    min="0"
                    step="1"
                    value={fuel || ''}
                    onChange={handleFuelChange}
                    placeholder="0"
                    aria-label="연료 비용 입력"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Label htmlFor="industry">업종</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="업종을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {IndustryBenchmarks.map((benchmark) => (
                  <SelectItem key={benchmark.category} value={benchmark.category}>
                    {benchmark.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {totalEmission > 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">배출량 분석</h2>
                <div className="text-3xl font-bold text-blue-600">
                  {formatEmission(totalEmission)}
                </div>
              </div>
              
              <EmissionChart
                electricity={elecUsage}
                gas={gasUsage}
                fuel={fuelUsage}
              />
            </div>
          </Card>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={totalEmission === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            aria-label={totalEmission === 0 ? '배출량을 계산한 후 진단할 수 있습니다' : '진단 페이지로 이동'}
          >
            진단하기
          </Button>
        </div>
      </PageContainer>
    </>
  );
}

