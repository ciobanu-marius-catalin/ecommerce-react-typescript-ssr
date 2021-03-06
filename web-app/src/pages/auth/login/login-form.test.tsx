import singletonRouter, { useRouter } from 'next/router';
import {
  getAxiosValidationErrorResponse, sleep,
  withNoConsoleErrors,
} from '@test-utils';
import { LoginForm } from './login-form';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { axios, ErrorCatcher } from '@core';
import { screen } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';


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

    await sleep();

    const { result: router } = renderHook(() => {
      return useRouter();
    });
    expect(router.current).toMatchObject({ asPath: '/' });
  });

  it('failed login', async () => {
    axios.post.mockRejectedValueOnce(
      getAxiosValidationErrorResponse({
        validationErrors: {
          email: ['emailError'],
          password: ['password error'],
        },
      })
    );
    const { container } = render(
      <ErrorCatcher>
        <LoginForm />
      </ErrorCatcher>
    );

    const { submitButton } = getFormNodes(container);

    fireEvent.click(submitButton);

    await sleep();

    expect(await screen.getByTestId('alert')).toBeVisible();

    const emailErrorNode = await screen.getByTestId('email-error');
    expect(!!emailErrorNode.innerHTML).toEqual(true);

    const passwordErrorNode = await screen.getByTestId('password-error');

    expect(!!passwordErrorNode.innerHTML).toEqual(true);
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
