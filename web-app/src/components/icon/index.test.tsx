import { render } from '@testing-library/react';
import { Icon } from './index';
import { withNoConsoleErrors } from '@test-utils';

describe('components/icon', () => {
  it(
    'correct icon',
    withNoConsoleErrors(() => {
      const iconName = 'test';
      const { container } = render(<Icon name={iconName} />);
      // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
      const iconNode = container.querySelector('.fas');
      expect(!!iconNode).toEqual(true);
      if (!iconNode) {
        return;
      }
      expect(iconNode.classList.contains(`fa-${iconName}`)).toEqual(true);
    })
  );
});
