import { useEffect, useState } from 'react';
import { axios, useDeepMemo } from '@core';
import { useCrudContext } from './crud-context';
import _ from 'lodash';
import { useErrorCatcher } from '@core';
import { ColumnNamesType, CrudObjectInterface } from './types';

interface UseFetchDataParams {
  columnNames: ColumnNamesType;
  perPage: number;
  page: number;
}

interface CrudDataInterface {
  data: Array<CrudObjectInterface>;
  nrOfPages: number;
  isLoading: boolean;
  refreshPage: () => void;
}

type UseFetchDataFunctionType = (
  params: UseFetchDataParams
) => CrudDataInterface;

const useFetchedData: UseFetchDataFunctionType = ({
  columnNames = [],
  perPage = 10,
  page = 1,
}) => {
  const [data, setData] = useState<CrudObjectInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nrOfPages, setNrOfPages] = useState(0);
  const { setError } = useErrorCatcher();
  const { apiPath } = useCrudContext();

  async function fetchData() {
    setIsLoading(true);
    try {
      const fetchResult = await axios.get(apiPath, {
        params: {
          perPage,
          page,
        },
      });
      let fetchedData = _.get(fetchResult, 'data.data', []);

      fetchedData = fetchedData.map((data) => {
        return _.pick(data, columnNames);
      });
      if (fetchedData) {
        setData(fetchedData);
      }

      const nrOfPages: number = _.get(fetchResult, ['data', 'nrOfPages']);
      if (nrOfPages) {
        setNrOfPages(nrOfPages);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const refreshPage = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page]);
  // useEffect(() => {
  //     fetchData();
  // }, []);

  const crudData: CrudDataInterface = useDeepMemo(() => {
    return {
      data,
      nrOfPages,
      isLoading,
      refreshPage,
    };
  }, [data, nrOfPages, isLoading, refreshPage]);

  return crudData;
};

export { useFetchedData };
