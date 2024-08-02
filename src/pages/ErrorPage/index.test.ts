import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import { mount } from '../../core/createComponent';
import * as initializer from '../../init'; // 모듈 전체를 임포트합니다.
import { Router } from '../../core/router/types/router';
import ErrorPage from './index';

describe('ErrorPage', () => {
  let router: Router;
  let root: HTMLElement;

  beforeEach(() => {
    router = {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      go: jest.fn(),
    };

    // getRouter 함수를 모킹하여 원하는 값을 반환하도록 합니다.
    jest.spyOn(initializer, 'getRouter').mockImplementation(() => router);

    document.body.innerHTML = '<div id="root"></div>';
    root = document.getElementById('root') as HTMLElement;

    mount(ErrorPage(), root);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('에러 페이지를 렌더링해야 합니다.', () => {
    const heading = root.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('앗, 페이지를 찾지 못했어요');

    const message = root.querySelector('div');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('페이지 주소가 정확한지 확인해주세요.');

    const button = root.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('홈으로 가기');
  });

  it('홈으로 가기 버튼을 클릭하면 루트 경로로 이동해야 합니다.', () => {
    const button = root.querySelector('button') as HTMLElement;
    fireEvent.click(button);
    expect(router.push).toHaveBeenCalledWith('/');
  });
});
