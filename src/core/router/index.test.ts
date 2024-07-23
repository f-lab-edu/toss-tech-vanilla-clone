import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import { createRouter } from '.';
import { Router } from './types/router';

describe('createRouter', () => {
  let root: HTMLElement;
  let routes: { [key: string]: HTMLElement };
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

  it('존재하지 않는 경로로 이동할 때 에러 페이지를 표시합니다.', () => {
    router.push('/nonexistent');
    expect(screen.getByText('페이지를 찾을 수 없습니다')).toBeInTheDocument();
  });

  it('브라우저 히스토리에서 뒤로 이동합니다.', async () => {
    router.push('/about');
    router.push('/');

    router.back();

    await waitFor(() => {
      expect(screen.getByText('어바웃 페이지')).toBeInTheDocument();
    });
  });

  it('브라우저 히스토리에서 앞으로 이동합니다.', async () => {
    router.push('/about');
    router.push('/');

    router.back();
    router.forward();

    await waitFor(() => {
      expect(screen.getByText('홈 페이지')).toBeInTheDocument();
    });
  });

  it('브라우저 히스토리에서 주어진 만큼 이동합니다.', async () => {
    router.push('/about');
    router.push('/');

    router.go(-1);

    await waitFor(() => {
      expect(screen.getByText('어바웃 페이지')).toBeInTheDocument();
    });

    router.go(1);

    await waitFor(() => {
      expect(screen.getByText('홈 페이지')).toBeInTheDocument();
    });
  });

  it('페이지 내 링크 클릭 시 올바르게 경로를 이동합니다.', () => {
    const link = document.createElement('a');
    link.setAttribute('href', '/about');
    link.textContent = 'About Link';
    routes['/'].appendChild(link);

    router.push('/');

    link.click();
    expect(screen.getByText('어바웃 페이지')).toBeInTheDocument();
  });

  it('popstate 이벤트를 처리합니다.', () => {
    router.push('/');
    const popStateEvent = new PopStateEvent('popstate', {
      state: {},
    });
    window.dispatchEvent(popStateEvent);

    expect(screen.getByText('홈 페이지')).toBeInTheDocument();
  });
});
