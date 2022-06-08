import React, { useEffect } from 'react';
import { AuthenticationLayout } from '@layouts';
import { LoginForm } from './login-form';

function LoginPage(): React.ReactNode {
  return (
    <div className="ecommerce-login-page">
      <div className="ecommerce-login-page__title mb-5">
        <h2>Hello</h2>
        <h3>Login to your account</h3>
      </div>
      <LoginForm />
    </div>
  );
}

LoginPage.getLayout = AuthenticationLayout;

export { LoginPage };
