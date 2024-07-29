import { screen, render } from '@testing-library/dom';
import '@testing-library/jest-dom';
import ListPage from './ListPage';
import { createComponent, createElement } from '../../core/createComponent';
import Page from '../../components/Page';
import CategoryNavbar from '../../components/ListPage/CategoryNavbar';

// 모의 함수를 설정합니다
jest.mock('../../components/Page');
jest.mock('../../components/ListPage/CategoryNavbar');

describe('ListPage 컴포넌트', () => {
  let createComponentSpy;
  let createElementSpy;

  beforeEach(() => {
    // 모의 구현을 설정합니다
    createComponentSpy = jest.spyOn(
      require('../../core/createComponent'),
      'createComponent',
    );
    createElementSpy = jest.spyOn(
      require('../../core/createComponent'),
      'createElement',
    );

    createComponentSpy.mockImplementation(({ render }) => {
      return {
        render: () => render(),
      };
    });

    createElementSpy.mockImplementation(({ type, classnames, attributes }) => {
      const element = document.createElement(type);
      if (classnames) {
        element.className = classnames.join(' ');
      }
      if (attributes) {
        Object.keys(attributes).forEach((key) => {
          element.setAttribute(key, attributes[key]);
        });
      }
      return element;
    });

    Page.mockImplementation(({ classnames, children }) => {
      const pageElement = document.createElement('div');
      pageElement.className = classnames.join(' ');
      children.forEach((child) => pageElement.appendChild(child));
      return pageElement;
    });

    CategoryNavbar.mockImplementation(() => {
      const navbar = document.createElement('nav');
      navbar.className = 'category-navbar';
      return navbar;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ListPage 컴포넌트가 올바르게 렌더링된다', () => {
    const path = '/test-path';
    const container = ListPage({ path });

    document.body.appendChild(container);

    // Hero 이미지가 렌더링 되었는지 확인합니다
    const heroImg = screen.getByAltText('toss tech hero image');
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('src', '/src/assets/images/hero.webp');
    expect(heroImg).toHaveClass('hero-img');

    // CategoryNavbar가 렌더링 되었는지 확인합니다
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('category-navbar');

    // 전체 페이지가 렌더링 되었는지 확인합니다
    const listPage = screen.getByRole('main');
    expect(listPage).toBeInTheDocument();
    expect(listPage).toHaveClass('list-page');
  });
});
