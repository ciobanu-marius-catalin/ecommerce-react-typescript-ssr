import { useEffect, useState, useContext } from 'react';
import {axios} from '@core';
import { useCrudContext } from './crud-context';
import _ from 'lodash';
import { useErrorCatcher } from '@core';

function useFetchedData({ columnNames = [], perPage = 10, page = 1 }) {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [nrOfPages, setNrOfPages] = useState(0);
  const { setError } = useErrorCatcher();
  const { apiPath } = useCrudContext();
  async function fetchData() {
    setIsLoading(true);
    try {
      console.log('use fetched data');
      let fetchResult = await axios.get(apiPath, {
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

      let nrOfPages = _.get(fetchResult, ['data', 'nrOfPages']);
      if (nrOfPages) {
        setNrOfPages(nrOfPages);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }

    console.log('fetch Data');
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

  return { data, nrOfPages, isLoading, refreshPage };
}

export { useFetchedData };
