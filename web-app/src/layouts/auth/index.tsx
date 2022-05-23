import { Card } from 'react-bootstrap';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Header } from '../common';
import { AuthRoute } from '@core';
import Image from 'next/image';

interface BasicProps {
  children: ReactNode;
}

function AuthenticationLayout(children: ReactElement): ReactElement {
  return (
    <div id={'ecommerce-authentication-layout'}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

function Content({ children }: BasicProps): ReactElement {
  return (
    <Container className="ecommerce-auth-layout__container">
      <Card>
        <Card.Body>
          <div className="ecommerce-auth-layout__content">
            <div className="ecommerce-auth-layout__content__left">
              <AuthRoute>{children}</AuthRoute>
            </div>
            <div className="ecommerce-auth-layout__content__right">
              <Image src="/login-image.png" width="500" height="300"></Image>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export { AuthenticationLayout, Header };
