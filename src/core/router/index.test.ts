import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import { createRouter } from '.';
import { Router } from './types/router';

describe('createRouter', () => {
  let root: HTMLElement;
  let routes;
  let router: Router;
  let errorPage: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    root = document.getElementById('root') as HTMLElement;
    routes = {
      '/': document.createElement('div'),
      '/about': document.createElement('div'),
    };

    routes['/'].textContent = '홈 페이지';
    routes['/'].classList.add('page');
    routes['/about'].textContent = '어바웃 페이지';
    routes['/about'].classList.add('page');

    errorPage = document.createElement('div');
    errorPage.textContent = '페이지를 찾을 수 없습니다';

    router = createRouter({ routes, root, errorPage });
  });

  it('초기 경로를 올바르게 렌더링해야 합니다', () => {
    expect(screen.getByText('홈 페이지')).toBeInTheDocument();
  });

  it('push 메서드로 새로운 경로로 이동할 수 있어야 합니다', async () => {
    router.push('/about');
    expect(screen.getByText('어바웃 페이지')).toBeInTheDocument();
    expect(screen.queryByText('홈 페이지')).not.toBeInTheDocument();
  });

  it('replace 메서드로 현재 경로를 대체할 수 있어야 합니다', () => {
    router.replace('/about');
    expect(screen.getByText('어바웃 페이지')).toBeInTheDocument();
    expect(screen.queryByText('홈 페이지')).not.toBeInTheDocument();
  });

  xit('뒤로 및 앞으로 이동을 처리할 수 있어야 합니다', () => {
    router.push('/about');
    router.back();
    expect(screen.getByText('홈 페이지')).toBeInTheDocument();
    expect(screen.queryByText('어바웃 페이지')).not.toBeInTheDocument();
    router.forward();
    expect(screen.getByText('어바웃 페이지')).toBeInTheDocument();
    expect(screen.queryByText('홈 페이지')).not.toBeInTheDocument();
  });

  it('알 수 없는 경로에 대해 404 페이지를 렌더링해야 합니다', () => {
    router.push('/unknown');
    expect(screen.getByText('페이지를 찾을 수 없습니다')).toBeInTheDocument();
  });

  it('링크 클릭 이벤트를 바인딩하고 네비게이션을 처리할 수 있어야 합니다', () => {
    const link = document.createElement('a');
    link.href = '/about';
    link.textContent = '어바웃 페이지로 이동';
    root.appendChild(link);

    fireEvent.click(screen.getByText('어바웃 페이지로 이동'));
    expect(screen.getByText('어바웃 페이지')).toBeInTheDocument();
    expect(screen.queryByText('홈 페이지')).not.toBeInTheDocument();
  });
});
