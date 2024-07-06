import App from './App';
import { render as renderApp } from './index.ts'; // render 함수를 import 합니다.

jest.mock('./App', () => ({
  __esModule: true,
  default: jest.fn(() => document.createElement('div')),
}));

describe('render', () => {
  it('App 컴포넌트를 root 요소에 추가한다', () => {
    document.body.innerHTML = '<div id="root"></div>';

    renderApp();

    const root = document.getElementById('root');

    expect(root?.firstChild).toBeInstanceOf(HTMLElement);
    expect(root?.firstChild).toStrictEqual(App());
  });
});
