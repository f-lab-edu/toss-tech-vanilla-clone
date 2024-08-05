import { formatDate } from './index';

// Jest setup to mock the delay function
jest.mock('./index', () => {
  const originalModule = jest.requireActual('./index');
  return {
    ...originalModule,
    delay: jest.fn().mockResolvedValue(null), // mock delay to resolve immediately
  };
});

describe('formatDate 함수', () => {
  test('주어진 날짜 문자열을 올바른 형식으로 변환해야 합니다.', () => {
    const dateStr = '2023-10-18T09:00:00+09:00';
    const formattedDate = formatDate(dateStr);
    expect(formattedDate).toBe('2023년 10월 18일');
  });

  test('다른 날짜 문자열을 올바른 형식으로 변환해야 합니다.', () => {
    const dateStr = '2022-01-01T00:00:00Z';
    const formattedDate = formatDate(dateStr);
    expect(formattedDate).toBe('2022년 1월 1일');
  });

  test('유효하지 않은 날짜 문자열을 처리해야 합니다.', () => {
    const dateStr = 'invalid-date-string';
    const formattedDate = formatDate(dateStr);
    expect(formattedDate).toBe('NaN년 NaN월 NaN일');
  });
});
