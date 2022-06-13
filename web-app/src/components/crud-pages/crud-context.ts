import { createContext, useContext, useState } from 'react';
import { useDeepMemo } from '@core';

interface CrudContextInterface {
  apiPath: string;
}

const defaultContext: CrudContextInterface = {
  apiPath: '',
};

const CrudContext = createContext(defaultContext);

const useCrudContextValue = (localApiPath) => {
  const contextValue: CrudContextInterface = useDeepMemo(() => {
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
