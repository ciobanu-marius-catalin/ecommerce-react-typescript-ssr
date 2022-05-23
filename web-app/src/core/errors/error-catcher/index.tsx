import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
  ReactElement,
} from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { noopNull } from '@utils';

interface ValidationErrorInterface {
  [key: string]: Array<string>;
}

interface ErrorInterface {
  validationErrors?: ValidationErrorInterface | null;
  errorMessage?: string | null;
  statusCode?: number | null;
}

interface ErrorCatcherContextInterface {
  error: ErrorInterface | null;
  setError: Function;
  clearError: Function;
  getValidationError: ((propertyName: string) => string) | (() => null);
}

const defaultErrorValue: ErrorInterface = {
  errorMessage: null,
  statusCode: null,
  validationErrors: null,
};

const defaultValue: ErrorCatcherContextInterface = {
  error: defaultErrorValue,
  setError: noopNull,
  clearError: noopNull,
  getValidationError: noopNull,
};

const ErrorCatcherContext = createContext(defaultValue);

const ErrorCatcher: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setInternalError] = useState<ErrorInterface | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!error) {
      return;
    }
    switch (error.statusCode) {
      case 401:
        router.push('/logout');
        break;
    }
  }, [error]);

  const setError = useCallback(
    (e: any) => {
      const response = e?.response;
      const data = response?.data;
      const newError: ErrorInterface = {
        statusCode: response?.status,
        errorMessage: data?.message,
      };
      if (response?.status === 422) {
        newError.validationErrors = data?.errors;
      }
      setInternalError(newError);
    },
    [setInternalError]
  );

  const clearError = useCallback(() => {
    setInternalError(null);
  }, [setInternalError]);

  const getValidationError: (x: string) => string = useCallback(
    (propertyName) => {
      //The validation errors are returned as an array. We will only display the first one
      return _.get(error, ['validationErrors', propertyName, 0]);
    },
    [error]
  );

  const context: ErrorCatcherContextInterface = useMemo(() => {
    return {
      error,
      setError,
      clearError,
      getValidationError,
    };
  }, [error, setError, clearError, getValidationError]);
  return (
    <ErrorCatcherContext.Provider value={context}>
      {children}
    </ErrorCatcherContext.Provider>
  );
};

const useErrorCatcher = (): ErrorCatcherContextInterface => {
  return useContext(ErrorCatcherContext);
};

export { ErrorCatcher, useErrorCatcher };
