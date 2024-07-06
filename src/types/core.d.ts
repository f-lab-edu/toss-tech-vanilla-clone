interface ICreateComponentProps {
  type: keyof HTMLElementTagNameMap;
  textContent?: string;
  attributes?: { [key: string]: string };
  classnames?: string[];
  children?: HTMLElement[];
  event?: IEvent;
}

interface IRoute {
  index?: boolean;
  path: string;
  element: HTMLElement;
}

interface IRouter {
  push: (path: string) => void;
}

export { ICreateComponentProps, IRoute, IRouter };
