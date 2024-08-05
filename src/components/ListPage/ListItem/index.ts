import { createComponent, createElement } from '../../../core/createComponent';
import { formatDate } from '../../../utils/index';
import { Article } from '../../../types';

function ListItem(item: Article) {
  const { key, title, subtitle, publishedTime, editor, thumbnailConfig } = item;
  const { imageUrl } = thumbnailConfig;
  const { name } = editor;

  const Title = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['list-item-title'],
        children: [title],
      });
    },
  });

  const Subtitle = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['list-item-subtitle'],
        children: [subtitle],
      });
    },
  });

  const Author = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['list-item-author'],
        children: [`${formatDate(publishedTime)}·${name}`],
      });
    },
  });

  const TextContents = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['list-item-text-contents'],
        children: [Title, Subtitle, Author],
      });
    },
  });

  const Thumbnail = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['list-item-img-container'],
        children: [
          createComponent({
            render: () => {
              return createElement({
                type: 'img',
                classnames: ['list-item-thumbnail-img'],
                attributes: {
                  alt: 'thumbnail image',
                  src: imageUrl,
                },
              });
            },
          }),
        ],
      });
    },
  });

  const ListItem = createComponent({
    render: () => {
      return createElement({
        type: 'li',
        attributes: {
          href: `/articles/${key}`,
        },
        classnames: ['list-item'],
        children: [TextContents, Thumbnail],
      });
    },
  });

  return ListItem;
}

export default ListItem;
