# 로딩 상태 및 스켈레톤 UI 가이드

## 구현된 로딩 상태

### 1. 페이지별 로딩 상태

#### Next.js 14 App Router Loading Pattern
각 페이지에 `loading.tsx` 파일을 추가하여 자동 로딩 상태 제공:

- `app/loading.tsx` - 전역 로딩 상태
- `app/(b2b)/business/calculator/loading.tsx` - 계산기 페이지
- `app/(b2b)/business/diagnosis/loading.tsx` - 진단 페이지
- `app/(b2b)/business/report/loading.tsx` - 리포트 페이지
- `app/(b2c)/personal/calculator/loading.tsx` - 개인 계산기 페이지
- `app/(admin)/admin/loading.tsx` - 관리자 대시보드

### 2. 동적 Import 로딩 상태

#### EmissionChart
- `EmissionChartSkeleton` 컴포넌트로 로딩 상태 표시
- Recharts 라이브러리 로딩 중 스켈레톤 표시

#### PDFGenerator
- PDF 생성 컴포넌트 로딩 중 스켈레톤 표시
- 사용자 피드백 개선

### 3. 로딩 컴포넌트

#### LoadingSpinner (`components/ui/loading-spinner.tsx`)
- 재사용 가능한 스피너 컴포넌트
- 크기 옵션: sm, md, lg
- 접근성: `role="status"`, `aria-label` 포함

#### Skeleton (`components/ui/skeleton.tsx`)
- Shadcn UI Skeleton 컴포넌트
- 콘텐츠 영역을 시각적으로 표현

## 사용 방법

### 페이지 로딩 상태
```tsx
// app/example/loading.tsx
export default function ExampleLoading() {
  return <Skeleton />;
}
```

### 동적 Import 로딩
```tsx
const Component = dynamic(
  () => import('./Component'),
  { 
    ssr: false,
    loading: () => <ComponentSkeleton />
  }
);
```

### 수동 로딩 상태
```tsx
const [isLoading, setIsLoading] = useState(false);

{isLoading ? (
  <LoadingSpinner size="md" />
) : (
  <Content />
)}
```

## 접근성

모든 로딩 상태는 접근성을 고려하여 구현:

- `role="status"`: 스크린 리더에 상태 알림
- `aria-label`: 명확한 설명
- `sr-only`: 시각적 힌트 (스크린 리더 전용)

## 성능 최적화

- 로딩 상태는 최소한의 JavaScript로 구현
- 스켈레톤 UI는 CSS 애니메이션 사용
- 불필요한 리렌더링 방지

