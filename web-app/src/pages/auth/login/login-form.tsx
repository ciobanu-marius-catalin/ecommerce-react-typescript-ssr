import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect } from "react";
import { axios } from "../../../core";
// import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useFormData, UseFormDataReturnType } from "./use-form-data";

type OnSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
// const baseUrl =
//   "http://127.0.0.1/personal/ecommerce-react-typescript-ssr/api-server/public";
// const baseUrl = "http://ecommerce";
const baseUrl =
  "http://localhost/personal/ecommerce-react-typescript-ssr/api-server/public";
function LoginForm(): ReactElement {
  const { form, getFormData }: UseFormDataReturnType = useFormData();
  const router = useRouter();

  const csrf = () => axios.get(`${baseUrl}/sanctum/csrf-cookie`);

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios.get(`${baseUrl}/api/admin/users`);
      console.log(users);
    };
    fetchData();
  }, []);

  const onSubmit: OnSubmitType = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await csrf();
        const data = await axios.post(`${baseUrl}/api/login`, form);

        console.log("redirect", users);
        //await router.push("/");
      } catch (e) {
        console.error(e);
      }
    },
    [JSON.stringify(form)]
  );
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email address"
          {...getFormData("email")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          {...getFormData("password")}
        />
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
