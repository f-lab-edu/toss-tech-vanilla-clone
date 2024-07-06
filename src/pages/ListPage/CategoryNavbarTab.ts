import { createComponent } from '../../core/createComponent';
import { Link } from '../../core/router';

interface ICategoryNavbarTabProps {
  category: string;
  path: string;
}

function CategoryNavbarTab({
  category,
  path,
}: ICategoryNavbarTabProps): HTMLElement {
  const span = createComponent({
    type: 'span',
    textContent: category,
  });

  const tab = Link({
    to: path,
    classnames: ['tab'],
    children: [span],
  });

  return tab;
}

export default CategoryNavbarTab;
