import { Card } from "react-bootstrap";
import { ReactElement, ReactNode } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";

interface BasicProps {
  children: ReactNode;
}

function AuthenticationLayout(children: ReactElement): ReactElement {
  console.log("AuthenticationLayout");
  return (
    <div id={"ecommerce-authentication-layout"}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

function Header(): ReactElement {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Link href="/">
          <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          <Link href="/login" passHref>
            <Nav.Link>Login</Nav.Link>
          </Link>
          <Link href="/register" passHref>
            <Nav.Link>Register</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

function Content({ children }: BasicProps): ReactElement {
  return (
    <Container className="ecommerce-auth-layout__container">
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
}

export { AuthenticationLayout };
