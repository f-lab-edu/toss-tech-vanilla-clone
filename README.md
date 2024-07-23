# toss-tech-vanilla-clone

Toss Tech blog SPA clone developed with VanillaJS, custom renderer, and routing modules.

토스 테크 SPA를 frontend framework 또는 library 없이 VanillaJS, 커스텀 라우터, 커스텀 렌더러 모듈로 구현

## 사용 기술, 라이브러리, 프레임워크

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## 구현 상세 내용

- 커스텀 렌더러 모듈: `src/core/createComponent`에 위치
- 커스텀 라우터 모듈: `src/core/router`에 위치

## 추후 작업 할 추가 기능

- Virtual DOM and Diffing Algorithm을 통한 렌더러 모듈 구현
- 라우터 모듈 Dual Package Support(CJS, EJS)
- List, Detail Page

## 프로젝트 인스톨 방법

[pnpm 설치](https://pnpm.io/installation) 후 `pnpm install` 실행

## 실행 방법

`npm run dev` 스크립트 실행
