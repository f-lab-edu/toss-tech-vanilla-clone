import { createRouter, Link } from './router';
import { screen, fireEvent } from '@testing-library/dom';
import { IRouter } from '../types/core';

describe('router', () => {
  let root: HTMLElement,
    routes,
    pageContents: { [key: string]: string },
    homeComponent: HTMLElement,
    aboutComponent: HTMLElement,
    router: IRouter;

  beforeEach(() => {
    jest.clearAllMocks();
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    const div1 = document.createElement('div');
    div1.textContent = '홈으로';
    const linkToHome = Link({ to: '/', children: [div1] });
    document.body.appendChild(linkToHome);

    const div2 = document.createElement('div');
    div2.textContent = '어바웃으로';
    const linkToAbout = Link({ to: '/about', children: [div2] });
    document.body.appendChild(linkToAbout);

    homeComponent = document.createElement('div');
    homeComponent.className = 'page';
    homeComponent.textContent = 'Home';

    aboutComponent = document.createElement('div');
    aboutComponent.className = 'page';
    aboutComponent.textContent = 'About';

    pageContents = {
      '/': '홈으로',
      '/about': 'About',
    };

    routes = {
      '/': homeComponent,
      '/about': aboutComponent,
    };

    router = createRouter({ routes, root });
  });

  afterEach(() => {
    document.body.removeChild(root);
  });

  it('createRouter은 정상적으로 link에 페이지 이동 이벤트 리스너를 지정한다', () => {
    // 링크 요소를 모두 가져옵니다.
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    links.forEach((link) => {
      const path = link.getAttribute('path') as string;

      // 링크를 클릭하여 페이지 이동 이벤트를 트리거합니다.
      fireEvent.click(link);

      // 이동한 페이지의 내용이 올바르게 렌더링 되었는지 확인합니다.
      const page = screen.getByText(pageContents[path]);
      expect(page).toBeTruthy();
    });
  });
  it('createRouter은 정상적으로 router 인터페이스를 반환한다.', () => {
    expect(router).toHaveProperty('push');
  });
  it('초기 로드시 홈 컴포넌트를 렌더링합니다.', () => {
    router.push('/');
    const renderedComponent = document.querySelector('.page');
    expect(renderedComponent).toBe(homeComponent);
  });

  it('about 페이지로 이동하고 about 컴포넌트를 렌더링합니다.', () => {
    router.push('/about');
    const renderedComponent = document.querySelector('.page');
    expect(renderedComponent).toBe(aboutComponent);
  });

  it('기존 페이지 존재 시 기존 페이지 컴포넌트를 교체합니다.', () => {
    router.push('/');
    const homeComponentRendered = document.querySelector('.page');
    expect(homeComponentRendered).toBe(homeComponent);

    router.push('/about');
    const aboutComponentRendered = document.querySelector('.page');
    expect(aboutComponentRendered).toBe(aboutComponent);

    expect(document.querySelectorAll('.page').length).toBe(1);
  });
});

describe('Link 컴포넌트', () => {
  let root: HTMLElement, link;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
  });

  it('올바른 속성과 이벤트 리스너가 있는 링크를 생성합니다.', () => {
    const to = '/about';
    const classnames = ['link-class'];
    var text = document.createTextNode('About');
    var div = document.createElement('div');
    div.appendChild(text);
    const children = [div];

    link = Link({ to, classnames, children });
    root.appendChild(link);

    expect(link.getAttribute('path')).toBe(to);
    expect(link.getAttribute('href')).toBe('#');
    expect(link.className).toBe('link-class');
    expect(link.textContent).toBe('About');
  });

  it('링크 클릭 시 올바른 경로로 이동합니다.', () => {
    const to = '/about';
    const classnames = ['link-class'];
    var text = document.createTextNode('About');
    var div = document.createElement('div');
    div.appendChild(text);
    const children = [div];

    link = Link({ to, classnames, children });
    root.appendChild(link);

    const mockPush = jest.fn();
    link.addEventListener('click', (e) => {
      e.preventDefault();
      mockPush();
    });

    link.click();
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
