import Cookies from "js-cookie";
import { axios } from "./index";

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
  // If http method is `post | put | delete` and XSRF-TOKEN cookie is
  // not present, call '/sanctum/csrf-cookie' to set CSRF token, then
  // proceed with the initial response
  if (
    (config.method == "post" ||
      config.method == "put" ||
      config.method == "delete") &&
    /* other methods you want to add here */
    !Cookies.get("XSRF-TOKEN")
  ) {
    return setCSRFToken().then((response) => config);
  }
  return config;
};

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
  return axios.get("/csrf-cookie"); // resolves to '/api/csrf-cookie'.
};

// attach your interceptor
axios.interceptors.request.use(onRequest, null);
