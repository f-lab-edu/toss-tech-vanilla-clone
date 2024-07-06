import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import CategoryNavbar from './CategoryNavbar';

describe('CategoryNavbar', () => {
  const NAVBAR_MAP: { [key: string]: string } = {
    전체: '/',
    개발: '/tech',
    디자인: '/design',
  };

  let categoryNavbar: HTMLElement;

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    categoryNavbar = CategoryNavbar();
    document.body.appendChild(categoryNavbar);
  });

  xit('전체, 개발, 디자인 탭을 노출 한다.', () => {
    expect(categoryNavbar).toBeInTheDocument();
    expect(categoryNavbar).toHaveClass('category-navbar');

    const tabs = screen.getAllByRole('link');
    expect(tabs).toHaveLength(3);

    ['전체', '개발', '디자인'].forEach((tabText) => {
      const tab = screen.getByText(tabText);
      expect(tab).toBeInTheDocument();
      expect(tab).toHaveClass('tab');
      expect(tab).toHaveAttribute('path', NAVBAR_MAP[tabText]);
    });
  });
});
