/**
 * 진행 바 컴포넌트
 * 단계별 진행 상황 시각화
 */

'use client';

interface ProgressBarProps {
  steps: Array<{
    label: string;
    completed: boolean;
  }>;
  currentStep?: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="my-6 space-y-4">
      {steps.map((step, index) => {
        const isActive = currentStep !== undefined ? index === currentStep : step.completed;
        const isCompleted = step.completed || (currentStep !== undefined && index < currentStep);

        return (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300"
              style={{
                backgroundColor: isCompleted ? '#10b981' : isActive ? '#fbbf24' : '#e5e7eb',
                borderColor: isCompleted ? '#10b981' : isActive ? '#fbbf24' : '#d1d5db',
                color: isCompleted || isActive ? '#ffffff' : '#9ca3af',
              }}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">{step.label}</div>
              {isActive && !isCompleted && (
                <div className="h-1 bg-green-200 rounded-full animate-progress" />
              )}
              {isCompleted && (
                <div className="h-1 bg-green-500 rounded-full" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

