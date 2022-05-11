import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect } from 'react';
import { UserContextProvider } from '@/store';
import '../src/_style.scss';
import { ErrorCatcher } from '@/core';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    console.log('my app mounted');
  }, []);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppWithStore>{getLayout(<Component {...pageProps} />)} </AppWithStore>
  );
}

function AppWithStore({ children }) {
  return (
    <UserContextProvider>
      <ErrorCatcher>{children}</ErrorCatcher>
    </UserContextProvider>
  );
}

export default MyApp;
