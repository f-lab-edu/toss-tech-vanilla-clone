import '@testing-library/jest-dom';
import { render } from '../../core/createComponent';
import { router } from '../../init';
import ErrorPage from './index';

// router 모킹
jest.mock('../../init', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('ErrorPage 컴포넌트', () => {
  it('올바르게 렌더링되고 버튼 클릭 시 홈으로 이동해야 합니다', () => {
    // DOM에 컴포넌트를 추가합니다.
    document.body.innerHTML = '<div id="root"></div>';
    const root = document.getElementById('root') as HTMLElement;
    render(ErrorPage(), root);

    // Assertions (검증)
    const errorPageElement = root.querySelector('.error-page');
    expect(errorPageElement).toBeInTheDocument();

    const headingElement = errorPageElement?.querySelector('h2');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('앗, 페이지를 찾지 못했어요');

    const buttonElement = errorPageElement?.querySelector('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('홈으로 가기');

    // 버튼 클릭 이벤트 시뮬레이션
    buttonElement?.click();
    expect(router.push).toHaveBeenCalledWith('/');

    // 클린업
    root.remove();
  });
});
