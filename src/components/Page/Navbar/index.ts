import { createComponent, createElement } from '../../../core/createComponent';
import { VComponent } from '../../../core/createComponent/types/createComponent';

function Navbar(): VComponent {
  // 로고 이미지 요소 생성
  const LogoImg = createComponent({
    render: () => {
      return createElement({
        type: 'img',
        attributes: {
          src: './src/assets/images/logo.png',
          alt: 'toss logo image',
        },
        classnames: ['logo'],
      });
    },
  });

  // 타이틀 이미지 요소 생성
  const TitleImg = createComponent({
    render: () => {
      return createElement({
        type: 'img',
        attributes: {
          src: './src/assets/images/title.png',
          alt: 'toss tech title image',
        },
        classnames: ['title-img'],
      });
    },
  });

  // 내부 콘텐츠 컨테이너 생성
  const NavbarContent = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['navbar-content'],
        children: [LogoImg, TitleImg],
      });
    },
  });

  // 링크 요소 생성
  const Link = createComponent({
    render: () => {
      return createElement({
        type: 'a',
        attributes: {
          href: '/',
          'aria-label': '토스 기술 블로그 클론, 토스 테크 클론',
        },
        children: [NavbarContent],
      });
    },
  });

  const Navbar = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['navbar'],
        children: [Link],
      });
    },
  });

  return Navbar;
}

export default Navbar;
