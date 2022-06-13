import React, { ReactElement} from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import {
  useFormData,
  UseFormDataReturnType,
  useDeepCallback,
  useErrorCatcher,
} from '@core';
import { useAuth, LoginFormInterface } from '@repositories';



type OnSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;

function LoginForm(): ReactElement {
  const defaultFormData: LoginFormInterface = {
    email: '',
    password: '',
  };
  const { form, getFormData }: UseFormDataReturnType<LoginFormInterface> =
    useFormData<LoginFormInterface>(defaultFormData);
  const { error, getValidationError } = useErrorCatcher();
  const { login } = useAuth();
  const { errorMessage } = error || {};

  const onSubmit: OnSubmitType = useDeepCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(form);
    },
    [form]
  );
  return (
    <Form onSubmit={onSubmit}>
      {errorMessage && <Alert variant={'danger'}>{errorMessage}</Alert>}

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email address"
          {...getFormData('email')}
          isInvalid={!!getValidationError('email')}
        />
        <Form.Control.Feedback type="invalid">
          {getValidationError('email')}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          {...getFormData('password')}
          isInvalid={!!getValidationError('email')}
        />
        <Form.Control.Feedback type="invalid">
          {getValidationError('password')}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form.Group>

      <Form.Group className="mb-5 d-flex justify-content-between align-items-center">
        <Form.Check type="checkbox" id="custom-switch" label="Remember Me" />
        <Link href={`/forgot-password`}>Forgot password</Link>
      </Form.Group>

      <Form.Group className="d-flex justify-content-center">
        <span>Don't have an account? </span>
        <Link href={'/register'} passHref>
          <a href="#">
            <strong className="px-3">Sign up</strong>
          </a>
        </Link>
      </Form.Group>
    </Form>
  );
}

export { LoginForm };
