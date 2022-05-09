import { render, screen } from '@testing-library/react';
import { HomePage } from './index';

describe('pages/frontend/home', () => {
  it('not crashes', () => {
    // const spy = jest.spyOn(global.console, "error");
    render(<HomePage />);

    // expect(spy).not.toHaveBeenCalled();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
