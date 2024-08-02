import {
  BindingEvent,
  State,
  Child,
  VElement,
  VComponent,
  CreateComponentProps,
} from './types/createComponent';

function buildCreateComponent() {
  /**
   * appComponent는 render 함수를 통해 state이 반영된 Virtual DOM을 생성한다.
   */
  let appComponent: VComponent;

  /**
   * 요소에 속성을 설정합니다.
   * @param {HTMLElement} element - 속성을 설정할 요소
   * @param {Record<string, string>} [attributes] - 설정할 속성들
   */
  function setAttributes(
    element: HTMLElement,
    attributes?: Record<string, string>,
  ) {
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
      }
    }
  }

  /**
   * 요소에 클래스명을 설정합니다.
   * @param {HTMLElement} element - 클래스명을 설정할 요소
   * @param {string[]} [classnames] - 설정할 클래스명 배열
   */
  function setClassnames(element: HTMLElement, classnames?: string[]) {
    if (classnames) {
      element.classList.add(...classnames);
    }
  }

  /**
   * 요소에 이벤트를 바인딩합니다.
   * @param {HTMLElement} element - 이벤트를 바인딩할 요소
   * @param {BindingEvent} [event] - 바인딩할 이벤트 객체
   */
  function bindEvent(element: HTMLElement, event?: BindingEvent) {
    if (event) {
      element.addEventListener(event.type, event.listener);
    }
  }

  /**
   * 컴포넌트를 생성합니다.
   * @param {CreateComponentProps} props - 컴포넌트 생성 속성들
   * @returns {VComponent} 생성된 컴포넌트
   */
  function createComponent({
    initialState,
    render,
    componentDidMount,
  }: CreateComponentProps): VComponent {
    let state: State = initialState || {};
    const setState = (newState: State) => {
      if (state !== newState) {
        state = newState;
        const root = document.getElementById('root');
        mount(appComponent, root as HTMLElement);
      }
    };

    const component: VComponent = {
      state,
      render: () => render(state, setState),
    };

    if (componentDidMount) {
      component.componentDidMount = () => componentDidMount(setState);
    }

    return component;
  }

  /**
   * VirtualDOM 표현하는 object를 만들어낸다. React의 createElement와 유사합니다.
   * @param {VElement} props - 요소의 속성들
   * @returns {VElement} 생성된 VirtualDOM 요소
   */
  function createElement({
    type,
    attributes,
    classnames,
    event,
    children,
  }: VElement): VElement {
    return Object.freeze({ type, attributes, classnames, event, children });
  }

  /**
   * VirtualDOM을 실제 DOM으로 변환합니다.
   * VComponent의 render함수를 통해 VirtualDOM을 생성 후 DOM으로 변환한다.
   * @param {Child} child - VComponent | string
   * @returns {HTMLElement} 변환된 DOM 요소
   */
  function generateDOMFromVirtualDOM(child: Child): HTMLElement {
    if (typeof child === 'string') {
      const textElement = document.createElement('span');
      textElement.textContent = child;
      return textElement;
    } else {
      const { type, attributes, classnames, event, children } = child.render();
      const element = document.createElement(type);
      setAttributes(element, attributes);
      setClassnames(element, classnames);
      bindEvent(element, event);

      if (children) {
        const childrenDOM = children.map(generateDOMFromVirtualDOM);
        element.append(...childrenDOM);
      }

      return element;
    }
  }

  /**
   * VirtualDOM을 순회하여 실제 DOM으로 변환하고, 특정 루트 요소에 삽입합니다.
   * @param {VComponent} component - 렌더링할 컴포넌트
   * @param {HTMLElement} root - 루트 요소
   */
  function mount(component: VComponent, root: HTMLElement) {
    appComponent = component;
    if (root?.firstElementChild) {
      unmount(root?.firstElementChild as HTMLElement, root as HTMLElement);
    }
    const dom = generateDOMFromVirtualDOM(component);
    root.appendChild(dom);
  }

  /**
   * 특정 DOM 요소를 루트 요소에서 제거합니다.
   * @param {HTMLElement} dom - 제거할 DOM 요소
   * @param {HTMLElement} root - 루트 요소
   */
  function unmount(dom: HTMLElement, root: HTMLElement) {
    root.removeChild(dom);
  }

  return {
    createComponent,
    createElement,
    mount,
    unmount,
    setAttributes,
    setClassnames,
    bindEvent,
    generateDOMFromVirtualDOM,
  };
}

export const {
  createComponent,
  createElement,
  mount,
  unmount,
  setAttributes,
  setClassnames,
  bindEvent,
  generateDOMFromVirtualDOM,
} = buildCreateComponent();
