# Router 모듈

`Router` 모듈은 클라이언트 사이드에서 경로 관리를 위한 기능을 제공합니다. 이 모듈을 통해 경로를 매칭하고, 컴포넌트를 렌더링하며, 브라우저 히스토리를 관리할 수 있습니다.

## 주요 기능

### `createRouter`

라우터를 생성합니다.

- **매개변수**:
  - `routes`: 경로 맵.
  - `root`: 루트 요소.
  - `render`: 렌더링 함수.
  - `errorPage`: 에러 페이지 컴포넌트.
  - `onRouteChange`: 라우트 변경 시 실행되는 함수.
- **반환값**: `Router` 인터페이스.

## 제공하는 기능들

- `createRouter`: 라우터 생성
  - `route`: 경로에 따른 페이지 렌더링
  - `bindEventListener`: 링크 클릭 이벤트 처리
  - `push`: 경로 이동 및 히스토리 업데이트
  - `replace`: 경로 대체 및 히스토리 업데이트
  - `back`: 히스토리 뒤로 이동
  - `forward`: 히스토리 앞으로 이동
  - `go`: 히스토리에서 특정 거리만큼 이동

## 사용 예제

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
