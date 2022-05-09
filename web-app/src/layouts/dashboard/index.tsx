import { ReactElement, ReactNode, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { Header } from '../common';
import { useRouter } from 'next/router';
import { useUserContext } from '@/store';
interface BasicProps {
  children: ReactNode;
}

function DashboardLayout(children: ReactElement): ReactElement {
  const router = useRouter();
  const { user } = useUserContext();
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);
  if (!user) {
    return <></>;
  }
  return (
    <div id={'ecommerce-dashboard-layout'}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

function Content({ children }: BasicProps): ReactElement {
  return (
    <Container className='ecommerce-auth-layout__container'>
      {children}
    </Container>
  );
}

export { DashboardLayout };
