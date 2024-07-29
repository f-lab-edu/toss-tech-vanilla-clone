import { createRouter } from './core/router';
import ListPage from './pages/ListPage';
import ErrorPage from './pages/ErrorPage';
import { Router } from './core/router/types/router';
import { mountDOM, unMountDOM } from './core/createComponent/index';

export let router: Router;

export function init(root: HTMLElement): Router {
  // 초기 라우터 설정
  router = createRouter({
    routes: {
      '/': () => mountDOM(ListPage({ path: '/' })),
      '/tech': () => mountDOM(ListPage({ path: '/tech' })),
      '/design': () => mountDOM(ListPage({ path: '/design' })),
      // TODO: '/articles:articleId': detailPage(articleId)}
    },
    root,
    errorPage: () => mountDOM(ErrorPage()),
    unMountPage: unMountDOM,
  });
  return router;
}
