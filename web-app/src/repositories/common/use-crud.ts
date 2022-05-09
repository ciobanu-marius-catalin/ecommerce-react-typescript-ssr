import { useCallback, useMemo } from 'react';
import { axios } from '@/core';

export interface CrudRepositoryInterface<Type> {
  getItem: (id: string | number) => Promise<Type | undefined>;
  get?: () => Promise<Type[]> | undefined;
  delete?: (id: string | number) => void;
  insert?: (item: Type) => void;
  update?: (item: Type) => void;
}

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

  const routes = useMemo(() => {
    return {
      getItem,
    };
  }, [getItem]);

  return routes;
}

export { useCrud };
