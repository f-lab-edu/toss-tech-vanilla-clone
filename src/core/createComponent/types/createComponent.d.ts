/**
 * 이벤트 타입과 이벤트 리스너를 정의합니다.
 * @interface BindingEvent
 * @property {string} type - 이벤트 타입
 * @property {(e: Event) => void} listener - 이벤트 리스너
 */
interface BindingEvent {
  /**
   * 이벤트 타입
   * @type {string}
   */
  type: string;

  /**
   * 이벤트 리스너
   * @param {Event} e - 발생한 이벤트
   */
  listener: (e: Event) => void;
}

/**
 * 상태 객체를 정의합니다.
 * @interface State
 * @property {any} [key: string] - 상태 키와 값의 매핑
 */
interface State {
  [key: string]: any;
}

/**
 * 상태를 설정하는 함수를 정의합니다.
 * @interface SetState
 * @param {State} state - 새로운 상태
 */
interface SetState {
  (state: State): void;
}

/**
 * VComponent 또는 문자열 타입을 정의합니다.
 * @typedef {VComponent | string} Child
 */
type Child = VComponent | string;

/**
 * VElement 인터페이스를 정의합니다.
 * @interface VElement
 * @property {keyof HTMLElementTagNameMap} type - HTML 태그 타입
 * @property {Record<string, string>} [attributes] - 속성들의 매핑
 * @property {string[]} [classnames] - 클래스명 배열
 * @property {State} [state] - 컴포넌트 상태
 * @property {BindingEvent} [event] - 이벤트 바인딩 객체
 * @property {Child[]} [children] - 자식 요소들 (VComponent 또는 문자열)
 */
interface VElement {
  /**
   * HTML 태그 타입
   * @type {keyof HTMLElementTagNameMap}
   */
  type: keyof HTMLElementTagNameMap;

  /**
   * 속성들의 매핑
   * @type {Record<string, string>}
   * @optional
   */
  attributes?: Record<string, string>;

  /**
   * 클래스명 배열
   * @type {string[]}
   * @optional
   */
  classnames?: string[];

  /**
   * 컴포넌트 상태
   * @type {State}
   * @optional
   */
  state?: State;

  /**
   * 이벤트 바인딩 객체
   * @type {BindingEvent}
   * @optional
   */
  event?: BindingEvent;

  /**
   * 자식 요소들 (VComponent 또는 문자열)
   * @type {Child[]}
   * @optional
   */
  children?: Child[];
}

/**
 * 컴포넌트 생성 속성을 정의합니다.
 * @interface CreateComponentProps
 * @property {State} [initialState] - 초기 상태
 * @property {(state: State, setState: SetState) => VElement} render - 렌더링 함수
 * @property {(state: State, setState: SetState) => void} [componentDidMount] - 컴포넌트가 마운트될 때 호출되는 함수
 */
interface CreateComponentProps {
  /**
   * 초기 상태
   * @type {State}
   * @optional
   */
  initialState?: State;

  /**
   * 렌더링 함수
   * @param {State} state - 현재 상태
   * @param {SetState} setState - 상태 설정 함수
   * @returns {VElement} 렌더링된 VElement
   */
  render: (state: State, setState: SetState) => VElement;

  /**
   * 컴포넌트가 마운트될 때 호출되는 함수
   * @param {SetState} setState - 상태 설정 함수
   * @optional
   */
  componentDidMount?: (state: State, setState: SetState) => void;
}

/**
 * VComponent 인터페이스를 정의합니다.
 * @interface VComponent
 * @property {State} [state] - 컴포넌트 상태
 * @property {() => VElement} render - VElement를 반환하는 렌더링 함수
 * @property {(state: State, setState: SetState) => void} [componentDidMount] - 컴포넌트가 마운트될 때 호출되는 함수
 */
interface VComponent {
  /**
   * 컴포넌트 상태
   * @type {State}
   * @optional
   */
  state?: State;

  /**
   * VElement를 반환하는 렌더링 함수
   * @returns {VElement} 렌더링된 VElement
   */
  render: () => VElement;

  /**
   * 컴포넌트가 마운트될 때 호출되는 함수
   * @param {SetState} setState - 상태 설정 함수
   * @optional
   */
  componentDidMount?: () => void;
  componentDidMountCalled?: boolean;
}

/**
 * CreateElementProps 인터페이스를 정의합니다.
 * @interface CreateElementProps
 * @extends VElement
 * @property {State} [initialState] - 초기 상태
 * @property {(state?: State, setState: SetState) => VElement} [render] - 렌더링 함수
 * @property {(state: State, setState: SetState) => void} [componentDidMount] - 컴포넌트가 마운트될 때 호출되는 함수
 */
interface CreateElementProps extends VElement {
  /**
   * 초기 상태
   * @type {State}
   * @optional
   */
  initialState?: State;

  /**
   * 렌더링 함수
   * @param {State} state - 현재 상태
   * @param {SetState} setState - 상태 설정 함수
   * @returns {VElement} 렌더링된 VElement
   * @optional
   */
  render?: (state?: State, setState: SetState) => VElement;

  /**
   * 컴포넌트가 마운트될 때 호출되는 함수
   * @param {SetState} setState - 상태 설정 함수
   * @optional
   */
  componentDidMount?: (state: State, setState: SetState) => void;
}

/**
 * VComponent 또는 문자열 타입을 정의합니다.
 * @typedef {VComponent | string} ComponentChild
 */
type ComponentChild = VComponent | string;

export {
  BindingEvent,
  State,
  SetState,
  Child,
  ComponentChild,
  VElement,
  CreateComponentProps,
  VComponent,
};
