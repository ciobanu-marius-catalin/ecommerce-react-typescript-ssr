import { useRouter } from "next/router";
import React, { ReactNode, useCallback } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";

type OnSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;

function LoginForm(): ReactNode {
  const router = useRouter();
  const onSubmit: OnSubmitType = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const data = await axios.get(
          "http://ecommerce/api/posts?perPage=18&page=1"
        );
        console.log("redirect", data);
        await router.push("/register");
      } catch (e) {
        console.error(e);
      }
    },
    []
  );
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email address" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>

      <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form.Group>

      <Form.Group className="mb-5 d-flex justify-content-between align-items-center">
        <Form.Check type="checkbox" id="custom-switch" label="Remember Me" />
        <Link href={`/forgot-password`}>Forgot password</Link>
      </Form.Group>

      <Form.Group className="d-flex justify-content-center">
        <span>Don't have an account? </span>
        <Link href={"/register"} passHref>
          <a href="#">
            <strong className="px-3">Sign up</strong>
          </a>
        </Link>
      </Form.Group>
    </Form>
  );
}

export { LoginForm };
