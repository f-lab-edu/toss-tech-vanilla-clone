import { Router } from './types/router';

/**
 * 라우터 생성에 필요한 속성을 정의합니다.
 * @interface CreateRouterProps
 * @property {{ [key: string]: HTMLElement }} routes - 경로와 해당 컴포넌트 매핑
 * @property {HTMLElement} root - 라우터가 작동할 루트 엘리먼트
 * @property {HTMLElement} errorPage - 에러 페이지 엘리먼트
 */
interface CreateRouterProps {
  routes: { [key: string]: HTMLElement };
  root: HTMLElement;
  errorPage: HTMLElement;
}

/**
 * 라우터를 생성합니다.
 * @param {CreateRouterProps} props - 라우터 생성에 필요한 속성
 * @returns {Router} - 라우터 인터페이스를 반환합니다.
 */
export function createRouter({
  routes,
  root,
  errorPage,
}: CreateRouterProps): Router {
  const routeMap: { [key: string]: HTMLElement } = routes;

  /**
   * 주어진 경로에 따라 적절한 페이지 컴포넌트를 렌더링합니다.
   * @param {string} path - 렌더링할 경로
   */
  function render(path: string) {
    const newPage = routeMap[path] || errorPage;

    // 기존 모든 자식 요소 제거
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    bindEventListener(newPage);
    root.appendChild(newPage);
  }

  /**
   * 주어진 경로로 브라우저 히스토리를 업데이트하고 페이지를 렌더링합니다.
   * @param {string} path - 이동할 경로
   */
  function push(path: string) {
    history.pushState({ path }, '', path);
    render(path);
  }

  /**
   * 주어진 경로로 브라우저 히스토리를 대체하고 페이지를 렌더링합니다.
   * @param {string} path - 대체할 경로
   */
  function replace(path: string) {
    history.replaceState(null, '', path);
    render(path);
  }

  /**
   * 브라우저 히스토리에서 뒤로 이동합니다.
   */
  function back() {
    history.back();
  }

  /**
   * 브라우저 히스토리에서 앞으로 이동합니다.
   */
  function forward() {
    history.forward();
  }

  /**
   * 브라우저 히스토리에서 주어진 만큼 이동합니다.
   * @param {number} delta - 이동할 히스토리 스택의 거리
   */
  function go(delta: number) {
    history.go(delta);
  }

  /**
   * 모든 링크(a 태그들)에서 경로 속성을 찾아 이벤트 리스너를 추가합니다.
   * @param {HTMLElement} page - 이벤트 리스너를 추가할 페이지 엘리먼트
   */
  function bindEventListener(page: HTMLElement) {
    page.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('href') || '/404';
        if (path !== window.location.pathname) {
          push(path);
        }
      }
    });
  }

  // back, forward를 위한 root popstate eventListener 추가
  window.addEventListener('popstate', () => {
    render(window.location.pathname);
  });

  // 초기 페이지 로드
  push(window.location.pathname);

  return { push, replace, back, forward, go };
}
