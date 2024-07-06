import { createComponent } from './core/createComponent.ts';
import { createRouter } from './core/router.ts';
import ListPage from './pages/ListPage';
import Navbar from './components/Navbar/index.ts';

/**
 * 애플리케이션의 루트 컴포넌트를 생성.
 *
 * @returns {HTMLElement} 루트 컴포넌트 객체를 반환.
 */
function App(): HTMLElement {
  const app = createComponent({ type: 'div' });
  app.appendChild(Navbar());

  // 초기 라우터 설정
  const router = createRouter({
    routes: {
      '/': ListPage({ path: '/' }),
      '/tech': ListPage({ path: '/tech' }),
      '/design': ListPage({ path: '/design' }),
      // TODO: '/articles:articleId': detailPage(articleId)}
    },
    root: app,
  });

  // 초기 페이지 로드
  const path = window.location.pathname;
  router.push(path);

  return app;
}

export default App;
