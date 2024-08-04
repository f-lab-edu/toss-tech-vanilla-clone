import { createComponent, createElement } from '../../core/createComponent';
import Page from '../../components/Page';
import { formatDate } from '../../utils/index';
import { Article } from '../../types/index';

interface Props {
  articleId: string;
  article: Article;
}

function DetailPage({ articleId, article }: Props) {
  console.log('articleId: ', articleId);
  console.log('article: ', article);
  const {
    title,
    publishedTime,
    thumbnailConfig,
    coverConfig,
    editor,
    fullDescription,
    seoConfig,
  }: Article = article;
  const HeroImg = createComponent({
    render: () => {
      return createElement({
        type: 'img',
        classnames: ['article-hero-img'],
        attributes: {
          alt: 'article hero image',
          src: coverConfig.imageUrl || thumbnailConfig.imageUrl,
        },
      });
    },
  });

  const Title = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['article-title'],
        children: [title],
      });
    },
  });

  const Tags = seoConfig.tags.map(({ content }) => {
    return createComponent({
      render: () => {
        return createElement({
          type: 'div',
          classnames: ['tag'],
          children: [`#${content}`],
        });
      },
    });
  });

  const Author = createComponent({
    render: () => {
      const author = editor.shortDescription
        ? `${editor.name}·${editor.shortDescription}`
        : editor.name;
      return createElement({
        type: 'div',
        classnames: ['author'],
        children: [author],
      });
    },
  });

  const PublishedTime = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['published-time'],
        children: [`${formatDate(publishedTime)}`],
      });
    },
  });

  const AuthorContainer = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['author-container'],
        children: [Author, PublishedTime],
      });
    },
  });

  const Content = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['content'],
        children: [`${fullDescription}`],
      });
    },
  });

  const DetailPageContent = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['detail-page-content'],
        children: [HeroImg, Title, ...Tags, AuthorContainer, Content],
      });
    },
  });

  const DetailPage = Page({
    classnames: ['detail-page'],
    children: [DetailPageContent],
  });

  return DetailPage;
}

export default DetailPage;
