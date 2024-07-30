import { createRouter } from './core/router';
import ListPage from './pages/ListPage';
import ErrorPage from './pages/ErrorPage';
import { Router } from './core/router/types/router';
import { render, unMountDOM } from './core/createComponent/index';

export let router: Router;

export function init(root: HTMLElement): Router {
  // 초기 라우터 설정
  router = createRouter({
    routes: {
      '/': () => render(ListPage({ path: '/' }), root),
      '/tech': () => render(ListPage({ path: '/tech' }), root),
      '/design': () => render(ListPage({ path: '/design' }), root),
      // TODO: '/articles:articleId': detailPage(articleId)}
    },
    root,
    errorPage: () => render(ErrorPage(), root),
    unMountPage: (page) => unMountDOM(page, root),
  });
  return router;
}
