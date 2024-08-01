import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import {
  createComponent,
  createElement,
  render,
  reRender,
  unmount,
  setAttributes,
  setClassnames,
  bindEvent,
  generateDOMFromVirtualDOM,
} from './index';
import {
  BindingEvent,
  State,
  SetState,
  VElement,
  VComponent,
} from './types/createComponent';

const initialState: State = { count: 0 };

const initializeComponent = (): VComponent => {
  return createComponent({
    initialState,
    render: (state: State, setState?: SetState): VElement => {
      const updateState = setState || (() => {});
      return createElement({
        type: 'button',
        attributes: { id: 'increment' },
        event: {
          type: 'click',
          listener: () => updateState({ count: state.count + 1 }),
        },
        children: [`Count: ${state.count}`],
      });
    },
  });
};

const setupDOM = () => {
  document.body.innerHTML = '<div id="root"></div>';
  return document.getElementById('root') as HTMLElement;
};

describe('createComponent 테스트', () => {
  test('컴포넌트를 생성합니다.', () => {
    const component: VComponent = initializeComponent();

    expect(component).toHaveProperty('state', initialState);
    expect(component).toHaveProperty('render');
  });

  test('컴포넌트 상태를 업데이트시 새로운 불변객체 VirtualDOM을 생성하고 화면을 업데이트합니다.', () => {
    const component: VComponent = initializeComponent();
    const root = setupDOM();
    render(component, root);

    const button1 = document.getElementById('increment') as HTMLElement;
    expect(button1).toHaveTextContent('Count: 0');

    fireEvent.click(button1);
    const button2 = document.getElementById('increment') as HTMLElement;
    expect(button1).not.toBe(button2);
    expect(button1).not.toBeVisible();
    expect(button2).toHaveTextContent('Count: 1');
  });
});

describe('render 테스트', () => {
  test('컴포넌트를 특정 DOM 요소에 마운트합니다.', () => {
    const component: VComponent = initializeComponent();
    const root = setupDOM();
    render(component, root);

    const button1 = document.getElementById('increment') as HTMLElement;
    expect(button1).toBeInTheDocument();
  });
});

describe('unmount 테스트', () => {
  test('DOM 요소를 제거합니다.', () => {
    const component: VComponent = initializeComponent();
    const root = setupDOM();
    const mountedDOM = generateDOMFromVirtualDOM(component);
    root.appendChild(mountedDOM);

    expect(root.firstChild).toBe(mountedDOM);

    unmount(mountedDOM, root);

    expect(root.firstChild).toBeNull();
  });
});

describe('reRender 테스트', () => {
  test('상태 변경 후 컴포넌트를 다시 렌더링합니다.', () => {
    const component: VComponent = initializeComponent();
    const root = setupDOM();
    render(component, root);

    const button1 = document.getElementById('increment') as HTMLElement;
    expect(button1).toHaveTextContent('Count: 0');

    fireEvent.click(button1);
    const button2 = document.getElementById('increment') as HTMLElement;
    expect(button2).toHaveTextContent('Count: 1');

    fireEvent.click(button2);
    const button3 = document.getElementById('increment') as HTMLElement;
    reRender();
    expect(button1).not.toBe(button2);
    expect(button2).not.toBe(button3);
    expect(button3).toHaveTextContent('Count: 2');
  });
});

describe('setAttributes 테스트', () => {
  test('요소에 속성을 설정합니다.', () => {
    const element = document.createElement('div');
    const attributes = { id: 'test-id', title: 'test-title' };

    setAttributes(element, attributes);

    expect(element).toHaveAttribute('id', 'test-id');
    expect(element).toHaveAttribute('title', 'test-title');
  });
});

describe('setClassnames 테스트', () => {
  test('요소에 클래스명을 설정합니다.', () => {
    const element = document.createElement('div');
    const classnames = ['class1', 'class2'];

    setClassnames(element, classnames);

    expect(element).toHaveClass('class1');
    expect(element).toHaveClass('class2');
  });
});

describe('bindEvent 테스트', () => {
  test('요소에 이벤트를 바인딩합니다.', () => {
    const element = document.createElement('button');
    const mockFn = jest.fn();
    const event: BindingEvent = { type: 'click', listener: mockFn };

    bindEvent(element, event);

    fireEvent.click(element);
    expect(mockFn).toHaveBeenCalled();
  });
});

describe('generateDOMFromVirtualDOM 테스트', () => {
  test('VDOM을 실제 DOM으로 변환합니다.', () => {
    const vdom: VComponent = createComponent({
      render: () => {
        return createElement({
          type: 'div',
          attributes: { id: 'vdom-test' },
          classnames: ['vdom-class'],
          children: ['Hello World'],
        });
      },
    });

    const dom = generateDOMFromVirtualDOM(vdom);

    expect(dom).toBeInstanceOf(HTMLElement);
    expect(dom).toHaveAttribute('id', 'vdom-test');
    expect(dom).toHaveClass('vdom-class');
    expect(dom).toHaveTextContent('Hello World');
  });
});
