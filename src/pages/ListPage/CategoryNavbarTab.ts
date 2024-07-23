import { createComponent } from '../../core/createComponent';

interface CategoryNavbarTabProps {
  category: string;
  path: string;
}

function CategoryNavbarTab({
  category,
  path,
}: CategoryNavbarTabProps): HTMLElement {
  const span = createComponent({
    type: 'span',
    textContent: category,
  });
  const tab = createComponent({
    type: 'a',
    classnames: ['tab'],
    attributes: {
      href: path,
    },
    children: [span],
  });

  return tab;
}

export default CategoryNavbarTab;
