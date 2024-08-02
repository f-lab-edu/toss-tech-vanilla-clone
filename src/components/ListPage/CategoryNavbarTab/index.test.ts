import '@testing-library/jest-dom';
import CategoryNavbarTab from './index';

jest.mock('../../../core/createComponent', () => {
  return {
    createComponent: jest.fn((props) => {
      const state = props.initialState;
      return {
        state,
        render: () => props.render(state),
      };
    }),
    createElement: jest.fn((props) => {
      return Object.freeze(props);
    }),
  };
});

describe('CategoryNavbarTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  it('올바른 카테고리와 경로로 렌더링됩니다.', () => {
    const category = '테스트 카테고리';
    const path = '/test-path';
    const Tab = CategoryNavbarTab({ category, path });

    const tab = Tab.render();
    expect(tab).toBeTruthy();
    expect(tab.type).toBe('a');
    expect(tab.attributes?.href).toBe(path);
    expect(tab.children).toBeTruthy();
    expect(tab.children).toContain(category);
  });

  it('현재 경로와 일치할 때 active 클래스를 적용합니다.', () => {
    const category = '테스트 카테고리';
    const path = '/test-path';
    window.location.pathname = path;

    const Tab = CategoryNavbarTab({ category, path });
    const tab = Tab.render();

    expect(tab.classnames).toContain('tab');
    expect(tab.classnames).toContain('active');
  });

  it('현재 경로와 일치하지 않을 때 active 클래스를 적용하지 않습니다.', () => {
    const category = '테스트 카테고리';
    const path = '/test-path';

    const Tab = CategoryNavbarTab({ category, path });
    const tab = Tab.render();

    expect(tab.classnames).toContain('active');
    expect(tab.classnames).toContain('tab');
  });
});
