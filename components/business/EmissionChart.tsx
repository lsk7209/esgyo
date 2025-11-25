/**
 * 배출량 Breakdown Pie Chart
 * Recharts 사용 (동적 import)
 */

'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { EmissionFactors } from '@/constants/emissionFactors';

interface EmissionChartProps {
  electricity: number;
  gas: number;
  fuel: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function EmissionChart({ electricity, gas, fuel }: EmissionChartProps) {
  // 상수에서 배출 계수 가져오기 (하드코딩 제거)
  const elecEmission = electricity * EmissionFactors.electricity / 1000;
  const gasEmission = gas * EmissionFactors.gas / 1000;
  const fuelEmission = fuel * EmissionFactors.fuel / 1000;
  
  const data = [
    { name: '전기', value: elecEmission },
    { name: '가스', value: gasEmission },
    { name: '연료', value: fuelEmission }
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        데이터를 입력해주세요
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: { name?: string; percent?: number }) => {
              const { name, percent } = props;
              if (!name || percent === undefined) return '';
              return `${name} ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(2)} tCO₂eq`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

