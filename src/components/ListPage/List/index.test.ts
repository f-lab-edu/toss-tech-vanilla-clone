import '@testing-library/jest-dom';
import { getByText, getAllByAltText } from '@testing-library/dom';
import { mount } from '../../../core/createComponent';
import List from './index';
import { Article } from '../../../types/index';

describe('List 컴포넌트', () => {
  test('Article 배열이 주어졌을 때 각 ListItem이 올바르게 렌더링되는지 확인합니다.', () => {
    const articles: Article[] = [
      {
        key: '1',
        title: 'Sample Article 1',
        subtitle: 'Subtitle 1',
        publishedTime: '2023-01-01T00:00:00Z',
        category: 'Tech',
        thumbnailConfig: { imageUrl: '/images/sample1-thumbnail.png' },
        coverConfig: { imageUrl: '/images/sample1-cover.png' },
        editor: {
          name: 'Editor 1',
          shortDescription: 'Editor 1 Short Description',
        },
        shortDescription: 'Short description of sample article 1',
        fullDescription: 'Full description of sample article 1',
        seoConfig: { tags: [{ content: 'tag1' }, { content: 'tag2' }] },
      },
      {
        key: '2',
        title: 'Sample Article 2',
        subtitle: 'Subtitle 2',
        publishedTime: '2023-01-02T00:00:00Z',
        category: 'Science',
        thumbnailConfig: { imageUrl: '/images/sample2-thumbnail.png' },
        coverConfig: { imageUrl: null },
        editor: {
          name: 'Editor 2',
          shortDescription: 'Editor 2 Short Description',
        },
        shortDescription: 'Short description of sample article 2',
        fullDescription: 'Full description of sample article 2',
        seoConfig: { tags: [{ content: 'tag3' }, { content: 'tag4' }] },
      },
    ];

    // DOM에 컴포넌트를 추가합니다.
    document.body.innerHTML = '<div id="root"></div>';
    const root = document.getElementById('root') as HTMLElement;
    mount(List(articles), root);

    // 첫 번째 기사 확인
    const title1 = getByText(document.body, 'Sample Article 1');
    expect(title1).toBeInTheDocument();

    const subtitle1 = getByText(document.body, 'Subtitle 1');
    expect(subtitle1).toBeInTheDocument();

    const author1 = getByText(document.body, '2023년 1월 1일·Editor 1');
    expect(author1).toBeInTheDocument();

    const thumbnailImg1 = getAllByAltText(document.body, 'thumbnail image')[0];
    expect(thumbnailImg1).toBeInTheDocument();
    expect(thumbnailImg1).toHaveAttribute(
      'src',
      '/images/sample1-thumbnail.png',
    );

    // 두 번째 기사 확인
    const title2 = getByText(document.body, 'Sample Article 2');
    expect(title2).toBeInTheDocument();

    const subtitle2 = getByText(document.body, 'Subtitle 2');
    expect(subtitle2).toBeInTheDocument();

    const author2 = getByText(document.body, '2023년 1월 2일·Editor 2');
    expect(author2).toBeInTheDocument();

    const thumbnailImg2 = getAllByAltText(document.body, 'thumbnail image')[1];
    expect(thumbnailImg2).toBeInTheDocument();
    expect(thumbnailImg2).toHaveAttribute(
      'src',
      '/images/sample2-thumbnail.png',
    );
  });
});
