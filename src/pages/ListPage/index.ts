import { createComponent } from '../../core/createComponent';
import CategoryNavbar from './CategoryNavbar';

interface IProps {
  path: string;
}

function ListPage({ path }: IProps): HTMLElement {
  console.log('path:', path);
  // 히어로 이미지 생성
  const heroImg = createComponent({
    type: 'img',
    classnames: ['hero-img'],
    attributes: {
      alt: 'toss tech hero image',
      src: '/src/assets/images/hero.webp',
    },
  });

  // 메인 컨테이너 생성
  const listPage = createComponent({
    type: 'div',
    classnames: ['page', 'list-page'],
    children: [heroImg, CategoryNavbar()],
  });

  return listPage;
}

export default ListPage;
