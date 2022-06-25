import singletonRouter, { useRouter } from 'next/router';
import {
  getAxiosValidationErrorResponse,
  sleep,
  withNoConsoleErrors,
} from '@test-utils';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { axios, ErrorCatcher } from '@core';
import { screen } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';
import { RegisterForm } from './register-form';

describe('pages/auth/register/register-form', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/register');
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  it("doesn't crash", () => {
    render(<RegisterForm />);
  });
  it('submit form successfully', async () => {
    axios.post.mockResolvedValueOnce();
    const { container } = render(<RegisterForm />);
    const name = 'name';
    const email = 'test@email.com';
    const password = 'testPassword';
    const confirmPassword = password;
    const {
      nameInputNode,
      emailInputNode,
      passwordInputNode,
      submitButton,
      confirmPasswordNode,
    } = getFormNodes(container);

    const nodesFound =
      !!nameInputNode &&
      !!emailInputNode &&
      !!passwordInputNode &&
      !!submitButton &&
      !!confirmPasswordNode;
    expect(nodesFound).toEqual(true);

    fireEvent.change(nameInputNode, {
      target: { value: name },
    });

    fireEvent.change(emailInputNode, {
      target: { value: email },
    });
    fireEvent.change(passwordInputNode, { target: { value: password } });

    fireEvent.change(confirmPasswordNode, {
      target: { value: confirmPassword },
    });

    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith('/register', {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    });
  });
  it('successfully registered', async () => {
    axios.post.mockResolvedValueOnce();
    const { container } = render(<RegisterForm />);
    const { submitButton } = getFormNodes(container);

    fireEvent.click(submitButton);

    await sleep();

    const { result: router } = renderHook(() => {
      return useRouter();
    });
    expect(router.current).toMatchObject({ asPath: '/login' });
  });

  it('failed registration', async () => {
    axios.post.mockRejectedValueOnce(
      getAxiosValidationErrorResponse({
        validationErrors: {
          name: ['nameError'],
           email: ['emailError'],
           password: ['password error'],
           password_confirmation: ['confirm password error'],
        },
      })
    );
    const { container } = render(
      <ErrorCatcher>
        <RegisterForm />
      </ErrorCatcher>
    );

    const { submitButton } = getFormNodes(container);

    fireEvent.click(submitButton);

    await sleep();

    expect(await screen.getByTestId('alert')).toBeVisible();

    const validationTestIds = [
      'name-error',
      'email-error',
      'password-error',
      'confirm-password-error',
    ];
    validationTestIds.map((testId) => {
      const node = screen.getByTestId(testId);
      expect(!!node.innerHTML).toEqual(true);
    });
  });
});

function getFormNodes(container) {
  const nameInputNode = container.querySelector('[name="name"]');
  const emailInputNode = container.querySelector('input[type="email"]');
  const passwordInputNode = container.querySelector('[name="password"]');
  const confirmPasswordNode = container.querySelector(
    '[name="confirmPassword"]'
  );
  const submitButton = container.querySelector('button[type="submit"]');
  return {
    nameInputNode,
    emailInputNode,
    passwordInputNode,
    submitButton,
    confirmPasswordNode,
  };
}
