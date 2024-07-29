import { createComponent, createElement } from '../../../core/createComponent';

interface CategoryNavbarTabProps {
  category: string;
  path: string;
}

function CategoryNavbarTab({ category, path }: CategoryNavbarTabProps) {
  const Tab = createComponent({
    initialState: {
      active: window.location.pathname === path,
      isHovered: false,
    },
    render: (state) => {
      return createElement({
        type: 'a',
        classnames: state.active ? ['active', 'tab'] : ['tab'],
        attributes: {
          href: path,
        },
        children: [`${category}`],
      });
    },
  });

  return Tab;
}

export default CategoryNavbarTab;
