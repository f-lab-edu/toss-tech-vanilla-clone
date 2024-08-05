interface OnRouteChangeProps {
  /**
   * 현재 렌더링된 엘리먼트를 나타냅니다.
   * @type {HTMLElement}
   */
  currentElement: HTMLElement;
}

/**
 * 라우터 생성에 필요한 속성을 정의합니다.
 * @template T - 컴포넌트 타입
 */
interface CreateRouterProps<T> {
  /**
   * 경로와 해당 컴포넌트를 매핑하는 객체입니다.
   * @type {{ [key: string]: () => T }}
   */
  routes: { [key: string]: (props?: any) => T };

  /**
   * 라우터가 작동할 루트 엘리먼트입니다.
   * @type {HTMLElement}
   */
  root: HTMLElement;

  /**
   * 컴포넌트를 렌더링하는 함수입니다.
   * @param {T} component - 렌더링할 컴포넌트
   */
  render: (component: T) => void;

  /**
   * 에러 페이지를 반환하는 함수입니다.
   * @returns {T} 에러 페이지 컴포넌트
   */
  errorPage: () => T;

  /**
   * 라우트 변경 시 호출되는 함수입니다.
   * @param {OnRouteChangeProps} props - 라우트 변경 시 전달되는 속성
   */
  onRouteChange: (props: OnRouteChangeProps) => void;
}

/**
 * 링크 요소의 속성을 정의합니다.
 */
interface LinkProps {
  /**
   * 이동할 경로입니다.
   * @type {string}
   */
  to: string;

  /**
   * 설정할 클래스명 배열입니다.
   * @type {string[]}
   * @optional
   */
  classnames?: string[];

  /**
   * 자식 요소들입니다.
   * @type {HTMLElement[]}
   * @optional
   */
  children?: HTMLElement[];
}

/**
 * 라우터 인터페이스를 정의합니다.
 */
interface Router {
  /**
   * 새로운 경로로 이동합니다.
   * @param {string} path - 이동할 경로
   */
  push: (path: string) => void;

  /**
   * 현재 경로를 대체합니다.
   * @param {string} path - 대체할 경로
   */
  replace: (path: string) => void;

  /**
   * 뒤로 이동합니다.
   */
  back: () => void;

  /**
   * 앞으로 이동합니다.
   */
  forward: () => void;

  /**
   * 지정한 단계로 이동합니다.
   * @param {number} delta - 이동할 단계
   */
  go: (delta: number) => void;
}

export { OnRouteChangeProps, CreateRouterProps, LinkProps, Router };
