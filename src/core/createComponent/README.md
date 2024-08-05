# createComponent 모듈

`createComponent` 모듈은 Virtual DOM을 사용하여 효율적인 UI 렌더링을 가능하게 하는 기능을 제공합니다. 이 모듈은 컴포넌트를 생성하고, 속성을 설정하며, 이벤트를 바인딩하는 등 다양한 기능을 포함하고 있습니다.

## 주요 기능

### 1. `createComponent`

컴포넌트를 생성하고 초기 상태와 렌더 함수, 마운트 후 실행될 함수를 설정합니다.

- **매개변수**:
  - `initialState`: 컴포넌트의 초기 상태.
  - `render`: 상태를 기반으로 Virtual DOM을 생성하는 함수.
  - `componentDidMount`: 컴포넌트가 처음 마운트될 때 실행될 함수.
- **반환값**: `VComponent` 생성된 컴포넌트.

### 2. `createElement`

Virtual DOM 요소를 생성합니다. React의 `createElement`와 유사한 역할을 합니다.

- **매개변수**:
  - `type`: 요소 타입 (예: `div`, `span` 등).
  - `attributes`: 요소의 속성들.
  - `classnames`: 요소의 클래스명 배열.
  - `event`: 요소에 바인딩할 이벤트 객체.
  - `children`: 자식 요소들.
- **반환값**: `VElement` 생성된 Virtual DOM 요소.

### 3. `mount`

Virtual DOM을 실제 DOM으로 변환하여 특정 루트 요소에 삽입합니다.

- **매개변수**:
  - `component`: 렌더링할 컴포넌트.
  - `root`: 루트 요소.
- **동작**: 기존 요소가 있으면 제거하고, 새로운 요소를 삽입합니다. `componentDidMount` 함수가 정의되어 있다면 호출합니다.

### 4. `unmount`

특정 DOM 요소를 루트 요소에서 제거합니다.

- **매개변수**:
  - `dom`: 제거할 DOM 요소.
  - `root`: 루트 요소.

## 사용 예제

```typescript
import { createComponent, createElement, mount } from './createComponent';

const MyComponent = createComponent({
  initialState: { count: 0 },
  render: (state, setState) => {
    return createElement({
      type: 'div',
      children: [
        `Count: ${state.count}`,
        createElement({
          type: 'button',
          attributes: { id: 'increment' },
          children: ['Increment'],
          event: {
            type: 'click',
            listener: () => setState({ count: state.count + 1 }),
          },
        }),
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
