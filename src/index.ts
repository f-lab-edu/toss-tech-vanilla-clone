import { init } from './init.ts';
/**
 * 'app' ID를 가진 HTML 요소에 애플리케이션 컴포넌트를 렌더링합니다.
 *  init을 통해 router와 같은 초기 설정을 합니다.
 * @function
 */
export const render = () => {
  const $root = document.getElementById('root') as HTMLElement;
  init($root);
};

render();
