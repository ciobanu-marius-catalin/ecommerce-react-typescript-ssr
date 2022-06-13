import { useCallback, useMemo } from 'react';
import { axios } from '@core';
import { GetParamsInterface, CrudRepositoryInterface } from './types';

function useCrud<Type>(path: string): CrudRepositoryInterface<Type> {
  const getItem = useCallback(
    async (id: string | number): Promise<Type | undefined> => {
      try {
        const mergedPath = `${path}/${id}`;
        const item = await axios.get(mergedPath);
        return item?.data;
      } catch (e) {
        console.error(e);
      }
    },
    [path]
  );

  const get = useCallback(
    async (params: GetParamsInterface = {}): Promise<Type[] | undefined> => {
      try {
        const item = await axios.get(path, {
          params: params,
        });
        return item?.data;
      } catch (e) {
        console.error(e);
      }
    },
    [path]
  );

  // @ts-ignore
  const routes: CrudRepositoryInterface<Type> = useMemo(() => {
    return {
      getItem,
      get,
    };
  }, [getItem, get]);

  return routes;
}

export * from './types';
export { useCrud };
