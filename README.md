# 이에스지요 - 탄소중립포인트 계산기

## 프로젝트 개요

이에스지요는 **개인 소비자**를 위한 탄소중립포인트 계산 및 신청 가이드 서비스입니다.

- **타겟**: 20-50대, 앱테크·절약·환경 관심층
- **핵심 가치**: 내가 당장 **얼마나 받을 수 있는지(현금/포인트)** 숫자로 보여주기
- **수익 모델**: AdSense 자동광고 (콘텐츠·계산기형)

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **SEO**: JSON-LD, Sitemap, Robots.txt

## 프로젝트 구조

```
app/
├── /                    # 홈페이지 (랜딩 + 계산기 요약)
├── /calculator          # 탄소중립포인트 계산기 메인
├── /guide               # 신청 가이드 (AEO/FAQ)
├── /tips                # 절약 팁 (미니 계산기 포함)
├── /blog                # 블로그 (롱폼 콘텐츠)
├── /privacy             # 개인정보처리방침
└── /terms               # 이용약관

components/
├── ads/                 # AdSense 슬롯 컴포넌트
├── layout/              # 공통 레이아웃 컴포넌트
└── ui/                  # Shadcn UI 컴포넌트

constants/
├── rewardRules.ts       # 포인트 보상 규칙
└── messages.ts          # 메시지 중앙 관리

stores/
└── personalStore.ts     # 개인용 Zustand Store

lib/
├── pointCalculator.ts   # 포인트 계산 로직
├── formatting.ts        # 포맷팅 유틸리티
└── validation.ts        # 입력 검증
```

## 주요 기능

### 1. 탄소중립포인트 계산기 (`/calculator`)

- 텀블러 사용, 종이 영수증 미발급, 다회용 컵 리필, 대중교통 이용 등 입력
- 연간 예상 포인트 및 현금화 금액 산출
- CO₂ 감축량 및 나무 심기 효과 표시
- AdSense 광고 슬롯 3곳 (상단, 중단, 하단)

### 2. 신청 가이드 (`/guide`)

- 질문형 H2 + 직답 구조 (AEO 최적화)
- FAQ JSON-LD 스키마
- 제휴 은행 및 카드사 안내
- 내부 링크로 계산기 연결

### 3. 절약 팁 (`/tips`)

- 전기요금 절약 계산기
- 가스요금 절약 계산기
- 일상 속 절약 팁 콘텐츠
- 내부 링크로 계산기 및 가이드 연결

### 4. 블로그 (`/blog`)

- 롱폼 콘텐츠 (AdSense 최적화)
- 실제 사용자 후기 및 사례
- 내부 링크로 전환 유도

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

## AdSense 통합

### 광고 슬롯 위치

- **홈페이지**: 상단, 중단, 하단
- **계산기**: 상단, 중단, 하단
- **가이드**: 상단, 중간 3곳, 하단
- **팁**: 상단, 중간 4곳, 하단
- **블로그**: 상단, 포스트 사이, 하단

### 개발 환경

개발 환경에서는 플레이스홀더만 표시됩니다.

### 프로덕션 환경

`components/ads/AdSenseSlot.tsx`에 실제 AdSense 코드를 삽입하세요.

## SEO / AEO 전략

### 키워드

- 메인: 탄소중립포인트, 탄소중립 포인트 계산기, 환경부 포인트
- 롱테일: 텀블러 할인, 전기요금 절약 계산기, 대중교통 탄소 절감

### 구조

- 모든 H2를 질문형으로 작성
- 바로 아래 2-3문장 직답 배치
- 본문 300자 이내에 내부 링크 1개 필수

## 환경 변수

```env
NEXT_PUBLIC_SITE_URL=https://esgyo.kr
NODE_ENV=production
```

## 라이선스

MIT
