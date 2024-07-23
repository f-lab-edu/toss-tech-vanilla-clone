import { createComponent } from '../../core/createComponent';
import Navbar from './Navbar/index.ts';

interface Props {
  classnames: string[];
  children: HTMLElement[];
}

function Page({ classnames, children }: Props) {
  const contentContainer = createComponent({
    type: 'div',
    classnames: ['content-container'],
    children: [...children],
  });

  const page = createComponent({
    type: 'div',
    classnames: ['page', ...classnames],
    children: [Navbar(), contentContainer],
  });

  return page;
}

export default Page;
