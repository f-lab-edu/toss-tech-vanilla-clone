import { router } from '../../core/router';
import { createComponent } from '../../core/createComponent';

function Navbar(): HTMLElement {
  // 로고 이미지 요소 생성
  const logoImg = createComponent({
    type: 'img',
    attributes: {
      src: './src/assets/images/logo.png',
      alt: 'toss logo image',
    },
    classnames: ['logo'],
  });

  // 타이틀 이미지 요소 생성
  const titleImg = createComponent({
    type: 'img',
    attributes: {
      src: './src/assets/images/title.png',
      alt: 'toss tech title image',
    },
    classnames: ['title-img'],
  });

  // 내부 콘텐츠 컨테이너 생성
  const navbarContent = createComponent({
    type: 'div',
    classnames: ['navbar-content'],
    children: [logoImg, titleImg],
  });

  // 링크 요소 생성
  const link = createComponent({
    type: 'a',
    attributes: {
      href: '/',
      'aria-label': '토스 기술 블로그 클론, 토스 테크 클론',
    },
    children: [navbarContent],
    event: {
      type: 'click',
      listener: (e: Event) => {
        e.preventDefault();
        router.push('/');
      },
    },
  });

  // 네비게이션 바 컨테이너 생성
  const navbar = createComponent({
    type: 'div',
    classnames: ['navbar'],
    children: [link],
  });

  return navbar;
}

export default Navbar;
