import singletonRouter, { useRouter } from 'next/router';
import {
  getAxiosValidationErrorResponse,
  withNoConsoleErrors,
} from '@test-utils';
import { LoginForm } from './login-form';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { axios, ErrorCatcher } from '@core';
import { screen } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';

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

// const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('pages/auth/login/login-form', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/login');
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  it("doesn't crash", () => {
    render(<LoginForm />);
  });
  it('submit form successfully', async () => {
    axios.post.mockResolvedValueOnce();
    const { container } = render(<LoginForm />);
    const email = 'test@email.com';
    const password = 'testPassword';
    const { emailInputNode, passwordInputNode, submitButton } =
      getFormNodes(container);

    const nodesFound =
      !!emailInputNode && !!passwordInputNode && !!submitButton;
    expect(nodesFound).toEqual(true);

    fireEvent.change(emailInputNode, {
      target: { value: email },
    });
    fireEvent.change(passwordInputNode, { target: { value: password } });

    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith('/login', {
      email,
      password,
    });
  });
  it('successfully logged in', async () => {
    axios.post.mockResolvedValueOnce();
    const { container } = render(<LoginForm />);
    const { submitButton } = getFormNodes(container);

    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const { result: router } = renderHook(() => {
      return useRouter();
    });
    expect(router.current).toMatchObject({ asPath: '/' });
  });

  it('failed login', async () => {
    axios.post.mockRejectedValueOnce(getAxiosValidationErrorResponse());
    const { container } = render(
      <ErrorCatcher>
        <LoginForm />
      </ErrorCatcher>
    );

    const { submitButton } = getFormNodes(container);

    fireEvent.click(submitButton);

    await new Promise((r) => setTimeout(r, 200));

    expect(await screen.getByTestId('alert')).toBeVisible();
  });
});

function getFormNodes(container) {
  const emailInputNode = container.querySelector('input[type="email"]');
  const passwordInputNode = container.querySelector('input[type="password"]');
  const submitButton = container.querySelector('button[type="submit"]');
  return {
    emailInputNode,
    passwordInputNode,
    submitButton,
  };
}
