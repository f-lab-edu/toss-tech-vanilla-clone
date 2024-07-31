import { render } from './index'; // render 함수를 불러옵니다
import { init } from './init';

// init 함수를 모킹합니다
jest.mock('./init', () => ({
  init: jest.fn(),
}));

describe('render 함수', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });
  it('ID가 "root"인 HTML 요소에 init 함수를 호출해야 합니다', () => {
    // DOM에 #root 요소를 추가합니다.
    document.body.innerHTML = '<div id="root"></div>';

    // render 함수를 호출합니다.
    render();

    // init 함수가 #root 요소와 함께 호출되었는지 확인합니다.
    const $root = document.getElementById('root');
    expect(init).toHaveBeenCalledWith($root);
  });
});
