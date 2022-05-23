import { render, screen } from '@testing-library/react';
import { HomePage } from './index';

describe('pages/frontend/home', () => {
  it('not crashes', () => {
    render(<HomePage />);

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
