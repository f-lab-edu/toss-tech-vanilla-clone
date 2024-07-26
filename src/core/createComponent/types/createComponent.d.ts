interface BindingEvent {
  type: string;
  listener: (e: Event) => void;
}

interface State {
  [key: string]: any;
}

interface SetState {
  (state: State): void;
}

type Child = VComponent | string;
interface VElement {
  type: keyof HTMLElementTagNameMap;
  attributes?: Record<string, string>;
  classnames?: string[];
  state?: State;
  event?: BindingEvent;
  children?: Child[]; // 자식이 Virtual Element 노드 이거나 심플한 문자열인 경우
}

interface CreateComponentProps {
  initialState?: State;
  render: (state: State, setState: SetState) => VElement;
  componentDidMount?: (setState: SetState) => void;
}

interface VComponent {
  state?: State;
  render: () => VElement;
  componentDidMount?: (setState: SetState) => void;
}

interface CreateElementProps extends VElement {
  initialState?: State;
  render?: (state?: State, setState: SetState) => VElement;
  componentDidMount?: (setState: SetState) => void;
}

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
