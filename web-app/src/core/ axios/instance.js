import rootAxios from "axios";

let baseUrl =
  "http://localhost/personal/ecommerce-react-typescript-ssr/api-server/public/api";
const axios = rootAxios.create({
  baseURL: baseUrl,
  // baseUrl: process.env.API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export { axios };
