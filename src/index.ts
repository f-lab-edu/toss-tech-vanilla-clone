import App from './App.ts';

/**
 * 'app' ID를 가진 HTML 요소에 애플리케이션 컴포넌트를 렌더링합니다.
 *
 * @function
 */
export const render = () => {
  const $root = document.getElementById('root');

  $root?.appendChild(App());
};

render();
