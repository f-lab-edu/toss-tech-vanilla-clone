import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
import ErrorPage from './index';
import { router } from '../../core/router';

jest.mock('../../core/router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('ErrorPage', () => {
  let errorPage: HTMLElement;
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    errorPage = ErrorPage();
    document.body.appendChild(errorPage);
  });

  it('접근 오류 페이지의 해딩과 안내 메세지를 노출한다.', () => {
    expect(errorPage).toBeInTheDocument();
    expect(errorPage).toHaveClass('error-page');

    const heading = screen.getByText('앗, 페이지를 찾지 못했어요');
    expect(heading).toBeInTheDocument();

    const message = screen.getByText('페이지 주소가 정확한지 확인해주세요.');
    expect(message).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('홈으로 가기');
  });

  it('"홈으로 가기 버튼"을 누르면 홈으로 페이지 이동한다.', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('홈으로 가기');

    fireEvent.click(button);
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith('/');
  });
});
