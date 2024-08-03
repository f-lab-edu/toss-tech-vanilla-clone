import { createRouter } from './index';
import { Router } from './types/router';
import { CreateRouterProps } from './types/router';

describe('createRouter 테스트', () => {
  let root: HTMLElement;
  let renderMock: jest.Mock;
  let errorPageMock: jest.Mock;
  let onRouteChangeMock: jest.Mock;
  let routes: { [key: string]: jest.Mock };

  const initializeRouter = (): Router => {
    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };
    return createRouter(props);
  };

  beforeEach(() => {
    root = document.createElement('div');
    renderMock = jest.fn();
    errorPageMock = jest.fn();
    onRouteChangeMock = jest.fn();
    routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
      '/articles/[articleId]': jest.fn(
        ({ articleId }) => `ArticlePage ${articleId}`,
      ),
    };

    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
    jest.restoreAllMocks();
  });

  test('라우터를 생성하고 초기 경로를 렌더링합니다.', () => {
    initializeRouter();

    expect(routes['/']).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith('HomePage');
  });

  test('push 메서드를 사용하여 경로를 변경하고 페이지를 렌더링합니다.', () => {
    const router: Router = initializeRouter();
    router.push('/about');

    expect(routes['/about']).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith('AboutPage');
  });

  test('replace 메서드를 사용하여 경로를 변경하고 페이지를 렌더링합니다.', () => {
    const router: Router = initializeRouter();
    router.replace('/about');

    expect(routes['/about']).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith('AboutPage');
  });

  test('back 메서드를 사용하여 히스토리에서 뒤로 이동합니다.', () => {
    const router: Router = initializeRouter();
    router.push('/about');
    router.back();

    expect(onRouteChangeMock).toHaveBeenCalled();
  });

  test('forward 메서드를 사용하여 히스토리에서 앞으로 이동합니다.', () => {
    const router: Router = initializeRouter();
    router.push('/about');
    router.back();
    router.forward();

    expect(onRouteChangeMock).toHaveBeenCalled();
  });

  test('go 메서드를 사용하여 히스토리에서 특정 위치로 이동합니다.', () => {
    const router: Router = initializeRouter();
    router.push('/about');
    router.go(-1);

    expect(onRouteChangeMock).toHaveBeenCalled();
  });

  test('없는 경로로 이동할 때 에러 페이지를 렌더링합니다.', () => {
    const router: Router = initializeRouter();
    router.push('/non-existent');

    expect(errorPageMock).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith(undefined);
  });

  test('동적 경로로 이동할 때 경로 파라미터를 추출하고 페이지를 렌더링합니다.', () => {
    const router: Router = initializeRouter();
    router.push('/articles/123');

    expect(routes['/articles/[articleId]']).toHaveBeenCalledWith({
      articleId: '123',
    });
    expect(renderMock).toHaveBeenCalledWith('ArticlePage 123');
  });
});
