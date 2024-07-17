interface Route {
  index?: boolean;
  path: string;
  element: HTMLElement;
}

interface LinkProps {
  to: string;
  classnames?: string[];
  children?: HTMLElement[];
}

interface Router {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
  go: (delta: number) => void;
}

export { Route, LinkProps, Router };
