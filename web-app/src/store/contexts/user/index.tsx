import React, {
  ReactElement,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { UserInterface } from '@/repositories';
import _ from 'lodash';
import { useDeepMemo } from '@/core';
import { useUserRepository, UserRepositoryInterface } from '@/repositories';

interface UserContextProviderProps {
  children: ReactElement;
}

interface defaultContextInterface {
  user: UserInterface | null;
  setContext: Function;
  loadUser: Function;
}
const defaultContext: defaultContextInterface = {
  user: null,
  setContext: _.noop,
  loadUser: _.noop,
};

const UserContext = React.createContext(defaultContext);

function useUserContext() {
  const context = useContext(UserContext);

  return context;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const defaultUser = getSavedUser();

  const [user, setInternalUser] = useState<UserInterface>(defaultUser);

  const setUser = useCallback(
    (newUser: UserInterface) => {
      saveUserInLocalStorage(newUser);
      setInternalUser(newUser);
    },
    [setInternalUser]
  );

  const repository: UserRepositoryInterface = useUserRepository();

  const loadUser = useCallback(async () => {
    return;
    const user: UserInterface = getSavedUser();
    const userId = user?.id;
    if (!userId) {
      return;
    }

    const newUser: Promise<UserInterface | undefined> =
      await repository.getItem(userId);
    if (newUser) {
      setUser(newUser);
    }
  }, [repository]);

  const contextValue = useDeepMemo(() => {
    return {
      user,
      setUser,
      loadUser,
    };
  }, [user, setUser]);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
function saveUserInLocalStorage(user: UserInterface) {
  if (typeof window === 'undefined' || !user) {
    return null;
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}
function getSavedUser() {
  if (typeof window === 'undefined') {
    return null;
  }
  const user: UserInterface = localStorage.getItem('user');
  if (!user) {
    return null;
  }
  try {
    return JSON.parse(user);
  } catch (e) {
    console.error(e);
  }
}

export { useUserContext, UserContextProvider };
