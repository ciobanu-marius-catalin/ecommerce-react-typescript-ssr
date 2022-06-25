import React, { ReactElement } from 'react';

import { Alert, Button, Form } from 'react-bootstrap';

import {
  useFormData,
  UseFormDataReturnType,
  useDeepCallback,
  useErrorCatcher,
} from '@core';
import { useAuth, RegisterFormInterface } from '@repositories';

type OnSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;

function RegisterForm(): ReactElement {
  const defaultFormData: RegisterFormInterface = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  const { form, getFormData }: UseFormDataReturnType<RegisterFormInterface> =
    useFormData<RegisterFormInterface>(defaultFormData);
  const { error, getValidationError } = useErrorCatcher();
  const { register } = useAuth();
  const { errorMessage } = error || {};

  const onSubmit: OnSubmitType = useDeepCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      register(form);
    },
    [form]
  );
  return (
    <Form onSubmit={onSubmit}>
      {errorMessage && (
        <Alert variant={'danger'} data-testid="alert">
          {errorMessage}
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter name"
          {...getFormData('name')}
          isInvalid={!!getValidationError('name')}
        />
        <Form.Control.Feedback type="invalid" data-testid="name-error">
          {getValidationError('name')}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email address"
          {...getFormData('email')}
          isInvalid={!!getValidationError('email')}
        />
        <Form.Control.Feedback type="invalid" data-testid="email-error">
          {getValidationError('email')}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter password"
          {...getFormData('password')}
          isInvalid={!!getValidationError('email')}
        />
        <Form.Control.Feedback type="invalid" data-testid="password-error">
          {getValidationError('password')}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password_confirmation">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          {...getFormData('password_confirmation')}
          isInvalid={!!getValidationError('password_confirmation')}
        />
        <Form.Control.Feedback
          type="invalid"
          data-testid="confirm-password-error"
        >
          {getValidationError('password_confirmation')}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form.Group>
    </Form>
  );
}

export { RegisterForm };
