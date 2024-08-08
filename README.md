# toss-tech-vanilla-clone

[토스 테크 SPA](https://toss.tech/)를 frontend framework 또는 library 없이 VanillaJS로 구현. 라우터 모듈과 렌더러 모듈 별도 구현

Toss Tech blog SPA clone developed with VanillaJS, custom renderer, and routing modules.

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

- [커스텀 렌더러 모듈](src/core/createComponent/README.md): `src/core/createComponent`
- [커스텀 라우터 모듈](src/core/router/README.md): `src/core/router`
- Dual Package Support(CJS, ESM): `dist`

## Router 모듈

`Router` 모듈은 클라이언트 사이드에서 경로 관리를 위한 기능을 제공합니다. 이 모듈을 통해 경로를 매칭하고, 컴포넌트를 렌더링하며, 브라우저 히스토리를 관리할 수 있습니다. 제네릭하게 디자인되어 다양한 프로젝트에서 재사용이 가능합니다.

### 주요 기능

#### `createRouter`

라우터를 생성합니다.

- **매개변수**:
  - `routes`: 경로 맵.
  - `root`: 루트 요소.
  - `render`: 렌더링 함수.
  - `errorPage`: 에러 페이지 컴포넌트.
  - `onRouteChange`: 라우트 변경 시 실행되는 함수.
- **반환값**: `Router` 인터페이스.

### 제공하는 기능들

- `createRouter`: 라우터 생성
  - `route`: 경로에 따른 페이지 렌더링
  - `bindEventListener`: 링크 클릭 이벤트 처리
  - `push`: 경로 이동 및 히스토리 업데이트
  - `replace`: 경로 대체 및 히스토리 업데이트
  - `back`: 히스토리 뒤로 이동
  - `forward`: 히스토리 앞으로 이동
  - `go`: 히스토리에서 특정 거리만큼 이동

### 사용 예제

```typescript
import { createRouter } from './router';

const routes = {
  '/': () => HomePage,
  '/about': () => AboutPage,
  '/user/[id]': (params) => UserPage(params),
};

const root = document.getElementById('root');
const render = (page) => {
  root.innerHTML = '';
  root.appendChild(page);
};
const errorPage = () => ErrorPage;

const onRouteChange = ({ currentElement }) => {
  console.log('Route changed', currentElement);
};

const router = createRouter({
  routes,
  root,
  render,
  errorPage,
  onRouteChange,
});

router.push('/about');
```

## createComponent 모듈

`createComponent` 모듈은 Virtual DOM을 사용하여 효율적인 UI 렌더링을 가능하게 하는 기능을 제공합니다. 이 모듈은 컴포넌트를 생성하고, 속성을 설정하며, 이벤트를 바인딩하는 등 다양한 기능을 포함하고 있습니다.

### 주요 기능

#### 1. `createComponent`

컴포넌트를 생성하고 초기 상태와 렌더 함수, 마운트 후 실행될 함수를 설정합니다.

- **매개변수**:
  - `initialState`: 컴포넌트의 초기 상태.
  - `render`: 상태를 기반으로 Virtual DOM을 생성하는 함수.
  - `componentDidMount`: 컴포넌트가 처음 마운트될 때 실행될 함수.
- **반환값**: `VComponent` 생성된 컴포넌트.

#### 2. `createElement`

Virtual DOM 요소를 생성합니다. React의 `createElement`와 유사한 역할을 합니다.

- **매개변수**:
  - `type`: 요소 타입 (예: `div`, `span` 등).
  - `attributes`: 요소의 속성들.
  - `classnames`: 요소의 클래스명 배열.
  - `event`: 요소에 바인딩할 이벤트 객체.
  - `children`: 자식 요소들.
- **반환값**: `VElement` 생성된 Virtual DOM 요소.

#### 3. `mount`

Virtual DOM을 실제 DOM으로 변환하여 특정 루트 요소에 삽입합니다.

- **매개변수**:
  - `component`: 렌더링할 컴포넌트.
  - `root`: 루트 요소.
- **동작**: 기존 요소가 있으면 제거하고, 새로운 요소를 삽입합니다. `componentDidMount` 함수가 정의되어 있다면 호출합니다.

#### 4. `unmount`

특정 DOM 요소를 루트 요소에서 제거합니다.

- **매개변수**:
  - `dom`: 제거할 DOM 요소.
  - `root`: 루트 요소.

### 사용 예제

```typescript
import { createComponent, createElement, mount } from './createComponent';

const MyComponent = createComponent({
  initialState: { count: 0 },
  render: (state, setState) => {
    return createElement({
      type: 'div',
      children: [
        `Count: ${state.count}`,
        createComponent({
          render: () => {
            return createElement({
                type: 'button',
                attributes: { id: 'increment' },
                children: ['Increment'],
                event: {
                  type: 'click',
                  listener: () => setState({ count: state.count + 1 }),
                },
              }),
          }
        })
      ],
    });
  },
  componentDidMount: (state, setState) => {
    console.log('Component has mounted');
  },
});

const root = document.getElementById('root');
if (root) {
  mount(MyComponent, root);
}
```

## 프로젝트 인스톨 방법

[pnpm 설치](https://pnpm.io/installation) 후 `pnpm install` 실행

## 실행 방법

`npm run dev` 스크립트 실행
