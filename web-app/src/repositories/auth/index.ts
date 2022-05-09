import { axios } from '../../core';
import { useRouter } from 'next/router';
import { useUserContext } from '@/store';

function useAuth() {
  const router = useRouter();
  const { loadUser, saveUserInLocalStorage, setUser } = useUserContext();
  const login = async (data) => {
    try {
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
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await axios.post(`/logout`);
      await router.push('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const register = async (data) => {
    try {
      await axios.post(`/register`, data);
    } catch (e) {
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
