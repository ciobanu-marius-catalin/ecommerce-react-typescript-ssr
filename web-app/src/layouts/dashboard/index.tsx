import { ReactElement, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import { Header } from '../common';
import { DashboardRoute } from '@core';

interface BasicProps {
  children: ReactNode;
}

function DashboardLayout(children: ReactElement): ReactElement {
  return (
    <div id={'ecommerce-dashboard-layout'}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

function Content({ children }: BasicProps): ReactElement {
  return (
    <Container className="ecommerce-auth-layout__container">
      <DashboardRoute>{children}</DashboardRoute>
    </Container>
  );
}

export { DashboardLayout };
