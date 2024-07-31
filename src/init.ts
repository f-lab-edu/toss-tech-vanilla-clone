import { createRouter } from './core/router';
import ListPage from './pages/ListPage';
import ErrorPage from './pages/ErrorPage';
import { Router } from './core/router/types/router';
import { render, unmount } from './core/createComponent/index';
import { VComponent } from './core/createComponent/types/createComponent';

export let router: Router;

export function init(root: HTMLElement): Router {
  // 초기 라우터 설정
  router = createRouter<VComponent>({
    routes: {
      '/': () => ListPage({ path: '/' }),
      '/tech': () => ListPage({ path: '/tech' }),
      '/design': () => ListPage({ path: '/design' }),
      // TODO: '/articles:articleId': detailPage(articleId)}
    },
    root,
    render: (component: VComponent) => render(component, root),
    errorPage: () => ErrorPage(),
    onRouteChange: ({ currentElement }) => {
      if (currentElement) {
        unmount(currentElement, root);
      }
    },
  });
  return router;
}
