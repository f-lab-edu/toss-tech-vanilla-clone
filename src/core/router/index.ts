import { Router } from './types/router';

/**
 * 라우터 생성에 필요한 속성을 정의합니다.
 * @interface CreateRouterProps
 * @property {{ [key: string]: Element }} routes - 경로와 해당 컴포넌트 매핑
 * @property {HTMLElement} root - 라우터가 작동할 루트 엘리먼트
 */
interface CreateRouterProps {
  routes: { [key: string]: Element };
  root: HTMLElement;
  errorPage: HTMLElement;
}

/**
 * 라우터를 생성합니다.
 * @function
 * @name createRouter
 * @param {ICreateRouterProps} props - 라우터 생성에 필요한 속성
 * @returns {Router} - 라우터 인터페이스를 반환합니다.
 */
export function createRouter({
  routes,
  root,
  errorPage,
}: CreateRouterProps): Router {
  const routeMap: { [key: string]: Element } = routes;

  /**
   * 주어진 경로에 따라 적절한 페이지 컴포넌트를 렌더링합니다.
   * @function
   * @name render
   * @param {string} path - 렌더링할 경로
   */
  function render(path: string) {
    const newPageComponent = routeMap[path] || errorPage;
    if (!newPageComponent) return;
    const $page = document.querySelector('.page');
    if ($page) {
      root.removeChild($page);
    }
    root.appendChild(newPageComponent);
    bindEventListener();
  }

  /**
   * 주어진 경로로 브라우저 히스토리를 업데이트하고 페이지를 렌더링합니다.
   * @function
   * @name push
   * @param {string} path - 이동할 경로
   */
  function push(path: string) {
    history.pushState({ path }, '', path);
    render(path);
  }

  /**
   * 주어진 경로로 브라우저 히스토리를 대체하고 페이지를 렌더링합니다.
   * @function
   * @name replace
   * @param {string} path - 대체할 경로
   */
  function replace(path: string) {
    history.replaceState(null, '', path);
    render(path);
  }

  /**
   * 브라우저 히스토리에서 뒤로 이동합니다.
   * @function
   * @name back
   */
  function back() {
    history.back();
  }

  /**
   * 브라우저 히스토리에서 앞으로 이동합니다.
   * @function
   * @name forward
   */
  function forward() {
    history.forward();
  }

  /**
   * 브라우저 히스토리에서 주어진 만큼 이동합니다.
   * @function
   * @name go
   * @param {number} delta - 이동할 히스토리 스택의 거리
   */
  function go(delta: number) {
    history.go(delta);
  }

  /**
   * 모든 링크(a 태그들)에서 경로 속성을 찾아 이벤트 리스너를 추가합니다.
   * @function
   * @name bindEventListener
   */
  function bindEventListener() {
    /**
     * 클릭한 요소에 a tag으로 감싸져 있는지 확인하고, 있다면 이동할 path를 반환한다.
     * @param {HTMLElement} element
     * @returns {string | null} - 페이지 이동 path
     */
    function hasLink(element: HTMLElement | null): string | null {
      while (element) {
        if (element.tagName.toLowerCase() === 'a') {
          return element.getAttribute('href');
        }
        element = element.parentElement;
      }
      return null;
    }

    root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const path = hasLink(target);
      if (path) {
        e.preventDefault();
        push(path);
      }
    });
  }

  // back, forward를 위한 root popstate eventListener 추가
  window.addEventListener('popstate', () => {
    const path = document.location.pathname;
    render(path);
  });

  // 초기 페이지 로드
  const path = window.location.pathname;
  push(path);

  return { push, replace, back, forward, go };
}
