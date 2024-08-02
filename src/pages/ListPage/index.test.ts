import '@testing-library/jest-dom';
import { getByAltText } from '@testing-library/dom';
import { mount } from '../../core/createComponent';
import ListPage from './index';

describe('ListPage 컴포넌트', () => {
  test('경로가 주어졌을 때 올바르게 렌더링되는지 확인합니다.', () => {
    const path = '/some-path';
    // DOM에 컴포넌트를 추가합니다.
    document.body.innerHTML = '<div id=root></div>';
    const root = document.getElementById('root') as HTMLElement;
    mount(ListPage({ path }), root);

    // Hero 이미지가 올바르게 렌더링되었는지 확인합니다.
    const heroImg = getByAltText(document.body, 'toss tech hero image');
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('src', '/src/assets/images/hero.webp');

    // CategoryNavbar가 올바르게 렌더링되었는지 확인합니다.
    const categoryNavbar = document.querySelector('.category-navbar');
    expect(categoryNavbar).toBeInTheDocument();

    // ListPage가 올바르게 렌더링되었는지 확인합니다.
    const listPage = document.querySelector('.list-page');
    expect(listPage).toBeInTheDocument();
  });
});
