import singletonRouter, { useRouter } from 'next/router';
import { withNoConsoleErrors } from '@test-utils';
import { LoginForm } from './login-form';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { axios } from '@core';
import { screen } from '@testing-library/dom';

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});
jest.mock('next/router', () => require('next-router-mock'));

//jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('pages/auth/login/login-form', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/login');
  });
  it(
    "doesn't crash",
    withNoConsoleErrors(() => {
      render(<LoginForm />);
    })
  );
  it('successfully login', async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({ status: 400, data: {} })
    );
    const { container } = render(<LoginForm />);

    const emailInputNode = container.querySelector('input[type="email"]');
    const passwordInputNode = container.querySelector('input[type="password"]');
    const submitButton = container.querySelector('button[type="submit"]');
    const nodesFound =
      !!emailInputNode && !!passwordInputNode && !!submitButton;
    expect(nodesFound).toEqual(true);

    if (!nodesFound) {
      return;
    }

    fireEvent.change(emailInputNode, {
      target: { value: 'admin@gmail.com' },
    });
    fireEvent.change(passwordInputNode, { target: { value: 'admin2' } });

    fireEvent.click(submitButton);
    expect(await screen.getByText('The given data was invalid')).toBeVisible();
    //await waitFor(() => container.querySelector('input[type="email"]'));
    // const { result } = renderHook(() => {
    //   return useRouter();
    // });
    // expect(result.current).toMatchObject({ asPath: '/' });
    // await waitFor(() => document.querySelector('.gravity-front-page'));
    // await waitFor(() => {
    //   expect(singletonRouter).toMatchObject({
    //     asPath: '/register',
    //   });
    // });
  });
});
