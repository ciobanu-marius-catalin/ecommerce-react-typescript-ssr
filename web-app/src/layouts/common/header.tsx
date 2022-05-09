import { ReactElement } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { useUserContext } from '@/store';
import { type } from 'os';

function Header(): ReactElement {
  const { user } = useUserContext();

  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Link href='/'>
          <Navbar.Brand href='/'>Ecommerce</Navbar.Brand>
        </Link>

        <Nav className='me-auto'>
          {!user && (
            <>
              <Link href='/login' passHref>
                <Nav.Link>Login</Nav.Link>
              </Link>
              <Link href='/register' passHref>
                <Nav.Link>Register</Nav.Link>
              </Link>
            </>
          )}
          {user && (
            <Link href='/logout' passHref>
              <Nav.Link>Logout</Nav.Link>
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export { Header };
