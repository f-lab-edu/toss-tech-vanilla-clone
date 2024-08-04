import '@testing-library/jest-dom';
import { getByText, getByAltText } from '@testing-library/dom';
import { mount } from '../../../core/createComponent';
import ListItem from './index';
import { Article } from '../../../types';

describe('ListItem 컴포넌트', () => {
  test('Article 데이터가 주어졌을 때 올바르게 렌더링되는지 확인합니다.', () => {
    const article: Article = {
      key: '1',
      title: 'Sample Article',
      subtitle: 'Sample Subtitle',
      publishedTime: '2023-01-01T00:00:00Z',
      category: 'Tech',
      thumbnailConfig: { imageUrl: '/images/sample-thumbnail.png' },
      coverConfig: { imageUrl: '/images/sample-cover.png' },
      editor: {
        name: 'Editor Name',
        shortDescription: 'Editor Short Description',
      },
      shortDescription: 'Short description of sample article',
      fullDescription: 'Full description of sample article',
      seoConfig: { tags: [{ content: 'tag1' }, { content: 'tag2' }] },
    };

    // DOM에 컴포넌트를 추가합니다.
    document.body.innerHTML = '<ul id="root"></ul>';
    const root = document.getElementById('root') as HTMLElement;
    mount(ListItem(article), root);

    // 제목이 올바르게 렌더링되었는지 확인합니다.
    const title = getByText(document.body, 'Sample Article');
    expect(title).toBeInTheDocument();

    // 부제목이 올바르게 렌더링되었는지 확인합니다.
    const subtitle = getByText(document.body, 'Sample Subtitle');
    expect(subtitle).toBeInTheDocument();

    // 작성자 정보와 발행 시간이 올바르게 렌더링되었는지 확인합니다.
    const author = getByText(document.body, '2023년 1월 1일·Editor Name');
    expect(author).toBeInTheDocument();

    // 썸네일 이미지가 올바르게 렌더링되었는지 확인합니다.
    const thumbnailImg = getByAltText(document.body, 'thumbnail image');
    expect(thumbnailImg).toBeInTheDocument();
    expect(thumbnailImg).toHaveAttribute('src', '/images/sample-thumbnail.png');
  });
});
