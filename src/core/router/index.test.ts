import { createRouter } from './index';
import { Router } from './types/router';
import { CreateRouterProps } from './types/router';

describe('createRouter 테스트', () => {
  let root: HTMLElement;
  let renderMock: jest.Mock;
  let errorPageMock: jest.Mock;
  let onRouteChangeMock: jest.Mock;

  beforeEach(() => {
    root = document.createElement('div');
    renderMock = jest.fn();
    errorPageMock = jest.fn();
    onRouteChangeMock = jest.fn();

    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
    jest.restoreAllMocks();
  });

  test('라우터를 생성하고 초기 경로를 렌더링합니다.', () => {
    const routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
    };

    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };

    createRouter(props);

    expect(routes['/']).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith('HomePage');
  });

  test('push 메서드를 사용하여 경로를 변경하고 페이지를 렌더링합니다.', () => {
    const routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
    };

    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };

    const router: Router = createRouter(props);
    router.push('/about');

    expect(routes['/about']).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith('AboutPage');
  });

  test('replace 메서드를 사용하여 경로를 변경하고 페이지를 렌더링합니다.', () => {
    const routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
    };

    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };

    const router: Router = createRouter(props);
    router.replace('/about');

    expect(routes['/about']).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith('AboutPage');
  });

  test('back 메서드를 사용하여 히스토리에서 뒤로 이동합니다.', () => {
    const routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
    };

    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };

    const router: Router = createRouter(props);
    router.push('/about');
    router.back();

    expect(onRouteChangeMock).toHaveBeenCalled();
  });

  test('forward 메서드를 사용하여 히스토리에서 앞으로 이동합니다.', () => {
    const routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
    };

    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };

    const router: Router = createRouter(props);
    router.push('/about');
    router.back();
    router.forward();

    expect(onRouteChangeMock).toHaveBeenCalled();
  });

  test('go 메서드를 사용하여 히스토리에서 특정 위치로 이동합니다.', () => {
    const routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
    };

    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };

    const router: Router = createRouter(props);
    router.push('/about');
    router.go(-1);

    expect(onRouteChangeMock).toHaveBeenCalled();
  });

  test('없는 경로로 이동할 때 에러 페이지를 렌더링합니다.', () => {
    const routes = {
      '/': jest.fn(() => 'HomePage'),
      '/about': jest.fn(() => 'AboutPage'),
    };

    const props: CreateRouterProps<string> = {
      routes,
      root,
      render: renderMock,
      errorPage: errorPageMock,
      onRouteChange: onRouteChangeMock,
    };

    const router: Router = createRouter(props);
    router.push('/non-existent');

    expect(errorPageMock).toHaveBeenCalled();
    expect(renderMock).toHaveBeenCalledWith(undefined);
  });
});
