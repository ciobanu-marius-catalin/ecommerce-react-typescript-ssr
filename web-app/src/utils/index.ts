import { useMemo } from 'react';

function useCurrentUser() {
  if (typeof window === 'undefined') {
    return {
      isLoggedIn: false,
    };
  }

  const isLoggedIn = useMemo(() => {
    return !!localStorage.getItem('userId');
  }, []);

  return {
    isLoggedIn,
  };
}

function noopNull(): null {
  return null;
}

function isServerSide(): boolean {
  return typeof window === 'undefined';
}

export { useCurrentUser, noopNull, isServerSide };
