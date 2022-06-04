import { createContext, useContext, useState } from 'react';
import { useDeepMemo } from '@core';

const defaultContext = {
  apiPath: '',
};

const CrudContext = createContext(defaultContext);

const useCrudContextValue = (localApiPath) => {
  const contextValue = useDeepMemo(() => {
    return {
      apiPath: localApiPath,
    };
  }, [localApiPath]);

  return contextValue;
};
const useCrudContext = () => {
  return useContext(CrudContext);
};
export { CrudContext, useCrudContext, useCrudContextValue };
