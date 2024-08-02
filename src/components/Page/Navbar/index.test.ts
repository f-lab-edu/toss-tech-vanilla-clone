import '@testing-library/jest-dom';
import { mount } from '../../../core/createComponent';
import Navbar from './index.ts';

describe('Navbar 컴포넌트', () => {
  it('필요한 요소들을 올바르게 렌더링해야 합니다', () => {
    // DOM에 컴포넌트를 추가합니다.
    document.body.innerHTML = '<div id="root"></div>';
    const root = document.getElementById('root') as HTMLElement;
    mount(Navbar(), root);

    // Assertions (검증)
    const navbarElement = root.querySelector('.navbar');
    expect(navbarElement).toBeInTheDocument();

    const linkElement = navbarElement!.querySelector('a');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
    expect(linkElement).toHaveAttribute(
      'aria-label',
      '토스 기술 블로그 클론, 토스 테크 클론',
    );

    const navbarContentElement = linkElement!.querySelector('.navbar-content');
    expect(navbarContentElement).toBeInTheDocument();

    const logoImg = navbarContentElement!.querySelector('.logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', './src/assets/images/logo.png');
    expect(logoImg).toHaveAttribute('alt', 'toss logo image');

    const titleImg = navbarContentElement!.querySelector('.title-img');
    expect(titleImg).toBeInTheDocument();
    expect(titleImg).toHaveAttribute('src', './src/assets/images/title.png');
    expect(titleImg).toHaveAttribute('alt', 'toss tech title image');

    // 클린업
    root.remove();
  });
});
