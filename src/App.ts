import { createComponent, createElement } from '../src/core/createComponent';
import ListPage from './pages/ListPage';

/**
 * 애플리케이션의 루트 컴포넌트를 생성.
 *
 * @returns {HTMLElement} 루트 컴포넌트 객체를 반환.
 */
function App() {
  const App = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        children: ['Hello World'],
      });
    },
  });
  return App;
}

export default App;
