import { useRouter } from 'next/router';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { axios } from '@core';
// import axios from "axios";
import { Alert, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import {
  useFormData,
  UseFormDataReturnType,
  useDeepCallback,
  useErrorCatcher,
} from '@core';
import { useAuth } from '@repositories';

interface FormType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

type OnSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;

function RegisterForm(): ReactElement {
  const defaultFormData: FormType = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  const { form, getFormData }: UseFormDataReturnType<FormType> =
    useFormData<FormType>(defaultFormData);
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
      {errorMessage && <Alert variant={'danger'}>{errorMessage}</Alert>}

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          {...getFormData('name')}
          isInvalid={!!getValidationError('name')}
        />
        <Form.Control.Feedback type="invalid">
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

      <Form.Group className="mb-3" controlId="password_confirmation">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          {...getFormData('password_confirmation')}
          isInvalid={!!getValidationError('password_confirmation')}
        />
        <Form.Control.Feedback type="invalid">
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
