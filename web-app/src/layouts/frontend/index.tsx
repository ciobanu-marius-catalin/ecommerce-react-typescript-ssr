import { ReactElement, ReactNode } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Header } from '../common';

interface BasicProps {
  children: ReactNode;
}

function FrontendLayout(children: ReactNode): ReactElement {
  return (
    <div id={'ecommerce-frontend-layout'}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

function Content({ children }: BasicProps): ReactElement {
  return (
    <Container className="ecommerce-frontend-layout__container">
      {children}
    </Container>
  );
}

export { FrontendLayout };
