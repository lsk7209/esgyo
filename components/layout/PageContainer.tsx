/**
 * 페이지 컨테이너 공통 컴포넌트
 * 일관된 레이아웃 제공
 */

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
};

export default function PageContainer({ 
  children, 
  maxWidth = '4xl',
  className = '' 
}: PageContainerProps) {
  return (
    <div className={`bg-gray-50 py-8 px-4 ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto space-y-6`}>
        {children}
      </div>
    </div>
  );
}

