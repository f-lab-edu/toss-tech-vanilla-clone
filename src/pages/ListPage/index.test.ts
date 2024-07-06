import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import ListPage from './index';

describe('ListPage', () => {
  let listPage: HTMLElement;
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    listPage = ListPage({ path: '/' });
    document.body.appendChild(listPage);
  });

  it('리스트 페이지 내부 요소들을 노출한다.', () => {
    expect(listPage).toBeInTheDocument();
    expect(listPage).toHaveClass('list-page');

    const heroImg = screen.getByAltText('toss tech hero image');
    expect(heroImg).toBeInTheDocument();

    const categoryNavbarTabs = screen.getAllByRole('link');
    expect(categoryNavbarTabs).toHaveLength(3);
    categoryNavbarTabs.forEach((tab) => {
      expect(tab).toBeInTheDocument();
    });

    // TODO: article list 요소
  });
});
