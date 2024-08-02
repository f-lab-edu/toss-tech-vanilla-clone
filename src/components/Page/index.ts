import { createComponent, createElement } from '../../core/createComponent';
import Navbar from './Navbar/index.ts';
import { Child } from '../../core/createComponent/types/createComponent.ts';

interface Props {
  classnames: string[];
  children: Child[];
}

function Page({ classnames, children }: Props) {
  const pageComponent = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['page', ...classnames],
        children: [Navbar(), ...children],
      });
    },
  });

  return pageComponent;
}

export default Page;
