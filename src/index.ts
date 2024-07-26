import App from './App.ts';
import { renderAll } from './core/createComponent';
import { init } from './init.ts';
/**
 * 'app' ID를 가진 HTML 요소에 애플리케이션 컴포넌트를 렌더링합니다.
 *
 * @function
 */
export const render = () => {
  const $root = document.getElementById('root') as HTMLElement;
  init($root);
  renderAll(App, $root);
};

render();
