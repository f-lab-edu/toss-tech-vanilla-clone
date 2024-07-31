import { Router } from './types/router';
import { CreateRouterProps } from './types/router';

/**
 * 라우터를 생성합니다.
 * @param {CreateRouterProps} props - 라우터 생성에 필요한 속성
 * @returns {Router} - 라우터 인터페이스를 반환합니다.
 */
export function createRouter<T>({
  routes,
  root,
  render,
  errorPage,
  onRouteChange,
}: CreateRouterProps<T>): Router {
  // 패스에 따라 새로운 컴퍼넌트를 렌더링 하는 함수를 저장한다.
  const routeMap = routes;

  /**
   * 주어진 경로에 따라 적절한 페이지 컴포넌트를 렌더링합니다.
   * @param {string} path - 렌더링할 경로
   */
  function route(path: string) {
    onRouteChange({ currentElement: root?.firstElementChild as HTMLElement });
    const page: T = routeMap[path]() || errorPage();
    render(page);
    bindEventListener(root);
  }

  /**
   * 링크(a 태그들) 클릭 시 처리할 페이지 이동 이벤트를 page에 위임한다.
   * 링크 내 요소가 클릭 되었을 때, a 태그로 인식되지 못하고 새로고침 된다.
   * 따라서, 부모 요소에 link가 있는지 확인하고, a 태그의 href를 통해 path를 가져온다.
   * @param {HTMLElement} page - 이벤트 리스너를 추가할 페이지 엘리먼트
   */
  function bindEventListener(page: HTMLElement) {
    page.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link) {
        // 부모 요소에 link가 있는지 확인
        e.preventDefault();
        const path = link.getAttribute('href') || '/404';
        if (path !== window.location.pathname) {
          push(path);
        }
      }
    });
  }

  /**
   * 주어진 경로로 브라우저 히스토리를 업데이트하고 페이지를 렌더링합니다.
   * @param {string} path - 이동할 경로
   */
  function push(path: string) {
    history.pushState({}, '', path);
    route(path);
  }

  /**
   * 주어진 경로로 브라우저 히스토리를 대체하고 페이지를 렌더링합니다.
   * @param {string} path - 대체할 경로
   */
  function replace(path: string) {
    history.replaceState(null, '', path);
    route(path);
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

  // 초기 페이지 렌더링
  route(window.location.pathname);

  // back, forward를 위한 root popstate eventListener 추가
  window.addEventListener('popstate', () => {
    route(window.location.pathname);
  });

  return { push, replace, back, forward, go };
}
