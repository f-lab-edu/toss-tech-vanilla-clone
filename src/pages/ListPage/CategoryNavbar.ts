import CategoryNavbarTab from './CategoryNavbarTab';
import { createComponent, createElement } from '../../core/createComponent';

const CATEGORIES = [
  { category: '전체', path: '/' },
  { category: '개발', path: '/tech' },
  { category: '디자인', path: '/design' },
];

function CategoryNavbar() {
  /** Tabs */
  const Tabs = CATEGORIES.map(({ category, path }) =>
    CategoryNavbarTab({ category, path }),
  );

  const Navbar = createComponent({
    render: () => {
      return createElement({
        type: 'div',
        classnames: ['category-navbar'],
        children: [...Tabs],
      });
    },
  });

  return Navbar;
}

export default CategoryNavbar;
