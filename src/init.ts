import { createRouter } from './core/router';
import ListPage from './pages/ListPage';
import ErrorPage from './pages/ErrorPage';
import { Router } from './core/router/types/router';
import { buildDOM } from './core/createComponent/index';

export let router: Router;

export function init(root: HTMLElement): Router {
  // 초기 라우터 설정
  router = createRouter({
    routes: {
      '/': () => buildDOM(ListPage({ path: '/' })),
      '/tech': () => buildDOM(ListPage({ path: '/tech' })),
      '/design': () => buildDOM(ListPage({ path: '/design' })),
      // TODO: '/articles:articleId': detailPage(articleId)}
    },
    root,
    errorPage: () => buildDOM(ErrorPage()),
  });
  return router;
}
