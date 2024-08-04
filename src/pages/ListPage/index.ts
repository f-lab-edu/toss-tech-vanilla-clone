import { createComponent, createElement } from '../../core/createComponent';
import Page from '../../components/Page';
import CategoryNavbar from '../../components/ListPage/CategoryNavbar';
import List from '../../components/ListPage/List';
import { Article } from '../../types/index';
interface Props {
  path: string;
  list: Article[];
}

function ListPage({ path, list }: Props) {
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
  const ListPageContent = createComponent({
    render: () => {
      console.log('list: ', list);
      return createElement({
        type: 'div',
        classnames: ['list-page-content'],
        children: [
          HeroImg,
          CategoryNavbar(),
          createComponent({
            initialState: { list },
            render: (state) => {
              return createElement({
                type: 'div',
                children: [List(state.list)],
              });
            },
          }),
        ],
      });
    },
  });

  const ListPage = Page({
    classnames: ['list-page'],
    children: [ListPageContent],
  });

  return ListPage;
}

export default ListPage;
