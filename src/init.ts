import { createRouter } from './core/router';
import ListPage from './pages/ListPage';
import ErrorPage from './pages/ErrorPage';
import { Router } from './core/router/types/router';

export let router: Router;

export function init(app: HTMLElement): Router {
  // 초기 라우터 설정
  const routerObj = createRouter({
    routes: {
      '/': ListPage({ path: '/' }),
      '/tech': ListPage({ path: '/tech' }),
      '/design': ListPage({ path: '/design' }),
      // TODO: '/articles:articleId': detailPage(articleId)}
    },
    root: app,
    errorPage: ErrorPage(),
  });
  router = routerObj;
  return router;
}
