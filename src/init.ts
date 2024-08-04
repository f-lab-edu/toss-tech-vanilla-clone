import { createRouter } from './core/router';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import { Router } from './core/router/types/router';
import { mount, unmount } from './core/createComponent/index';
import { VComponent } from './core/createComponent/types/createComponent';
import { fetchList } from './utils/index';
import { Article } from './types';

/** @type {Router} */
let router: Router;

/**
 * 초기화 함수를 정의합니다.
 * @returns {{ setRouter: (root: HTMLElement) => void, getRouter: () => Router }} 초기화 객체를 반환합니다.
 */
export async function init(root: HTMLElement) {
  /**
   * 애플리케이션을 초기화하고 라우터를 설정합니다.
   * @param {HTMLElement} root - 애플리케이션이 마운트될 루트 엘리먼트
   */
  const [allArticles, techArticles, designArticles] = await Promise.all([
    fetchList('/'),
    fetchList('/tech'),
    fetchList('/design'),
  ]);

  function getArticle(articleId: string): Article {
    return allArticles.find(({ key }) => key === articleId) as Article;
  }

  function setRouter(root: HTMLElement) {
    // 초기 라우터 설정
    router = createRouter<VComponent>({
      routes: {
        '/': () => ListPage({ path: '/', list: allArticles }),
        '/tech': () => ListPage({ path: '/tech', list: techArticles }),
        '/design': () => ListPage({ path: '/design', list: designArticles }),
        '/articles/[articleId]': ({ articleId }) =>
          DetailPage({ articleId, article: getArticle(articleId) }),
      },
      root,
      render: (component) => mount(component, root),
      errorPage: () => ErrorPage(),
      onRouteChange: ({ currentElement }) => {
        if (currentElement) {
          unmount(currentElement, root);
        }
      },
    });
  }
  setRouter(root);
}

/**
 * 설정된 라우터 객체를 반환합니다.
 * @returns {Router} 현재 설정된 라우터 객체
 */
export function getRouter(): Router {
  return router;
}
