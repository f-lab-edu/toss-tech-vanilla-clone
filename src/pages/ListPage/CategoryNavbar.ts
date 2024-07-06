import CategoryNavbarTab from './CategoryNavbarTab';
import { createComponent } from '../../core/createComponent';

const CATEGORIES = [
  { category: '전체', path: '/' },
  { category: '개발', path: '/tech' },
  { category: '디자인', path: '/design' },
];

function CategoryNavbar(): HTMLElement {
  /** Tabs */
  const tabs = CATEGORIES.map(({ category, path }) =>
    CategoryNavbarTab({ category, path }),
  );

  const navbar = createComponent({
    type: 'div',
    classnames: ['category-navbar'],
    children: tabs,
  });

  return navbar;
}

export default CategoryNavbar;
