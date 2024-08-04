import { createComponent, createElement } from '../../core/createComponent';
import Page from '../../components/Page';
import CategoryNavbar from '../../components/ListPage/CategoryNavbar';
import List from '../../components/ListPage/List';
import { fetchList } from '../../utils/index';
import data from '../../assets/data/all-articles.json';

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
  const ListPageContent = createComponent({
    render: () => {
      // const data = await fetchList('/');
      return createElement({
        type: 'div',
        classnames: ['list-page-content'],
        children: [
          HeroImg,
          CategoryNavbar(),
          createComponent({
            initialState: { list: data },
            render: (state) => {
              return createElement({
                type: 'div',
                children: [List(state.list)],
              });
            },
            componentDidMount: async (state, setState) => {
              console.log('hklhjdkfjd');
              // fetch TODO
              // 상태가 초기 상태인지 확인
              if (state.list.length === 0) {
                // fetch TODO
                const list = fetchList('/').then((res) => {
                  console.log('res', res);
                });
                console.log('list: ', list);
                setState({ list });
              }
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
