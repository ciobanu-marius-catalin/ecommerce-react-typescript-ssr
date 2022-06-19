import { withNoConsoleErrors } from '@test-utils';
import { LoginPage } from './index';
import { render } from '@testing-library/react';

describe('pages/auth/login/page', () => {
  it(
    'not crashes',
    withNoConsoleErrors(() => {
      render(<LoginPage />);
    })
  );
});
