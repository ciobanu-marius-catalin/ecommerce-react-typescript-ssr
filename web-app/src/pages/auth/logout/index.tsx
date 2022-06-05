import { useEffect } from 'react';
import { useAuth } from '../../../repositories';

function LogoutPage() {
  const { logout } = useAuth();
  useEffect(() => {

    logout();
  }, []);

  return <></>;
}

export { LogoutPage };
