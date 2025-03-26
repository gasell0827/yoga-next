# 🧘 Yoga Project - Next.js

React Native 웹뷰에서 사용할 요가 웹 페이지 프로젝트입니다.

## 📌 목차

- [🧘 Yoga Project - Next.js](#-yoga-project---nextjs)
  - [📌 목차](#-목차)
  - [🛠 기술 스택](#-기술-스택)
  - [🚀 시작하기](#-시작하기)
    - [필수 조건](#필수-조건)
    - [의존성 설치](#의존성-설치)
    - [개발 서버 실행](#개발-서버-실행)
  - [📜 개발 스크립트](#-개발-스크립트)
  - [📐 코드 컨벤션](#-코드-컨벤션)
  - [🌟 주요 기능](#-주요-기능)
  - [📄 라이선스](#-라이선스)

## 🛠 기술 스택

**주요 개발 도구 선정 이유**

- `pnpm`: 디스크 공간 효율성 향상 및 엄격한 종속성 관리를 위해 채택
- `Next.js`: SSR/SSG 지원, SEO 최적화, 향상된 앱 라우팅 시스템
- `Tailwind CSS`: 유틸리티-퍼스트 접근 방식으로 빠른 스타일링 가능
- `Turbopack`: Rust 기반 번들러로 개발 서버 성능 700% 향상 (Webpack 대비)
- `Husky` + `lint-staged`: Git 훅을 이용한 자동화 코드 검증 시스템 구축
- `React Query`: 서버 상태 관리를 위한 선언적 데이터 페칭 및 캐싱 (자동 리페칭, 에러 핸들링, 캐시 무효화 지원)
- `Zustand`: 경량화된 상태 관리 솔루션 (Redux 대비 1/4 수준의 번들 사이즈, 직관적인 API 설계)

## 🚀 시작하기

### 필수 조건

- Node.js `v20.18.1` 이상
- pnpm `v10.x` 이상

```zsh
# pnpm 설치 (Homebrew 사용 시)
brew install pnpm
```

### 의존성 설치

```zsh
pnpm install
```

### 개발 서버 실행

```zsh
pnpm dev
```

## 📜 개발 스크립트

```json
{
  "scripts": {
    "dev": "next dev --turbopack", // 개발 모드 실행
    "build": "next build", // 프로덕션 빌드
    "start": "next start", // 빌드 결과 실행
    "lint": "next lint", // ESLint 실행
    "prepare": "husky" // Git 훅 초기화
  }
}
```

## 📐 코드 컨벤션

- ESLint: Next.js 기본 규칙 + Airbnb 스타일 가이드
- Prettier: 일관된 코드 포맷팅
- 커밋 메시지: [AngularJS commit conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#file-commit-md) 규칙 준수
  - `feat` (feature)
  - `fix` (bug fix)
  - `docs` (documentation)
  - `style` (formatting, missing semi colons, …)
  - `refactor`
  - `test` (when adding missing tests)
  - `chore` (maintain)

```zsh
# Lint 검사 (커밋 전 자동 실행)
pnpm lint

# 수동 검사 시
pnpm lint:fix
```

## 🌟 주요 기능

- 강사의 수련 / 수업 / 할 일 관리
- 캘린더 기능
- 아사나 / 호흡 / 무드라 백과사전
- 피드 - 커뮤니티
- 모바일 최적화 반응형 디자인
- 웹뷰-네이티브 간 브릿지 통신 지원

## 📄 라이선스

MIT License © 2024 Yoga Project
