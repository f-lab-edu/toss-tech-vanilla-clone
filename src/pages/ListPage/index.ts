import { createComponent, createElement } from '../../core/createComponent';
import Page from '../../components/Page';
import CategoryNavbar from '../../components/ListPage/CategoryNavbar';

interface Props {
  path: string;
}

function ListPage({ path }: Props) {
  console.log('ListPage path:', path);
  const HeroImg = createComponent({
    render: () => {
      return createElement({
        type: 'img',
        classnames: ['hero-img'],
        attributes: {
          alt: 'toss tech hero image',
          src: '/src/assets/images/hero.webp',
        },
      });
    },
  });

  const ListPage = Page({
    classnames: ['list-page'],
    children: [HeroImg, CategoryNavbar()],
  });

  return ListPage;
}

export default ListPage;
