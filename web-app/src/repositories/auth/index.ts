import { axios } from '../../core';
import { useRouter } from 'next/router';
import { useUserContext } from '@/store';
import { useErrorCatcher } from '@/core';

function useAuth() {
  const router = useRouter();
  const { setError, clearError} = useErrorCatcher();
  const { loadUser, saveUserInLocalStorage, setUser } = useUserContext();
  const login = async (data) => {
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
      await router.push('/');
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  const logout = async () => {
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

  const register = async (data) => {
    try {
      clearError();
      await axios.post(`/register`, data);
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  return {
    login,
    register,
    logout,
  };
}

export { useAuth };
