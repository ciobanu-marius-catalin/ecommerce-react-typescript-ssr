import { Card } from 'react-bootstrap';
import { ReactElement, ReactNode } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { Header } from '../common';

interface BasicProps {
  children: ReactNode;
}

function FrontendLayout(children: ReactElement): ReactElement {
  return (
    <div id={'ecommerce-frontend-layout'}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

function Content({ children }: BasicProps): ReactElement {
  return (
    <Container className='ecommerce-frontend-layout__container'>
      {children}
    </Container>
  );
}

export { FrontendLayout };
