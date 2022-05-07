import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { UserContextProvider } from "@/store";
import "../src/_style.scss";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppWithStore>{getLayout(<Component {...pageProps} />)} </AppWithStore>
  );
}

function AppWithStore({ children }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}

export default MyApp;
