import { ReactElement, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import { Header } from '../common';
import { DashboardRoute } from '@core';

function DashboardLayout(children: ReactNode): ReactElement {
  return (
    <div id={'ecommerce-dashboard-layout'}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

function Content({ children }: { children: ReactNode }): ReactElement {
  return (
    <Container className="ecommerce-auth-layout__container">
      <DashboardRoute>{children}</DashboardRoute>
    </Container>
  );
}

export { DashboardLayout };
