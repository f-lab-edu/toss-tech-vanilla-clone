import '@testing-library/jest-dom';
import { getByAltText, getByText } from '@testing-library/dom';
import { mount } from '../../core/createComponent';
import DetailPage from './index';
import { Article } from '../../types/index';

describe('DetailPage 컴포넌트', () => {
  test('기사 ID와 기사 데이터가 주어졌을 때 올바르게 렌더링되는지 확인합니다.', () => {
    const articleId = '1';
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
    document.body.innerHTML = '<div id="root"></div>';
    const root = document.getElementById('root') as HTMLElement;
    mount(DetailPage({ articleId, article }), root);

    // Hero 이미지가 올바르게 렌더링되었는지 확인합니다.
    const heroImg = getByAltText(document.body, 'article hero image');
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('src', '/images/sample-cover.png');

    // 제목이 올바르게 렌더링되었는지 확인합니다.
    const title = getByText(document.body, 'Sample Article');
    expect(title).toBeInTheDocument();

    // 태그가 올바르게 렌더링되었는지 확인합니다.
    const tag1 = getByText(document.body, '#tag1');
    const tag2 = getByText(document.body, '#tag2');
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();

    // 작성자 정보가 올바르게 렌더링되었는지 확인합니다.
    const author = getByText(
      document.body,
      'Editor Name·Editor Short Description',
    );
    expect(author).toBeInTheDocument();

    // 발행 시간이 올바르게 렌더링되었는지 확인합니다.
    const publishedTime = getByText(document.body, '2023년 1월 1일');
    expect(publishedTime).toBeInTheDocument();

    // 본문 내용이 올바르게 렌더링되었는지 확인합니다.
    const content = getByText(
      document.body,
      'Full description of sample article',
    );
    expect(content).toBeInTheDocument();
  });
});
