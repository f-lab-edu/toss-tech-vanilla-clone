import { createComponent, createElement } from '../../core/createComponent';
import { router } from '../../init';

interface CategoryNavbarTabProps {
  category: string;
  path: string;
}

function CategoryNavbarTab({ category, path }: CategoryNavbarTabProps) {
  const Tab = createComponent({
    initialState: {
      active: window.location.pathname === path,
    },
    render: (state) => {
      return createElement({
        type: 'a',
        classnames: state.active ? ['active', 'tab'] : ['tab'],
        attributes: {
          href: path,
        },
        event: {
          type: 'click',
          listener: (e: Event) => {
            e.preventDefault();
            router.push(path);
          },
        },
        children: [`${category}`],
      });
    },
  });

  return Tab;
}

export default CategoryNavbarTab;
