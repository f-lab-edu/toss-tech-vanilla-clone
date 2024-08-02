import '@testing-library/jest-dom';
import { mount } from '../../../core/createComponent';
import CategoryNavbar, { CATEGORIES } from './index';

describe('CategoryNavbar 컴포넌트', () => {
  test('카테고리 탭이 올바르게 렌더링되는지 확인합니다.', () => {
    // DOM에 컴포넌트를 추가합니다.
    document.body.innerHTML = '<div id=root></div>';
    const root = document.getElementById('root') as HTMLElement;
    mount(CategoryNavbar(), root);

    // 카테고리 네비게이션 바가 올바르게 렌더링되었는지 확인합니다.
    const navbar = document.querySelector('.category-navbar');
    expect(navbar).toBeInTheDocument();

    // 각 카테고리 탭이 올바르게 렌더링되었는지 확인합니다.
    CATEGORIES.forEach(({ category, path }) => {
      const tab = document.querySelector(`[href="${path}"]`);
      expect(tab).toBeInTheDocument();
      expect(tab!.textContent).toBe(category);
    });
  });
});
