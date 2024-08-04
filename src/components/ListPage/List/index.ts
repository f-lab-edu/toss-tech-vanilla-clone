import { createComponent, createElement } from '../../../core/createComponent';

import ListItem from '../ListItem/index';
import { Article } from '../../../types/index';

function List(list: Article[]) {
  const listItems = list.map((item) => {
    return createComponent({
      render: () => {
        return createElement({
          type: 'a',
          attributes: {
            href: `articles/${item.key}`,
          },
          children: [ListItem(item)],
        });
      },
    });
  });

  const List = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['list'],
        children: [...listItems],
      });
    },
  });

  return List;
}

export default List;
