import '@testing-library/jest-dom';
import {
  createComponent,
  createElement,
  render,
} from '../../core/createComponent';
import Page from './index.ts';

describe('Page Component', () => {
  it('주어진 클래스명과 자식 요소들로 Page 컴포넌트를 렌더링해야 합니다', () => {
    // Navbar 컴포넌트를 모킹합니다
    jest.mock('./Navbar/index.ts', () => {
      return jest.fn(() => {
        return createComponent({
          render: () => {
            return createElement({
              type: 'nav',
              classnames: ['navbar'],
              children: ['Navbar Content'],
            });
          },
        });
      });
    });

    // 테스트할 props 준비
    const props = {
      classnames: ['custom-class'],
      children: [
        createComponent({
          render: () => {
            return createElement({
              type: 'p',
              children: ['Child Content'],
            });
          },
        }),
      ],
    };

    // DOM에 컴포넌트를 추가합니다.
    document.body.innerHTML = '<div id=root></div>';
    const root = document.getElementById('root') as HTMLElement;
    render(Page(props), root);

    // Assertions (검증)
    const pageElement = root.querySelector('.page.custom-class');
    expect(pageElement).toBeInTheDocument();
    expect(pageElement).toContainElement(root.querySelector('.navbar'));
    expect(pageElement).toContainElement(root.querySelector('p'));
    expect(root.querySelector('p')).toHaveTextContent('Child Content');

    // 클린업
    root.remove();
  });
});
