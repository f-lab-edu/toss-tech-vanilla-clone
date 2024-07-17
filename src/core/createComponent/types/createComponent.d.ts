interface BindingEvent {
  type: keyof HTMLElementTagNameMap;
  listener: (e: Event) => void;
}

interface CreateComponentProps {
  type: keyof HTMLElementTagNameMap;
  textContent?: string;
  attributes?: { [key: string]: string };
  classnames?: string[];
  children?: HTMLElement[];
  event?: BindingEvent;
}

export { BindingEvent, CreateComponentProps };
