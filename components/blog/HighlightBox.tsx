/**
 * 강조 박스 컴포넌트
 * 중요한 정보를 시각적으로 강조
 */

'use client';

import { Card } from '@/components/ui/card';

interface HighlightBoxProps {
  type?: 'info' | 'tip' | 'warning' | 'success' | 'important';
  title?: string;
  children: React.ReactNode;
  icon?: string;
}

const typeStyles = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: '💡',
    titleColor: 'text-blue-900',
  },
  tip: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '✨',
    titleColor: 'text-green-900',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: '⚠️',
    titleColor: 'text-yellow-900',
  },
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: '✅',
    titleColor: 'text-emerald-900',
  },
  important: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: '🔥',
    titleColor: 'text-orange-900',
  },
};

export default function HighlightBox({
  type = 'info',
  title,
  children,
  icon,
}: HighlightBoxProps) {
  const style = typeStyles[type];
  const displayIcon = icon || style.icon;

  return (
    <div className="my-6 animate-fade-in">
      <Card className={`p-5 sm:p-6 ${style.bg} ${style.border} border-l-4`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">{displayIcon}</span>
          <div className="flex-1">
            {title && (
              <h4 className={`font-bold text-lg mb-2 ${style.titleColor}`}>
                {title}
              </h4>
            )}
            <div className="text-gray-800 leading-relaxed">{children}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

