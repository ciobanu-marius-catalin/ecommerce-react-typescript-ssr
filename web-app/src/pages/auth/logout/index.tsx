import { useEffect } from 'react';
import { useAuth } from '../../../repositories';

function LogoutPage() {
  const { logout } = useAuth();
  useEffect(() => {
    console.log('Mounted logout');
    logout();
  }, []);

  return <></>;
}

export { LogoutPage };
