import { fetchList } from './index';
import allList from '../assets/data/all-articles.json';
import techList from '../assets/data/tech-articles.json';
import designList from '../assets/data/design-articles.json';

// Jest setup to mock the delay function
jest.mock('./index', () => {
  const originalModule = jest.requireActual('./index');
  return {
    ...originalModule,
    delay: jest.fn().mockResolvedValue(null), // mock delay to resolve immediately
  };
});

describe('fetchList 함수', () => {
  test('루트 경로(/)에 대해 모든 기사를 반환해야 합니다.', async () => {
    const articles = await fetchList('/');
    expect(articles).toEqual(allList);
  });

  test('tech 경로(/tech)에 대해 기술 기사를 반환해야 합니다.', async () => {
    const articles = await fetchList('/tech');
    expect(articles).toEqual(techList);
  });

  test('design 경로(/design)에 대해 디자인 기사를 반환해야 합니다.', async () => {
    const articles = await fetchList('/design');
    expect(articles).toEqual(designList);
  });

  test('유효하지 않은 경로에 대해 undefined를 반환해야 합니다.', async () => {
    const articles = await fetchList('/invalid-path');
    expect(articles).toBeUndefined();
  });
});
