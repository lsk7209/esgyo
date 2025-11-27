/**
 * 통계 카드 컴포넌트
 * 숫자와 통계를 시각적으로 표현
 */

'use client';

import { Card } from '@/components/ui/card';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: string;
  color?: 'green' | 'blue' | 'purple' | 'orange';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const colorClasses = {
  green: 'text-green-600 bg-green-50 border-green-200',
  blue: 'text-blue-600 bg-blue-50 border-blue-200',
  purple: 'text-purple-600 bg-purple-50 border-purple-200',
  orange: 'text-orange-600 bg-orange-50 border-orange-200',
};

export default function StatCard({
  value,
  label,
  icon,
  color = 'green',
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <div className="transform transition-all duration-300 hover:scale-105 animate-fade-in">
      <Card className={`p-5 ${colorClasses[color]} border-2`}>
        <div className="flex items-center justify-between mb-2">
          {icon && <span className="text-2xl">{icon}</span>}
          {trend && trendValue && (
            <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </span>
          )}
        </div>
        <div className="text-3xl font-bold mb-1 animate-count-up">
          {value}
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </Card>
    </div>
  );
}

