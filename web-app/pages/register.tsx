import React from "react";

import { AuthenticationLayout } from "../src";

function RegisterPage(): React.ReactNode {
  return <h1>Register page</h1>;
}
RegisterPage.getLayout = AuthenticationLayout;
export default RegisterPage;
