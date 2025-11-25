# ESGyo - 탄소 배출량 계산 및 진단 서비스

## 프로젝트 개요

ESGyo는 개인 및 기업을 위한 탄소 배출량 계산 및 ESG 진단 서비스를 제공하는 웹 애플리케이션입니다.

- **B2C**: 탄소중립포인트 계산 및 개인 탄소 발자국 확인
- **B2B**: Scope 1·2 배출량 계산 및 ESG 진단 리포트

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **Charts**: Recharts (Dynamic Import)
- **PDF**: jsPDF + html2canvas (Dynamic Import)

## 프로젝트 구조

```
app/
├── (b2b)/business/          # 기업용 페이지
│   ├── calculator/          # 배출량 계산기
│   ├── diagnosis/           # 진단 페이지
│   └── report/              # PDF 리포트 (noindex)
├── (b2c)/personal/          # 개인용 페이지
│   ├── calculator/          # 탄소중립포인트 계산기
│   └── guide/               # 가이드 페이지
├── (admin)/admin/           # 관리자 대시보드 (noindex)
├── sitemap.xml/             # 메인 sitemap
├── sitemap-personal.xml/    # 개인용 sitemap
├── sitemap-business.xml/    # 기업용 sitemap
└── robots.ts                # robots.txt

components/
├── business/                # B2B 전용 컴포넌트
│   ├── EmissionChart.tsx    # 배출량 파이 차트
│   └── PDFGenerator.tsx    # PDF 생성 컴포넌트
├── seo/                     # SEO 컴포넌트
│   └── JSONLD.tsx          # 구조화된 데이터
└── ui/                      # Shadcn UI 컴포넌트

constants/
├── messages.ts              # 법적 문구 및 메시지 (중앙 관리)
├── unitPrices.ts           # 단가 정보
├── industryData.ts         # 업종별 벤치마크
├── emissionFactors.ts      # 배출 계수
└── riskLevel.ts            # 리스크 레벨 계산

stores/
└── businessStore.ts        # Zustand 상태 관리

lib/
└── logging.ts              # Funnel 로깅 시스템
```

## 주요 기능

### B2B (기업용)

1. **배출량 계산기** (`/business/calculator`)
   - 사용량 또는 비용 입력 모드
   - 실시간 배출량 계산
   - 배출량 Breakdown 파이 차트

2. **진단 페이지** (`/business/diagnosis`)
   - 리스크 레벨 표시
   - 업종 평균 대비 비교
   - calculator → diagnosis → report 순서 강제

3. **PDF 리포트** (`/business/report`)
   - 공식 ESG 리포트 생성
   - 법적 면책 조항 포함
   - robots: noindex

### B2C (개인용)

1. **탄소중립포인트 계산기** (`/personal/calculator`)
   - 개인 탄소 발자국 계산
   - 예상 포인트 표시

2. **가이드 페이지** (`/personal/guide`)
   - AEO 최적화 구조
   - FAQ 형식
   - JSON-LD 구조화된 데이터

### Admin

- **KPI 대시보드** (`/admin`)
  - Total Sessions
  - Diagnosis Rate
  - PDF Download Rate
  - Conversion Rate

## 개발 가이드

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 중요 사항

### 법적 문구 관리

모든 법적 문구, 경고, Tooltip, Disclaimer는 **절대 컴포넌트에서 하드코딩하지 않습니다**.
반드시 `constants/messages.ts`를 사용하세요.

### 동적 Import

- **Recharts**: `next/dynamic`으로 `ssr: false` 설정
- **react-pdf (jsPDF)**: `next/dynamic`으로 `ssr: false` 설정

이렇게 하면 초기 번들 크기를 줄이고 성능을 최적화할 수 있습니다.

### 로그 보존 정책

- 모든 로그는 **12개월 보존 후 자동 삭제** 또는 통계만 남김
- 개인정보 보호를 위해 원본 로그는 장기 보관하지 않음

### SEO 최적화

- `/business/report`와 `/business/diagnosis`는 `noindex`
- `/admin`은 `noindex`
- JSON-LD 구조화된 데이터 적용 (FAQPage, SoftwareApplication)
- Sitemap 분리 (personal, business)

## 환경 변수

```env
NEXT_PUBLIC_SITE_URL=https://esgyo.com
```

## 라이선스

MIT
