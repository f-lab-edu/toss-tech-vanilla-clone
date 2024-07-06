import { createComponent } from './createComponent';
import { IRouter } from '../types/core';

let routeMap: { [key: string]: Element } = {};
export let router: IRouter;

/**
 * 라우터 생성에 필요한 속성을 정의합니다.
 * @interface ICreateRouterProps
 * @property {any} routes - 경로와 해당 컴포넌트 매핑
 * @property {HTMLElement} root - 라우터가 작동할 루트 엘리먼트
 */
interface ICreateRouterProps {
  routes: any;
  root: HTMLElement;
}

/**
 * 라우터를 생성합니다.
 * @function
 * @name createRouter
 * @param {ICreateRouterProps} props - 라우터 생성에 필요한 속성
 * @returns {IRouter} - 라우터 인터페이스를 반환합니다.
 */
export function createRouter({ routes, root }: ICreateRouterProps): IRouter {
  routeMap = routes;

  // find all links(a tags with path attribute) and add event listeners
  const links = root.querySelectorAll('a[path]');
  links.forEach((link) => {
    const path = link.getAttribute('path');
    if (path && routes[path]) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        push(path);
      });
    }
  });
  router = { push };
  return router;
}

/**
 * 주어진 경로로 브라우저 히스토리를 업데이트하고 페이지를 렌더링합니다.
 * @function
 * @name push
 * @param {string} path - 이동할 경로
 */
function push(path: string) {
  history.pushState({}, '', path);
  render(path);
}

/**
 * 주어진 경로에 따라 적절한 페이지 컴포넌트를 렌더링합니다.
 * @function
 * @name render
 * @param {string} path - 렌더링할 경로
 */
function render(path: string) {
  const $root = document.getElementById('root') as HTMLElement;
  const newPageComponent = routeMap[path];
  const $page = document.querySelector('.page');
  if ($page) {
    $root.replaceChild(newPageComponent, $page);
  } else {
    $root.appendChild(newPageComponent);
  }
}

/**
 * Link 컴포넌트의 속성을 정의합니다.
 * @interface ILinkProps
 * @property {string} to - 이동할 경로
 * @property {string[]} classnames - 적용할 클래스 이름 배열
 * @property {HTMLElement[]} children - 자식 요소들
 */
interface ILinkProps {
  to: string;
  classnames?: string[];
  children?: HTMLElement[];
}
/**
 * Link 컴포넌트를 생성합니다.
 * @function
 * @name Link
 * @param {ILinkProps} props - Link 컴포넌트의 속성
 * @returns {HTMLElement} 생성된 Link 컴포넌트
 */
export function Link({ to, classnames, children }: ILinkProps) {
  const link = createComponent({
    type: 'a',
    classnames,
    attributes: {
      path: to,
      href: '#',
    },
    children,
    event: {
      type: 'click',
      listener: (e: Event) => {
        e.preventDefault();
        push(to);
      },
    },
  });
  return link;
}
