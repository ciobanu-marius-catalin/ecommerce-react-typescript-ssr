import React, { useEffect } from "react";
import { AuthenticationLayout } from "../../../layouts";
import Image from "next/image";
import { LoginForm } from "./login-form";

import { useRouter } from "next/router";
import { useUserContext } from "@/store";

function LoginPage(): React.ReactNode {
  const router = useRouter();
  const { user } = useUserContext();
  useEffect(() => {
    console.log("mounted login  page");
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="ecommerce-login-page">
      <div className="ecommerce-login-page__left-side">
        <div className="ecommerce-login-page__title mb-5">
          <h2>Hello</h2>
          <h3>Login to your account</h3>
        </div>
        <LoginForm />
      </div>
      <div className="ecommerce-login-page__right-side">
        <Image src="/login-image.png" width="500" height="300"></Image>
      </div>
    </div>
  );
}

LoginPage.getLayout = AuthenticationLayout;

export { LoginPage };
