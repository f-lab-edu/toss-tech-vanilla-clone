interface Page {
  page: () => HTMLElement;
  unMountPage: (component: ChildNode) => void;
}

interface Route {
  [key: string]: Page;
}

/**
 * 라우터 생성에 필요한 속성을 정의합니다.
 * @interface CreateRouterProps
 * @property {{ [key: string]: () => HTMLElement }} routes - 경로와 해당 컴포넌트 매핑
 * @property {HTMLElement} root - 라우터가 작동할 루트 엘리먼트
 * @property {() => HTMLElement} errorPage - 에러 페이지를 반환하는 함수
 */
interface CreateRouterProps {
  // routes: { [key: string]: Page };
  routes: { [key: string]: () => HTMLElement };
  root: HTMLElement;
  errorPage: () => HTMLElement;
  unMountPage: (dom: HTMLElement) => void;
}

interface LinkProps {
  to: string;
  classnames?: string[];
  children?: HTMLElement[];
}

interface Router {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
  go: (delta: number) => void;
}

export { Route, CreateRouterProps, LinkProps, Router };
