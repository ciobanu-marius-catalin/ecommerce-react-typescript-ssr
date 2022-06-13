import { ReactElement } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { useUserContext } from '@store';

function Header(): ReactElement {
  const { user } = useUserContext();

  return (
    <Navbar bg="light" variant="light"  expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Link href="/login" passHref>
                  <Nav.Link>Login</Nav.Link>
                </Link>
                <Link href="/register" passHref>
                  <Nav.Link>Register</Nav.Link>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link href="/products-static" passHref>
                  <Nav.Link>Products static rendering</Nav.Link>
                </Link>
                <Link href="/admin/products" passHref>
                  <Nav.Link>Edit products</Nav.Link>
                </Link>
                <Link href="/logout" passHref>
                  <Nav.Link>Logout</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export { Header };
