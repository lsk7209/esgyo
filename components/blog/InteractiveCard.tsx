/**
 * 인터랙티브 카드 컴포넌트
 * 이미지 대체용 애니메이션 및 인터랙티브 요소
 */

'use client';

import { Card } from '@/components/ui/card';

interface InteractiveCardProps {
  title: string;
  description: string;
  icon?: string;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'yellow';
  children?: React.ReactNode;
  className?: string;
}

const colorClasses = {
  green: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
  blue: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200',
  purple: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200',
  orange: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',
  yellow: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200',
};

export default function InteractiveCard({
  title,
  description,
  icon,
  color = 'green',
  children,
  className = '',
}: InteractiveCardProps) {
  return (
    <div className={`transform transition-all duration-300 hover:scale-[1.02] ${className}`}>
      <Card className={`p-6 ${colorClasses[color]} border-2 transition-all duration-300 hover:shadow-lg shadow-md`}>
        {icon && (
          <div className="text-4xl mb-4 inline-block transition-transform duration-500 hover:rotate-360">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </Card>
    </div>
  );
}

