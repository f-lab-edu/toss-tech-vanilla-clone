import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import CategoryNavbarTab from './index';

describe('CategoryNavbarTab', () => {
  const CATEGORY = '개발';
  const PATH = '/tech';
  let tab: HTMLElement;
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    tab = CategoryNavbarTab({ category: CATEGORY, path: PATH });
    document.body.appendChild(tab);
  });

  it('주어진 파라미터 category와 href값으로 path를 가진 a tag을 노출한다.', () => {
    expect(tab).toBeInTheDocument();
    expect(tab).toBeInstanceOf(HTMLElement);
    expect(tab).toHaveTextContent(CATEGORY);
    expect(tab).toHaveAttribute('href', PATH);
  });

  it('클릭 시 올바른 경로로 이동한다', () => {
    const category = 'Test Category';
    const path = '/test-path';
    const tab = CategoryNavbarTab({ category, path });

    document.body.appendChild(tab);

    const mockPush = jest.fn();
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      mockPush();
    });

    // 링크 클릭 이벤트를 트리거합니다.
    fireEvent.click(tab);

    // push 메소드가 호출되었는지 확인합니다.
    expect(mockPush).toHaveBeenCalledTimes(1);

    document.body.removeChild(tab);
  });
});
