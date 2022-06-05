import { useRouter } from 'next/router';
import { useEffect, ReactNode, ReactElement, useMemo } from 'react';
import { useUserContext } from '@store';

function AuthRoute({ children }: { children: ReactNode }): ReactElement {
  const router = useRouter();
  const { user } = useUserContext();

  //use useMemo instead of useEffect because I need to check before the first render so we don't do a render when it's not needed
  const routeOk = useMemo(() => {
    if (user) {
      router.push('/');
      return false;
    }
    return true;
  }, [router, user]);

  if (!routeOk) {
    return <></>;
  }

  return <>{children}</>;
}

export { AuthRoute };
