import { createComponent } from './core/createComponent/index.ts';
import { init } from './init.ts';

/**
 * 애플리케이션의 루트 컴포넌트를 생성.
 *
 * @returns {HTMLElement} 루트 컴포넌트 객체를 반환.
 */
function App(): HTMLElement {
  const app = createComponent({ type: 'div' });
  init(app);
  return app;
}

export default App;
