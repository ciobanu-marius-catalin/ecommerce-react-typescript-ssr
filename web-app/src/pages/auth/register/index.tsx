import React from 'react';
import { AuthenticationLayout } from '@layouts';
import { RegisterForm } from './register-form';

function RegisterPage(): React.ReactNode {
  return (
    <div className="ecommerce-login-page">
      <div className="ecommerce-login-page__title mb-5">
        <h2>Hello</h2>
        <h3>Register an account</h3>
      </div>
      <RegisterForm />
    </div>
  );
}

RegisterPage.getLayout = AuthenticationLayout;

export { RegisterPage };
