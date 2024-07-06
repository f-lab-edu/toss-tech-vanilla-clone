import { IEvent } from '../types/index';
import { ICreateComponentProps } from '../types/core';

/**
 * 요소에 속성을 설정합니다.
 * @param {HTMLElement} element - 속성을 설정할 요소
 * @param {Object.<string, string>} [attributes] - 설정할 속성들
 */
function setAttributes(
  element: HTMLElement,
  attributes?: { [key: string]: string },
) {
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value),
    );
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
 * 요소에 자식 요소들을 추가합니다.
 * @param {HTMLElement} element - 자식 요소들을 추가할 요소
 * @param {HTMLElement[]} [children] - 추가할 자식 요소들
 */
function appendChildren(element: HTMLElement, children?: HTMLElement[]) {
  if (children) {
    children.forEach((child) => element.appendChild(child));
  }
}

/**
 * 요소에 이벤트를 바인딩합니다.
 * @param {HTMLElement} element - 이벤트를 바인딩할 요소
 * @param {IBindEvent} [bindEvent] - 바인딩할 이벤트 객체
 */
function bindEvent(element: HTMLElement, event?: IEvent) {
  if (event) {
    const { type, listener } = event;
    element.addEventListener(type, listener);
  }
}

/**
 * HTML 요소를 생성합니다.
 * @param {IProps} props - 요소의 속성들
 * @param {keyof HTMLElementTagNameMap} props.type - 생성할 요소의 태그 이름
 * @param {string} [props.textContent] - 요소의 텍스트 내용
 * @param {Object.<string, string>} [props.attributes] - 요소의 속성들
 * @param {string[]} [props.classnames] - 요소의 클래스명들
 * @param {HTMLElement[]} [props.children] - 요소의 자식 요소들
 * @param {IBindEvent} [props.bindEvent] - 요소에 바인딩할 이벤트
 * @returns {HTMLElement} 생성된 HTML 요소
 */
function createComponent({
  type,
  textContent,
  attributes,
  classnames,
  children,
  event,
}: ICreateComponentProps): HTMLElement {
  const component = document.createElement(type);

  if (textContent) component.textContent = textContent;

  setAttributes(component, attributes);
  setClassnames(component, classnames);
  appendChildren(component, children);
  bindEvent(component, event);

  return component;
}

export { createComponent };
