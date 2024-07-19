import '@testing-library/jest-dom';
import { getByText } from '@testing-library/dom';
import Page from './index';

// createComponent 모듈을 목업합니다.
jest.mock('../../core/createComponent', () => ({
  createComponent: jest.fn(({ type, classnames, children }) => {
    const element = document.createElement(type);
    if (classnames) {
      element.classList.add(...classnames);
    }
    if (children) {
      children.forEach((child: HTMLElement) => element.appendChild(child));
    }
    return element;
  }),
}));

// Navbar 모듈을 목업합니다.
jest.mock('./Navbar', () =>
  jest.fn(() => {
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');
    return navbar;
  }),
);

describe('Page 컴포넌트', () => {
  let pageElement: HTMLElement;
  const sampleChildren = [
    document.createElement('p'),
    document.createElement('span'),
  ];
  sampleChildren[0].textContent = 'Sample paragraph';
  sampleChildren[1].textContent = 'Sample span';
  const sampleClassnames = ['custom-class'];

  beforeEach(() => {
    pageElement = Page({
      classnames: sampleClassnames,
      children: sampleChildren,
    });
    document.body.appendChild(pageElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('페이지 컨테이너를 생성한다', () => {
    expect(pageElement).toBeInTheDocument();
    expect(pageElement).toHaveClass('page');
    expect(pageElement).toHaveClass('custom-class');
  });

  it('Navbar를 포함한다', () => {
    const navbar = pageElement.querySelector('.navbar');
    expect(navbar).toBeInTheDocument();
  });

  it('내용 컨테이너를 포함한다', () => {
    const contentContainer = pageElement.querySelector(
      '.content-container',
    ) as HTMLElement;
    expect(contentContainer).toBeInTheDocument();
  });

  it('내용 컨테이너에 자식 요소들이 포함되어 있다', () => {
    const contentContainer = pageElement.querySelector(
      '.content-container',
    ) as HTMLElement;
    expect(contentContainer).toContainElement(sampleChildren[0]);
    expect(contentContainer).toContainElement(sampleChildren[1]);
    expect(getByText(contentContainer, 'Sample paragraph')).toBeInTheDocument();
    expect(getByText(contentContainer, 'Sample span')).toBeInTheDocument();
  });
});
