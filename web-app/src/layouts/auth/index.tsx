import { Card } from "react-bootstrap";
import { ReactElement, ReactNode } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Header } from "../common";

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

function Content({ children }: BasicProps): ReactElement {
  return (
    <Container className="ecommerce-auth-layout__container">
      <Card>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  );
}

export { AuthenticationLayout, Header };
