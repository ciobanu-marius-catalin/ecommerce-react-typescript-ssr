import { useRouter } from 'next/router';
import { useUserContext } from '@store';
import { useErrorCatcher, axios } from '@core';
import { FC, useMemo } from 'react';
import {
  AuthInterface,
  LoginFunctionType,
  LogoutFunctionType,
  RegisterFunctionType,
  UseAuthFunctionType,
} from './types';

const useAuth: UseAuthFunctionType = () => {
  const router = useRouter();
  const { setError, clearError } = useErrorCatcher();
  const { loadUser, setUser } = useUserContext();

  const login: LoginFunctionType = async (data) => {
    try {
      clearError();

      const result = await axios.post(`/login`, data);

      const userId = result?.data?.userId;
      if (userId) {
        const user = {
          id: userId,
        };
        setUser(user);
        loadUser();
      }
      console.log('before redirect');
      router.push('/');
      console.log('after redirect');
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  const logout: LogoutFunctionType = async () => {
    try {
      clearError();
      setUser(null);
      await axios.post(`/logout`);
      await router.push('/login');
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  const register: RegisterFunctionType = async (data) => {
    try {
      clearError();
      await axios.post(`/register`, data);
      await router.push('/login');
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  const authFunctions: AuthInterface = useMemo(() => {
    return {
      login,
      register,
      logout,
    };
  }, [login, register, logout]);

  return authFunctions;
};
export * from './types';
export { useAuth };
