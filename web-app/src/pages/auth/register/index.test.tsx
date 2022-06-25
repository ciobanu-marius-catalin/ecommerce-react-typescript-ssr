import { withNoConsoleErrors } from '@test-utils';
import { RegisterPage } from './index';
import { render } from '@testing-library/react';

describe('pages/auth/register/index', () => {
  it(
    'not crashes',
    withNoConsoleErrors(() => {
      render(<RegisterPage />);
    })
  );
});
